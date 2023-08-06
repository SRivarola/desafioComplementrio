import express from 'express'
import { connect } from 'mongoose'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import indexRouter from './router/index.js'

const PORT = 8080
const ready = ()=> {
    console.log('server ready on port '+PORT)
    connect('mongodb+srv://igna:1234@cluster0.dbl4oxi.mongodb.net/coder-commerce')
        .then(()=>console.log('database connected'))
        .catch(err=>console.log(err))
    //borrar los piquitos <> de password y reemplazar password
    //el link de conexión copiado de MONGO es del CLUSTER!!! si o si hay que agregar al final el nombre de la bd
    //NO OLVIDAR el nombre de la base de datos a la cual me quiero conectar LUEGO DE .net/
}

const app = express()

//midlewares
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//router
app.use('/api',indexRouter)
app.use(errorHandler)
app.use(notFoundHandler)

app.listen(PORT,ready)