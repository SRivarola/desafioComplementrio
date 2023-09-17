import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import rtProductsRouter from "./realTimeProducts.routes.js";
import UserRouter from "./auth.routes.js";
// import sessionsRouter from "./sessions.router.js";

const user = new UserRouter()
const user_router = user.getRouter()

const indexRouter = Router()

// configurar las rutas de recursos
indexRouter.use('/api/auth', user_router)
indexRouter.use('/api/auth', authRouter)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/carts', cartsRouter)
indexRouter.use('/api/realtimeproducts', rtProductsRouter)
// indexRouter.use('/api/sessions', sessionsRouter)

export default indexRouter