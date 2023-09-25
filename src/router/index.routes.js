import MyRouter from "./router.js";
import AuthRouter from "./auth.routes.js";
// import { authRouter } from "./auth.routes.js";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import rtProductsRouter from "./realTimeProducts.routes.js";
import ProductRouter from "./products.routes.js";

const auth = new AuthRouter()
const product = new ProductRouter()

export default class IndexRouter extends MyRouter {
    init() {
        this.read('/', (req, res) => res.status(200).send('products store api'));
        this.use('/auth', auth.getRouter());
        this.use('/products', product.getRouter());
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