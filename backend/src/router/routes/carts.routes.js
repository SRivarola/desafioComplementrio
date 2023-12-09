import MyRouter from '../router.js';
import CartsController from '../../controllers/carts.controller.js';
import ProductsController from '../../controllers/products.controller.js';
import passport from 'passport';
import cart_user_role from '../../middlewares/cart_user_role.js';

const controller = new CartsController();
const productsController = new ProductsController();

export default class CartsRouter extends MyRouter {
    init() {
        this.post(
            '/', 
            ["USER", "PREMIUM"],
            cart_user_role,
            async (req, res, next) => {
                try {
                    let user = req.user;
                    let data = req.body;
                    let product = await productsController.readOne(data.product_id);
                    data.user_id = user._id;
                    data.price = product.response.price;
                    let oldCart = await controller.readAllByUser(user._id, "pending");
                    let response;

                    if(!oldCart) {
                      response = await controller.create(data);
                    } else {
                      const filteredCart = oldCart.response.find( item => item.product_id._id.toString() == product.response._id.toString() );
                      if(!filteredCart) {
                        response = await controller.create(data);
                      } else {
                        response = await controller.update(filteredCart._id, { quantity: filteredCart.quantity + data.quantity });
                      }
                    }
                    return res.sendSuccessCreate(response); 
                } catch (error) {
                    next(error)
                }
            }
        )
        this.read(
            '/', 
            ["USER", "PREMIUM"], 
            passport.authenticate("current"), 
            async (req, res, next) => {
                try {
                  let user_id = req.user._id;
                  let state = "pending";
                  if (req.query.state) {
                    state = req.query.state;
                  }
                  let response = await controller.readByUser(
                    { user_id, state },
                    {
                      populate: [
                        {
                          path: "user_id",
                          select: "first_name last_name mail photo",
                        },
                        {
                          path: "product_id",
                          select: "-createdAt -updatedAt -__v"
                        }
                      ],
                      lean: true,
                      limit: 10,
                    }
                  );

                  response
                    ? res.sendSuccess(response)
                    : res.sendNotFound("cart");
                } catch (error) {
                    next(error);
                }
            }
        )

        this.read(
          "/total",
          ["USER", "PREMIUM"],
          passport.authenticate("current"),
          async (req, res, next) => {
            try {
              let id = req.user._id;
              let total = await controller.getTotal(id);
              total ? res.sendSuccess(total) : res.sendNotFound(0);
            } catch (error) {
              next(error);
            }
          }
        );

        this.put(
          "/:cid",
          ["USER", "PREMIUM"],
          passport.authenticate("current"),
          async (req, res, next) => {
            try {
              let cart_id = req.params.cid;
              let data = req.body;
              let response = await controller.update(cart_id, data);
              response
                ? res.sendSuccess(response)
                : res.sendNotFound("product in cart");
            } catch (error) {
              next(error);
            }
          }
        );

        this.delete(
          "/:cid",
          ["USER", "PREMIUM"],
          passport.authenticate("current"),
          async (req, res, next) => {
            try {
              let cart_id = req.params.cid;
              let response = await controller.delete(cart_id);
              response ? res.sendSuccess(response) : res.sendNotFound("cart");
            } catch (error) {
              next(error);
            }
          }
        );

        this.delete(
          "/",
          ["USER", "PREMIUM"],
          passport.authenticate("current"),
          async (req, res, next) => {
            try {
              let user = req.user;
              let response = await controller.deleteAll(user._id);
              response ? res.sendSuccess(response) : res.sendNotFound("cart");
            } catch (error) {
              next(error);
            }
          }
        );
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