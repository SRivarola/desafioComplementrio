import CartsRepository from "../repositories/carts.rep.js";

export default class CartsService {
    constructor() {
        this.repository = new CartsRepository();
    }
    create = (data) => this.repository.create(data);
    readByUser = (user_id, state) => this.repository.readByUser(user_id, state);
    update = (id, data) => this.repository.update(id, data);
    delete = (id) => this.repository.delete(id);
    deleteAll = (user_id) => this.repository.deleteAll(user_id);
    getTotal = (id) => this.repository.getTotal(id);
}