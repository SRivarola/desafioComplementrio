import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import rtProductsRouter from "./realTimeProducts.router.js";

const indexRouter = Router()

// configurar las rutas de recursos
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/carts', cartsRouter)
indexRouter.use('/api/realtimeproducts', rtProductsRouter)

export default indexRouter