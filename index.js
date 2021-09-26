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

app.get('/post', (req, res) => {
	res.render('post')
})


// Problem:
// Can't post if it's clicked using btn
app.post('/post', (req, res) => {
	const name = req.body.name;
	const author = req.body.author;
	const description = req.body.description;

	const posts = {
		name: name,
		author: author,
		description: description
	}

	connection.query('INSERT INTO books SET?', posts, (err) => {
		if(err) {
			throw err;
			console.log('error')
		}
		console.log('Data Inserted')
	})
	res.redirect('/')
})

connection.connect((err) => {
	if(err) throw err;
	app.listen(3000)
})