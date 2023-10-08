import Cart from "./models/carts.js";

export default class CartMongo {
    constructor() {}
    async create(data) {
        let cart = await Cart.create(data);
        return {
            message: "Product added",
            response: { store_id: cart._id }
        }
    }
    async read(user_id, state) {
        let all = await Cart.find(
            { user_id, state },

        )
    }
}