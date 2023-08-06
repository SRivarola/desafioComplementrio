import { model, Schema } from "mongoose";

let collection = 'products'

let schema = new Schema ({
    title: { type: String, requiered: true},
    description: { type: String, requiered: true},
    price: { type: Number, requiered: true},
    thumbnail: { type: Array, default: []},
    code: { type: String, requiered: true, unique: true},
    status: { type: Boolean, default: true},
    stock: { type: Number, requiered: true},

})

const Product = model(collection, schema);

export default Product;