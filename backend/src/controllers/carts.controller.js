import CartsService from "../services/cart.service.js";

export default class CartsController {
    constructor() {
        this.service = new CartsService();
    }
    create(data) {
        let response = this.service.create(data);
        return response;
    }
}