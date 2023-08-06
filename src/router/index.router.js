import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import rtProductsRouter from "./realTimeProducts.router";

const indexRouter = Router()

// configurar las rutas de recursos
indexRouter.use('/products', productsRouter)
indexRouter.use('/carts', cartsRouter)
indexRouter.use('/realtimeproducts', rtProductsRouter)

export default indexRouter