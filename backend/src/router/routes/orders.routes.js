import MyRouter from '../router.js';
import OrdersController from "../../controllers/orders.controller.js";
import CartsController from '../../controllers/carts.controller.js';
import passport from 'passport';

const controller = new OrdersController();
const cartsController = new CartsController();

export default class OrdersRouter extends MyRouter {
    init() {
        this.post(
            '/',
            ["USER"],
            passport.authenticate("current"),
            async (req, res, next) => {
                try {
                    let user = req.user;
                    let total = await cartsController.getTotal(user._id);
                    let code = 1;
                    let data = {
                        amount: total.response[0].total,
                        code: code++,
                        purchaser: user.mail
                    }
                    let order = await controller.create(data)
                    order ? res.sendSuccessCreate(order) : res.sendNotFound('order');
                } catch (error) {
                    next(error);
                }
            }
        )
    }
}
