import { model, Schema, Types } from "mongoose";

const collection = 'carts';

const schema = new Schema({
    products: [{
        product: {type: Types.ObjectId, ref: 'products'},
        quantity: {type: Number}
    }] 
});

const Cart = model(collection, schema);

export default Cart;