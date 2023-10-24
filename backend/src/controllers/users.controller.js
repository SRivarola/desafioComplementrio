import AuthService from '../services/users.service.js';

export default class AuthController {
    constructor() {
        this.service = new AuthService();
    }
    register = (data) => this.service.register(data);
    login = () => this.service.login();
    signout = () => this.service.signout();
    readOne = (mail) => this.service.readOne(mail);
    readById = (id) => this.service.readById(id);
}