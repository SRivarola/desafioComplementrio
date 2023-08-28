import { Router } from 'express';
//imports models for mongoose
import Product from '../dao/models/products.js';
//imports manager for fs
import ProductManager from "../dao/manager/ProductManager.js";
import __dirname from '../../utils.js';
import uploader from '../services/uploader.js';
import is_admin from '../middlewares/is_admin.js';

const productsRouter = Router();

//manager FS
// const manager = new ProductManager(`${__dirname}/files/products.json`); 


//CREATE
productsRouter.post('/', is_admin, uploader.single('file'), async (req, res, next) => {
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
        let product = await Product.create(data);
        return res.status(201).json({
            success: true,
            message: `Product with id: ${product._id}, added successfully!`,
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
    const { title, page } = req.query;
    let products;
    try {
        if(title){
            const lookfor = new RegExp(title, "i");
            products = await Product.paginate({title: lookfor}, {lean: true, limit: 4, page: page ? page : 1});
        } else {
            products = await Product.paginate({}, {lean: true, limit: 4, page: page ? page : 1});
        }
        // return res.render('products', {products})
        return res.status(200).json({
            success: true,
            payload: products
        })
    } catch (error) {
        next(error);
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
        let updateProduct = await Product.findById(pid)
        return res.status(200).json({
            success: true,
            message: `Product id: ${product._id} modified.`,
            payload: updateProduct
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