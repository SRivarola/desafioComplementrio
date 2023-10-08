import Order from './models/orders.js';

export default class OrderMongo {
    constructor() {}
    
    async create(data) {
        let one = await Order.create(data);
        return {
            message: "Order created succesfully.",
            response: one._id
        }
    }

    async readOne(id) {
        let one = await Order.findById(id)
        return one ? {
            message: "Order found.",
            response: one
        } : null;
    }

    async readAll(page) {
        let all = await Order.paginate({}, { page, limit: 10 });
        return all.length > 0 ? {
            message: "products found.",
            response: all
        } : null;
    }  
}