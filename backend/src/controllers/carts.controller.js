import CartsService from "../services/cart.service.js";

export default class CartsController {
    constructor() {
        this.service = new CartsService();
    }
    create = (data) => this.service.create(data);
    readByUser = (user_id, state) => this.service.readByUser(user_id, state);
    update = (id, data) => this.service.update(id, data);
    delete = (id) => this.service.delete(id);
    deleteAll = (user_id) => this.service.deleteAll(user_id);
}