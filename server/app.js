const express = require('express'),
	fs = require('fs'),
	app = express();

app.get('/', function(req, res){
	fs.readFile('index.html', function(error, content){
		res.write(decodeURIComponent(content));
		res.end();
	});
});

app.listen(3000);
console.log('Running...');