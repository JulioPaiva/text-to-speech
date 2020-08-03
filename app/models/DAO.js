function DAO(connection){
	this._connection = connection;
}

DAO.prototype.buscar = function(callback){
	this._connection.query('SELECT id, comentario FROM comentarios ORDER BY id DESC', callback);
}

DAO.prototype.salvar = function(comentario, callback){
	this._connection.query('INSERT INTO comentarios set ? ', comentario, callback);
}

module.exports = function(){
	return DAO;
}