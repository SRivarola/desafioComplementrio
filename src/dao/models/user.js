import {model, Schema} from 'mongoose';

let collection = 'users';
let schema = new Schema({
    name: { type: String, required: true},
    photo: { type: String, default: "avatar.png"},
    mail:{ type: String, unique: true, index: true, requied: true},
    age: {type: Number},
    role: {type: Number, default: 0},
    password: {type: String, requied: true}
});

let User = model(collection, schema);
export default User;