import { Router } from 'express';
//imports models for mongoose
import Cart from '../dao/models/carts.js';
import Product from '../dao/models/products.js';
// imports manager for FS
import CartsManager from '../dao/manager/CartsManager.js';
import ProductManager from '../dao/manager/ProductManager.js';
import __dirname from '../utils.js';

const cartsRouter = Router();

// manager FS
// const manager = new CartsManager(`${__dirname}/files/carts.json`);
// const productManager = new ProductManager(`${__dirname}/files/products.json`)

//create
cartsRouter.post('/', async (req, res, next) => {
    try {
        const cart = await Cart.create({Products: []})
        return res.status(201).json({
            success: true,
            message: `Cart id: ${cart._id}`,
            payload: cart
        })
    } catch (error) {
        next(error)
    }

//    esto es para FS
//    const cart = await manager.addNewCart()
//    res.send({ status: 'success', payload: cart })
});

//read cart
cartsRouter.get('/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate({path: "products.product", select: "title price thumbnail"});
        cart.products.sort((a, b) => a.product.title.localeCompare(b.product.title))
        return res.status(200).json({
            success: true,
            message: `Cart id: ${cart._id}`,
            payload: cart.products
        });
    } catch (error) {
        next(error)
    }

    // esto es para FS
    // const cartId = Number(req.params.cid);
    // const cart = await manager.getCart(cartId)
    // if(!cart) {
    //     return res.status(400).send({ error: `The cart with id: ${cartId}, doesn't exist!` })
    // } 
    // res.send({ status: 'success', payload: cart })
});

cartsRouter.get('/bills/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate({path: "products.product", select: "price"}).lean();
        const totalMount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        console.log(totalMount)
        return res.status(200).json({
            success: true,
            payload: totalMount
        })
    } catch (error) {
        next(error)
    }
})

//update
cartsRouter.put('/:cid/product/:pid', async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await Product.findById(pid);
        const cart = await Cart.findById(cid);
        console.log(product)
        let products = cart.products;
        let isInCart = products.find(e => e.product == pid);
        console.log(isInCart)
        let newCart;
        if(!isInCart){
            products.push({product: product._id, quantity: 1});
            await Cart.findByIdAndUpdate(cid, {products: products});
            newCart = await Cart.findById(cid);
        } else {
            const filteredCart = products.filter(e => e.product != pid);
            isInCart.quantity = isInCart.quantity + 1;
            await Cart.findByIdAndUpdate(cid, {products: [...filteredCart, isInCart]});
            newCart = await Cart.findById(cid);
        }
        return res.status(200).json({
            success: true,
            message: `Product ${pid} added!`,
            payload: newCart
        });
    } catch (error) {
        next(error);
    }

    // esto es para FS
    // const cartId = Number(req.params.cid);
    // const productId = Number(req.params.pid);
    // // verifico si el producto con este id existe!
    // const product = await productManager.getProductsById(productId)
    // if(!product) {
    //     return res.status(400).send({ error: `The product with id: ${productId}, doesn't exist!` })
    // } 

    // const cart = await manager.addProduct(cartId, productId)
    // if(!cart) {
    //     return res.status(400).send({ error: `Can't find cart whith id: ${cartId}` })
    // } 
    // res.send({ status: 'success', payload: cart })
})

// delete produtc
cartsRouter.delete('/:cid/product/:pid', async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await Product.findById(pid);
        const cart = await Cart.findById(cid);
        let products = cart.products;
        let isInCart = products.find(e => e.product == pid);
        let newCart;
        if(!isInCart){
            return res.status(404).json({
                sucess: false,
                message: `Product id: ${pid}, is not in cart!`
            })
        } else {
            if(isInCart.quantity > 1){
                const filteredCart = products.filter(e => e.product != pid);
                isInCart.quantity = isInCart.quantity - 1;
                await Cart.findByIdAndUpdate(cid, {products: [...filteredCart, isInCart]});
                newCart = await Cart.findById(cid)
            } else {
                const filteredCart = products.filter(e => e.product != pid);
                await Cart.findByIdAndUpdate(cid, {products: filteredCart});
                newCart = await Cart.findById(cid)
            }
            return res.status(200).json({
                success: true,
                message: `Product ${pid} removed!`,
                payload: newCart
            })
        }
    } catch (error) {
        next(error)
    }
})

// delete cart
cartsRouter.delete('/:cid', async (req, res, next) => {
    try {
        let { cid } = req.params
        await Cart.findByIdAndDelete(cid)      
        return res.status(200).json({
            success: true,
            message: `Cart ${cid} deleted`
        })
    } catch (error) {
        next(error)
    }
})

export default cartsRouter