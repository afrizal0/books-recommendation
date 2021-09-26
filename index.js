const express = require('express')
const twig = require('twig')
const bodyParser = require('body-parser')
const app = express()

const connection = require('./config/database.js')

app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
	connection.query('SELECT * FROM books', (err, results) => {
		if(err) throw err;
		else{
			res.render('index', {
				posts:results
			})
		}
	})
})

connection.connect((err) => {
	if(err) throw err;
	app.listen(3000)
})