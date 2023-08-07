import express from 'express';
import { connect } from 'mongoose';
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js';
import indexRouter from './router/index.router.js';
import Product from './dao/models/products.js';
// import ProductManager from './dao/manager/ProductManager.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

// const manager = new ProductManager(`${__dirname}/files/products.json`); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static((`${__dirname}/public`)))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api', indexRouter)

app.use(errorHandler)
app.use(notFoundHandler)

const PORT = 8080
const ready = () => {
    console.log(`Server ready on port: ${PORT}`)
    connect('mongodb+srv://srivarola:1234@srivarola.glbd6br.mongodb.net/deafiocomplementario')
        .then(() => console.log('database connected'))
        .catch(err => console.log(err))
}

const server = app.listen(PORT, ready);

const io = new Server(server);

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

});