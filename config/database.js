const mysql = require('mysql2')
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'afrizal1_',
	database: 'bookRecommend'
})

connection.connect(err => {
	if(err){
		console.log('Error : Cant Connect')
	}else{
		console.log('Successfull Connect with DB')
	}
})
module.exports = connection