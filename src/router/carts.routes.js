//import { Router } from 'express';
//imports models for mongoose
import MyRouter from './router.js';

import Cart from '../dao/models/carts.js';
import Product from '../dao/models/products.js';
import passport from 'passport';


export default class CartsTouter extends MyRouter {
    init() {
        this.post('/', ["ADMIN", "USER"], passport.authenticate("current"), async (req, res, next) => {
            try {
                let user = req.user;
                let data = req.body;
                data.user_id = user._id;
                let response = await Cart.create( data )
                    return res.sendSuccessCreate(response); 
            } catch (error) {
                next(error)
            }
        })
        this.read('/', ["USER", "ADMIN"], passport.authenticate("current"), async (req, res, next) => {
            try {
                let user_id = req.user._id;
                let state = "pending";
                if (req.query.state) {
                    state = req.query.state;
                }
                let response = await Cart.find({user_id, state}, "product_id user_id quantity state").populate('user_id', 'first_name last_name mail photo').populate('product_id', '-createdAt -updatedAt -__v');
                if (response.length > 0) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error);
            }
        })
        this.put(
            '/:id', ["USER", "ADMIN"],
            passport.authenticate("current"),
            async (req, res, next) => {
                try {
                    let cart_id = req.params.id;
                    let data = req.body;
                    let response = await Cart.findByIdAndUpdate(cart_id, data, { new: true });
                    if (response) {
                        return res.sendSuccess(response);
                    } else {
                        return res.sendNotFound();
                    }
                } catch (error) {
                    next(error);
                }
            }
        )

        this.delete(
            '/:id',
            ["USER", "ADMIN"],
            passport.authenticate("current"),
            async (req, res, next) => {
                try {
                    let cart_id = req.params.id;
                    let response = await Cart.findByIdAndDelete(cart_id).select("product_id user_id quantity state").populate("user_id", "first_name last_name mail photo").populate("product_id", "-createdAt -updatedAt -__v");
                    if (response) {
                        res.sendSuccess(response);
                    } else {
                        return res.sendNotFound();
                    }
                } catch (error) {
                    next(error);
                }
            }
        )
    }
}
/* 

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

 */