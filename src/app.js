const express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs');

app.use(express.static(path.join(__dirname, 'target')));

var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
};

app.get('/addUser', function (req, res) {
    fs.readFile( __dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end( JSON.stringify(data));
    });
});

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/' + 'index.html', 'utf8', function (err, data) {
        res.end(data);
    })
}).get('/users', function (req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        res.end(data);
    });
});

const server = app.listen(3000, function () {
    const host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
});