const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1'),
			  { IamAuthenticator } = require('ibm-watson/auth'),
			  fs = require('fs');

		const textToSpeech = new TextToSpeechV1({
			authenticator: new IamAuthenticator({
				apikey: process.env.API_KEY,
			}),
			url: process.env.API_URL,
		});

module.exports.index = function(application, req, res){
	res.render("index");	
}

module.exports.buscar = function(application, req, res){

	var connection = application.config.dbConnection();
	var comentarios = new application.app.models.DAO(connection);

	comentarios.buscar(function(error, result){		
		res.send(result);
	});
}

module.exports.salvar = function(application, req, res){

	var connection = application.config.dbConnection();
	var comentarios = new application.app.models.DAO(connection);

	comentarios.salvar(req.body, function(error, result){
		const synthesizeParams = {
			text: req.body.comentario,
			accept: 'audio/wav',
			voice: 'pt-BR_IsabelaVoice',
		};
  
		  textToSpeech.synthesize(synthesizeParams)
		    .then(response => {
				return textToSpeech.repairWavHeaderStream(response.result);
			})
			.then(buffer => {
				fs.writeFileSync(`./app/public/audio/${result.insertId}.wav`, buffer);
			})
			.catch(err => {
				console.log('error:', err);
			});

			res.send(result);
	});
}