import ProductsController from "../controllers/products.controller.js";

export default async function (req, res, next) {
    try {
        const controller = new ProductsController()
        const data = req.body;
        const product = await controller.readOne(data.product_id)
        if(req.user.role === 'PREMIUM') {
            if(product.response.owner.toLocaleString() === req.user._id.toLocaleString()) {
                return res.sendForbidden();
            }
        }
        return next();
    } catch (error) {
        next(error)
    }
}