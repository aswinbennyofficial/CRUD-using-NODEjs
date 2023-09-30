// Load environment variables from .env file
require('dotenv').config() 

// Import the Express.js framework
const express = require('express')
const app = express()

// Import Mongoose, an ODM for MongoDB
const mongoose = require('mongoose'); 


// Middleware to parse JSON request bodies
app.use(express.json());


// Defining a route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('hello world');
});

// Define a POST route for '/product'
app.post('/product', (req, res) => {
    try {
        
        console.log(req.body);
        res.send(req.body);
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





