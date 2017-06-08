const express = require('express'),
    app = express(),
    fs = require('fs');

app.get('/', function (req, res) {
    fs.readFile(__dirname + 'target/css/' + 'index.html', 'utf8', function (err, data) {
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