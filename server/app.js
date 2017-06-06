const express = require('express'),
	fs = require('fs'),
	app = express();

app.get('/', function(req, res){
	res.send('Dupaaazzzzzzzzzz!');
});

app.listen(3000);
console.log('Running...');