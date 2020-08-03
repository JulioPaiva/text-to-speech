module.exports = function(application){

	application.get('/', function(req, res){
		application.app.controllers.home.index(application, req, res);
	});

	application.post('/salvar', function(req, res){
		application.app.controllers.home.salvar(application, req, res);
	});

	application.get('/buscar', function(req, res){
		application.app.controllers.home.buscar(application, req, res);
	});
}