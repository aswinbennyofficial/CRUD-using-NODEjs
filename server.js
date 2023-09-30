// Load environment variables from .env file
require('dotenv').config() 

// Import the Express.js framework
const express = require('express')
const app = express()

// Import Mongoose, an ODM for MongoDB
const mongoose = require('mongoose'); 

// import product model
const Product = require('./Models/productModels');


// Middleware to parse JSON request bodies
app.use(express.json());


// Defining a route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('hello world');
});


// DELETE
// Define a DELETE route for '/delete'
app.delete('/delete/:id', async(req,res) =>{
    try{

        const {id}=req.params;
        // Attempt to find product by id and delete document as per request
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).send('cannot any any product with ID',id);
        }
        else{
            res.status(200).send('delete successful');
        }

    }catch(error){
        res.status(500).send('error occured ',error);
    }

});


// UPDATE
// Define a PUT route for '/update'
app.put('/update/:id', async(req,res) => {
    try{

        const {id}=req.params;
        // Attempt to find product by id and update document as per request
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).send('not found any product with ID:',id);
        }
        else{
            res.status(200).send('update successful');
        }

    }catch(e){
        res.status(500).send('Internal server error',error);
    }
});

// READ BY ID
// Define a GET route for '/product'
app.get('/product/:id', async(req,res) => {
    try{

        const {id}=req.params;
        // Attempt to find product by id in the MongoDB collection
        const products= await Product.findById(id);
        res.status(200).json(products);


    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// READ ALL
// Define a GET route for '/products'
app.get('/products', async(re,res) => {
    try{

        // Attempt to find all products in the MongoDB collection
        const products= await Product.find({});
        res.status(200).json(products);


    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


// CREATE
// Define a POST route for '/product'
app.post('/product', async(req, res) => {
    try {
        
        // Create a new product document in MongoDB using the data from req.body
        const product=await Product.create(req.body);

        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Uses a dynamic port if 3000 replaced with 0
const server = app.listen(0, () => {
    
    // saves the assigned port to the port variable
    const port = server.address().port;

    console.log(`App running on port ${port}`);
});

//MONGO_URI is the environment variable defined in .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    
    console.log('Connected to mongodb!');
    
  });





