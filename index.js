const express = require('express')
const twig = require('twig')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./config/database.js')
const fileUpload = require('express-fileupload')

app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');

app.use(fileUpload());

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

// POST DATA TO MYSQL DB
app.post('/post', (req, res) => {
	

	//Get data from ./views/post.html
	
	console.log(req.files)

	const username = req.body.username
	const book_name = req.body.book_name
	const description = req.body.description

	const posts = {
		book_name: book_name,
		username: username,
		description: description
	}

	// POST DATA TO DB
	connection.query('INSERT INTO books SET?', posts, (err) => {
		if(err) {
			console.log('error')
			throw err;
			
		}
		console.log('Data Inserted')
	})
	res.redirect('/')
})



connection.connect((err) => {
	if(err) throw err;
	app.listen(3000)
})

