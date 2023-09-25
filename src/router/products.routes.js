import MyRouter from './router.js';
//import controller
import ProductsController from '../contollers/products.controller.js';
//import uploader
import uploader from '../services/uploader.js';
// import is_admin from '../middlewares/is_admin.js';
import verify_token from '../middlewares/verify_token.js';

const productsController = new ProductsController();

export default class ProductRouter extends MyRouter {
    init() {
        this.post('/', ["ADMIN"],  verify_token, uploader.single('file'), async (req, res, next) => {
            try {
                const data = req.body;
                const file = req.file?.filename ? [req.file.filename] : []
                data.thumbnail = file
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
                    payload: products
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
        this.put('/:pid', ["ADMIN"], verify_token, async (req, res, next) => {
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
        this.delete('/:pid', ["ADMIN"], verify_token, async (req, res, next) => {
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
