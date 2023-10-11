require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
//json middleware for app to understand json
app.use(express.json())

//Route
//localhost route
app.get('/',(req,res) => {
    res.send('Hello NODE API')
})

//blog route
app.get('/blog',(req,res) => {
    res.send('Hello Blog My name is Hassan')
})

//product route (to save data in database)
app.post('/products',async(req,res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);
        
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message:error.message}) 
    }
})

//product route (to get data all products from database)
app.get('/products',async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//product route (to get single product by id from database)
app.get('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//product route (to update or edit single product by id from database)
app.put('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //check if can't find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//product route (to delete a single product by id from database)
app.delete('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //check if can't find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);        
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})

//Mongoose Db Connection before app listening
mongoose
.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDb')
    // listen port
    app.listen(PORT,()=>{
        console.log(`Node API App is running on port ${PORT}`)
    })
    
}).catch((error) =>{
    console.log(error)
})