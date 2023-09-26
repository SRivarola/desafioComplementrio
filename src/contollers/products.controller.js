import ProductsService from "../services/products.service.js";

export default class ProductsController {
    constructor() {
        this.service = new ProductsService();
    }
    create(data) {
        let response = this.service.create(data);
        return response;
    }
    read(query, data) {
        let response = this.service.read(query, data);
        return response;
    }
    readOne(id) {
        let response = this.service.readOne(id);
        return response;
    }
    update(id, data) {
        let response = this.service.update(id, data);
        return response;
    }
    delete(id) {
        let response = this.service.delete(id);
        return response;
    }
}