
# Mongoose

- `npm i mongoose`

---

## ProductModels.js File

### Include Mongoose
```js
// Models/productModels.js

const mongoose = require('mongoose');
```

### Making a schema

```js
// Models/productModels.js


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



```


### Insert scheme to mode
```js
// Models/productModels.js

// Compiling our schema 'productSchema' into mongoose model Product
const Product=mongoose.model('Product',productSchema);
```

### Export the module
```js
// Models/productModels.js
module.exports = Product;
```

### Final
```js
// Models/productModels.js

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
```


---
## Serve.js File

```js
// Import Mongoose, an ODM for MongoDB
const mongoose = require('mongoose');

// import product model
const Product = require('./Models/productModels');
```


### Connect with MongoDB
```js
//MONGO_URI is the environment variable defined in .env file
mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('Connected to mongodb!');
});

```




### Create
```js
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
```

### Fetch from db
```js
// Define a GET route for '/product'
app.get('/product', async(re,res) => {
try{
// Attempt to find all products in the MongoDB collection
	const products= await Product.find({});
	res.status(200).json(products);
	
}catch(error){
	console.log(error);
	res.status(500).send('Internal Server Error');
}

});
```

- fetch by ID
```js
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
```


### Update
```js
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

})
```


### Delete
```js
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
```