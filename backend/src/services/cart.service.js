import CartsRepository from "../repositories/carts.rep.js";

export default class CartsService {
    constructor() {
        this.repository = new CartsRepository();
    }
    create(data) {
        let response = this.respository.create(data);
        return response;
    }
}