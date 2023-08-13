import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import rtProductsRouter from "./realTimeProducts.router.js";
import viewsProducts from "./views.products.js";

const indexRouter = Router()

// configurar las rutas de recursos
indexRouter.use('/api/products', productsRouter)
indexRouter.use('/api/carts', cartsRouter)
indexRouter.use('/api/realtimeproducts', rtProductsRouter)
indexRouter.use('/products', viewsProducts)

export default indexRouter