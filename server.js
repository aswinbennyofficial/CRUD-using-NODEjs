
require('dotenv').config()
const express = require('express')
const app = express()




const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!')).catch((error)=>{
    console.log(error);
  });





app.get('/', (req, res) => {
  res.send('hello worlds')
})

app.listen(3000,()=>{
    console.log('app running in port 3000');
})