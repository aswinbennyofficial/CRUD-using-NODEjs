const mongoose = require('mongoose');

// Creating a mongoose schmea
const productSchema=mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,"please enter product name"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamp: true
    }

);
// Compiling our schema 'productSchema' into mongoose model Product 
const Product=mongoose.model('Product',productSchema);

module.exports = Product;
