import { Router } from "express";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import rtProductsRouter from "./realTimeProducts.router.js";
// import sessionsRouter from "./sessions.router.js";

const indexRouter = Router()

// configurar las rutas de recursos
indexRouter.use('/api/auth', authRouter)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/carts', cartsRouter)
indexRouter.use('/api/realtimeproducts', rtProductsRouter)
// indexRouter.use('/api/sessions', sessionsRouter)

export default indexRouter