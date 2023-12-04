import MyRouter from "./router.js";
import AuthRouter from "./routes/auth.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import CartsRouter from "./routes/carts.routes.js";
import ProductRouter from "./routes/products.routes.js";
import OrdersRouter from "./routes/orders.routes.js";
import LoggersRoute from "./routes/loggers.routes.js";
import mailsController from '../controllers/mails.controller.js';

const auth = new AuthRouter();
const product = new ProductRouter();
const cart = new CartsRouter();
const order = new OrdersRouter();
const logger = new LoggersRoute();

export default class IndexRouter extends MyRouter {
    init() {
        this.read('/', (req, res) => res.status(200).send('products store api'));
        this.use('/auth', auth.getRouter());
        this.use('/auth', authRouter)
        this.use('/products', product.getRouter());
        this.use('/carts', cart.getRouter());
        this.use('/tickets', order.getRouter());
        this.post('/mail', ["USER"], mailsController);
        this.use('/loggers', logger.getRouter())
    }
}