const express = require('express');
const Product = require('../models/productModels')
const {getProducts, getProduct} = require('../controllers/productsController')

const router = express.Router();

 //product route (to save data in database)
router.post('/',async(req,res) => {
    try {
        const products = await Product.create(req.body)
        res.status(200).json(products);
        
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message:error.message}) 
    }
})

//product route (to get data all products from database)
router.get('/', getProducts);

//product route (to get single product by id from database)
router.get('/:id',getProduct);

//product route (to update or edit single product by id from database)
router.put('/:id',async(req,res) => {
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
router.delete('/:id',async(req,res) => {
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
module.exports = router;