import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';

import env from "./config/env.js";
import __dirname from '../utils.js';
import sessions from './config/sessions/factofy.js';

import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js';
import inicializePassport from './middlewares/passport.js';

// import Product from './dao/models/products.js';
// import ProductManager from './dao/manager/ProductManager.js';
// import MongoConnect from './config/mongo.js';
// import { Server } from 'socket.io';
// import handlebars from 'express-handlebars';
// const manager = new ProductManager(`${__dirname}/files/products.json`); 


import IndexRouter from './router/index.routes.js';
const router = new IndexRouter()

const app = express();

app.use(cookieParser(env.SECRET_COOKIE))
app.use(sessions)
inicializePassport();
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors())
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(morgan('dev'));
app.use(express.static((`${__dirname}/public`)))
app.use(express.urlencoded({extended: true}));
// app.engine('handlebars', handlebars.engine())
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'handlebars');

app.use('/api', router.getRouter())

app.use(errorHandler)
app.use(notFoundHandler)

// const mongo1 = new MongoConnect(config.LINK_MDB)
// mongo1.connect_mongo()

/* const io = new Server(server);

io.on('connection', async socket => {
    
    console.log('cliente conectado');
    
    socket.on('dataProduct', async data => {
        const product = await Product.create(data)
        // const product = await manager.addProduct(data)
        
        if(product){
            
            const successfully = `<span id='errorMessage' class='successfullMessage'>Product added successfully!</span>`
            socket.emit('message', successfully)

            const thisProduct = await Product.findById(product._id)
            socket.emit('product', thisProduct)
            
        } else {
            const errorMessage = `<span id='errorMessage' class='errorMessage'>Something went wrong, try again</span>`
            socket.emit('message', errorMessage)
        }
    })

    try {
        // const productData = await manager.getProducts()
        const productData = await Product.find().lean()
        socket.emit('data', productData)
    } catch (error) {
        console.log(error)
    }

    socket.on('deleteData', async data => {
        // const product = await manager.deleteProduct(data)
        const product = await Product.findByIdAndDelete(data)
        
        if(product){
            const deleteMessage = `<span id='errorDeleteMessage' class='successfullMessage'>The product was delete successfully!</span>`
            socket.emit('deleteMessage', deleteMessage)
            socket.emit('deletedProduct', product)
        } else {
            const deleteMessage = `<span id='errorDeleteMessage' class='errorMessage'>Something went wrong, try again!</span>`
            socket.emit('deleteMessage', deleteMessage)
        }
    })

}); */

export default app;