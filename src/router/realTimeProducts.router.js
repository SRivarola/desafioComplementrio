import { Router } from 'express';
import ProductManager from "../dao/manager/ProductManager.js";
import __dirname from '../utils.js';

const rtProductsRouter = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);

rtProductsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    let products = await manager.getProducts();
    if(limit) products = products.slice(0, Number(limit));
    // res.send({ status: 'success', payload: products });
    
    res.render('realTimeProducts', {products})
});

export default rtProductsRouter