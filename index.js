const express = require('express')
const twig = require('twig')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./config/database.js')

app.set('view engine','ejs');
app.engine('html', twig.__express);
app.set('views','views');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
	res.render('home')
})
app.get('/home', (req, res) => {
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
	const username = req.body.username
	const book_name = req.body.book_name
	const description = req.body.description

	const posts = {
		bookname: book_name,
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
		res.redirect('/home')
	})
	
})

connection.connect((err) => {
	if(err) throw err;
	app.listen(3000)
})