import dao from '../dao/factory.js';
const { Order } = dao;

export default class OrdersRepository {
    constructor() {
        this.model = new Order();
    }
    
    create = (data) =>  this.model.create(data);
    readOne = (id) =>  this.model.readOne(id);
    readAll = (page) =>  this.model.readAll(page);
}
