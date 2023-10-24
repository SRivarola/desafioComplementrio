import MyRouter from '../router.js';
//import controller
import ProductsController from "../../controllers/products.controller.js";
//import uploader
import uploader from '../../services/uploader.js';
// import is_admin from '../middlewares/is_admin.js';
import passport from 'passport';

const productsController = new ProductsController();

export default class ProductRouter extends MyRouter {
    init() {
        this.read(
            '/mockingproducts',
            ["USER"],
            async (req, res, next) => {
                const { title, page } = req.query;
                let products
                try {
                    if(title){
                        const lookfor = new RegExp(title, "i");
                        products = await productsController.read({title: lookfor}, {lean: true, limit: 4, page: page ? page : 1});
                        console.log(lookfor)
                    } else {
                        products = await productsController.read({}, {lean: true, limit: 4, page: page ? page : 1});
                    }
                    return res.status(200).json({
                        success: true,
                        payload: products.response
                    })
                } catch (error) {
                    next(error);
                }
            }
        )
        this.post('/', ["ADMIN"], uploader.single('file'), async (req, res, next) => {
            const { title, description, price, stock, code, status } = req.body;
            const file = req.file?.filename ? [req.file.filename] : []
            const data = {
                title,
                description,
                price,
                stock,
                code,
                status,
                thumbnail: file
            }
            try {
                let product = await productsController.create(data);
                return res.sendSuccessCreate(product)
            } catch (error) {
                next(error);
            }
        });
        this.read('/', ["USER", "ADMIN"], async (req, res, next) => {
            const { title, page } = req.query;
            let products
            try {
                if(title){
                    const lookfor = new RegExp(title, "i");
                    products = await productsController.read({title: lookfor}, {lean: true, limit: 4, page: page ? page : 1});
                } else {
                    products = await productsController.read({}, {lean: true, limit: 4, page: page ? page : 1});
                }
                return res.status(200).json({
                    success: true,
                    payload: products.response
                })
            } catch (error) {
                next(error);
            }
        })
        this.read('/:pid', ["USER", "ADMIN"], async (req, res, next) => {
            try {
                let { pid } = req.params;
                let product = await productsController.readOne(pid)
                if(product){
                    return res.sendSuccess(product)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }   
        });
        this.put('/:pid', ["ADMIN"], passport.authenticate("current"), async (req, res, next) => {
            try {
                let { pid } = req.params
                let data = req.body
                let product = await productsController.update(pid, data)
                if(product){
                    return res.sendSuccess(product)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
                
            }    
        });
        this.delete('/:pid', ["ADMIN"], passport.authenticate("current"), async (req, res, next) => {
            try {
                let { pid } = req.params
                let product = await productsController.delete(pid)
                if(product){
                    return res.sendSuccess(product)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
                
            }
        })
    };
}
