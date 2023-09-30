const mongoose = require('mongoose');
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
// naming the schema Product
const Product=mongoose.model('Product',productSchema);

module.exports = Product;
