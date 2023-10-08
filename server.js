const express = require('express')
const mongoose = require('mongoose')
const app = express()
//Route
app.get('/',(req,res) => {
    res.send('Hello NODE API')
})

app.get('/blog',(req,res) => {
    res.send('Hello Blog My name is Hassan')
})

//Mongoose Db Connection before app listening
mongoose.connect('mongodb://localhost:27017/NodeApis')
.then(() => {
    console.log('Connected to MongoDb')
    // listen port
    app.listen(3000,()=>{
        console.log('Node API App is running on port 3000')
    })
    
}).catch((error) =>{
    console.log(error)
})