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
            let data = await Product.paginate({}, {limit: 6, page: 1});
            products = res.json({data});
            console.log(products)
        }
        return res.render('products', { data }); 

    } catch (error) {
        next(error);
    }
});

export default router;