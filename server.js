const express = require('express')
const app = express()
//Route
app.get('/',(req,res) => {
    res.send('Hello NODE API')
})

// listen port
app.listen(3000,()=>{
    console.log('Node API App is running on port 3000')
})