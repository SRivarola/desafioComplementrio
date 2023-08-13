import { Router } from "express";
import Product from '../dao/models/products.js';
import __dirname from "../utils.js";
const router = Router();

//READ ALL
router.get('/', async (req, res, next) => {
    
    const { title } = req.query;
    let products;
    try {
        if(title){
            const lookfor = new RegExp(title, "i");
            products = await Product.paginate({title: lookfor}, {limit: 6, page: 1});
        } else {
            products = await Product.paginate({},{lean: true, limit: 6, page: 1});
        }
        return res.render('products', { products }); 

    } catch (error) {
        next(error);
    }
});

export default router;