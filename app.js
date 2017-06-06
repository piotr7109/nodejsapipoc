const express = require('express'),
	fs = require('fs'),
	path = require('path'),
	app = express();

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res){
	fs.readFile('index.html', function(error, content){
		res.write(decodeURIComponent(content));
		res.end();
	});
});

app.listen(3000);
console.log('Running...');