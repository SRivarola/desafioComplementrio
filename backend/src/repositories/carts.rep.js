import dao from '../dao/factory.js';
const { Cart } = dao;

export default class CartsRepository {
    constructor() {
        this.model = new Cart();
    }
    create(data) {
        let response = this.model.create(data);
        return response;
    }
}