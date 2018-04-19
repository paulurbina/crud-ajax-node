const express = require('express');
const morgan = require('morgan');
const path  = require('path');
const app = express();

//database
const products = [
	{
		id: 1,
		name: 'Laptop'
	},
	{
		id:2,
		name: 'microphone'
	},
	{
		id:3,
		name: 'PC'
	}
];

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/products', (req, res) => {
	res.json(products);
});

app.post('/products', (req, res) => {
	const {name} = req.body;
	products.push({
		id: products.length + 1,
		name
	});
	res.json('Successfully created');
});

app.put('/products/:id', (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	products.forEach((product, i) => {
		if (product.id == id) {
			product.name = name;
		}
	});

	res.json('Successfully update');
});

app.delete('/products/:id', (req, res) => {
	const { id } = req.params;
	products.forEach((product, i) => {
		if (product.id == id) {
			products.splice(i, 1);
		}
	});

	res.json('Successfully deleted');
});

//static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});

