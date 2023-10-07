import MyRouter from "./router.js";
import AuthRouter from "./routes/auth.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import ProductRouter from "./routes/products.routes.js";
// import productsRouter from "./products.routes.js";
// import rtProductsRouter from "./realTimeProducts.routes.js";

const auth = new AuthRouter();
const product = new ProductRouter();
const cart = new cartsRouter();

export default class IndexRouter extends MyRouter {
    init() {
        this.read('/', (req, res) => res.status(200).send('products store api'));
        this.use('/auth', auth.getRouter());
        this.use('/auth', authRouter)
        this.use('/products', product.getRouter());
        this.use('/carts', cart.getRouter());
    }
}


// const user_router = user.getRouter()

// const indexRouter = Router()

// configurar las rutas de recursos
// indexRouter.use('/api/auth', user_router)
// indexRouter.use('/api/auth', authRouter)
// indexRouter.use('/api/products', productsRouter)
// indexRouter.use('/api/carts', cartsRouter)
// indexRouter.use('/api/realtimeproducts', rtProductsRouter)
// indexRouter.use('/api/sessions', sessionsRouter)