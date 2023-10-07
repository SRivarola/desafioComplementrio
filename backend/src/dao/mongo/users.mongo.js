import User from "./models/user.js";

export default class AuthMongo {
    constructor() {}
    async register(data) {
        let one = await User.create(data);
        return {
            message: 'User created successfully',
            response: one._id
        }
    }
    login() {
        return {
            message: 'User logged in successfully',
            response: true
        }
    }
    signout() {
        return {
            message: 'User signed out successfully',
            response: true
        }
    }
    async readOne(mail) {
        let one = await User.findOne({ mail });
        if(one) {
            return one
        } else {
            return null
        }
    }
    async readById(id) {
        let one = await User.findById(id);
        if(one) {
            return one
        } else {
            return null
        }
    }
}