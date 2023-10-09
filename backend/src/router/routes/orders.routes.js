import MyRouter from '../router.js';
import OrdersController from "../../controllers/orders.controller.js";
import CartsController from '../../controllers/carts.controller.js';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

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
                    let data = {
                        amount: total.response[0].total,
                        code: uuidv4(),
                        purchaser: user.mail
                    }
                    let order = await controller.create(data)
                    order ? res.sendSuccessCreate(order) : res.sendNotFound('order');
                } catch (error) {
                    next(error);
                }
            }
        )
        this.read(
            '/',
            ["USER"],
            passport.authenticate("current"),
            async (req, res, next) => {
                try {
                    let user = req.user._id;
                    let order = await controller.readAllTickets(user);
                    order ? res.sendSuccess(order) : res.sendNotFound('order');
                } catch (error) {
                    next(error);
                }
            }
        )
    }
}
