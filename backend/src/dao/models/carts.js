import { model, Schema } from "mongoose";

const collection = 'carts';

const schema = new Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number}
    }] 
});

const Cart = model(collection, schema);

export default Cart;