import ProductMongo from "../dao/mongo/products.mongo.js";

export default class ProductsService {
    constructor() {
        this.model = new ProductMongo();
    }
    create(data) {
        let response = this.model.create(data);
        return response;
    }
    read(query, data) {
        let response = this.model.read(query, data);
        return response;
    }
    readOne(id) {
        let response = this.model.readOne(id);
        return response;
    }
    update(id, data) {
        let response = this.model.update(id, data);
        return response;
    }
    delete(id) {
        let response = this.model.delete(id);
        return response;
    }
}