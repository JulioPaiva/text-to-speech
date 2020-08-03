var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : process.env.DB_HOST,
		user : process.env.DB_USER,
		password : process.env.DB_PSW,
		database : process.env.DB_BASE
	});
}

module.exports = function () {
	return connMySQL;
}