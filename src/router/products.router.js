import { Router } from 'express';
import ProductManager from "../dao/manager/ProductManager.js";
import __dirname from '../utils.js';
import Product from '../dao/models/products.js';

const productsRouter = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);


//CREATE
productsRouter.post('/', async (req, res) => {
    try {
        let product = await Product.create(req.body)
        return res.status(201).json({
            success: true,
            message: `product id: ${product._id}`,
            payload: product
        })
    } catch (error) {
        next(error)
        
    }
     //Esto es para FS
    /* const body = req.body;
    const product = await manager.addProduct(body)
    if(!product) {
        return res.status(400).send({ error: `The product could not be added, check the fields and try again!` })
    } 
    res.send({ status: 'success', payload: product }) */
})

//READ ALL
productsRouter.get('/', async (req, res, next) => {
    try {
       let products = await Product.find().lean()
       return res.status(200).render('home', {products})
    } catch (error) {
        next(error)
        
    }
    
    
    //Esto es para FS
    /* const { limit } = req.query;
    let products = await manager.getProducts();
    if(limit) products = products.slice(0, Number(limit));
    // res.send({ status: 'success', payload: products });
    res.render('home', {products}) */
});

//READ ID
productsRouter.get('/:pid', async (req, res, next) => {
    try {
        let { pid } = req.params;
        let product = await Product.findById(pid)
        return res.status(200).json({
            success: true,
            message: `Product id: ${product._id}`,
            payload: product
        })
    } catch (error) {
        next(error)
        
    }
     //Esto es para FS
    /* const productId = Number(req.params.pid);
    const product = await manager.getProductsById(productId)
    if(!product) {
        return res.status(400).send({ error: `The product with id: ${productId}, doesn't exist!` })
    } 
    res.send({ status: 'success', payload: product }) */
})

//Update
productsRouter.put('/:pid', async (req, res,next) => {
    try {
        let { pid } = req.params
        let data = req.body
        let product = await Product.findByIdAndUpdate(pid, data)
        return res.status(200).json({
            success: true,
            message: `Product id: ${product._id} modified.`,
            payload: product
        })
    } catch (error) {
        next(error)
        
    }
     //Esto es para FS
    /* const productId = Number(req.params.pid);
    const body = req.body;
    const product = await manager.updateProduct({...body, id: productId})
    if(!product) {
        return res.status(400).send({ error: `Can't find the product with id: ${productId}` })
    } 
    res.send({ status: 'success', payload: product }) */
})


//Delete
productsRouter.delete('/:pid', async (req, res, next) => {
    try {
        let { pid } = req.params
        let product = await Product.findByIdAndDelete(pid)
        return res.status(200).json({
            success: true,
            message: `Product id: ${product._id} has been deleted`,
            payload: product
        })
    } catch (error) {
        next(error)
        
    }
     //Esto es para FS
    /* const productId = Number(req.params.pid);
    const product = await manager.deleteProduct(productId)
    if(!product) {
        return res.status(400).send({ error: `Can't find the product with id: ${productId}` })
    } 
    res.send({ status: 'success', payload: product }) */
})

export default productsRouter