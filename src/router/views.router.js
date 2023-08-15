import { Router } from "express";
import Product from '../dao/models/products.js';
import __dirname from "../utils.js";

const viewsRouter = Router();

//PRODUCTS VIEWS
//read all or by query
viewsRouter.get('/products', async (req, res, next) => {    
    const { title, page } = req.query;
    let products;
    try {
        if(title){
            const lookfor = new RegExp(title, "i");
            products = await Product.paginate({title: lookfor}, {lean: true, limit: 4, page: page ? page : 1});
        } else {
            products = await Product.paginate({},{lean: true, limit: 4, page: page ? page : 1});
        }
        // return res.render('products', {products})
        return res.status(200).json({
            success: true,
            payload: products
        })
    } catch (error) {
        next(error);
    }
});

// read by id
viewsRouter.get('/products/:pid', async (req, res, next) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid);
        return res.render('productDetail', {product})
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('/new_product', async (req, res, next) => {
    try {
        return res.render('newProduct', {})
    } catch (error) {
        next(error)
    }
});


//CART VIEWS
viewsRouter.get('/', async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
})

export default viewsRouter;