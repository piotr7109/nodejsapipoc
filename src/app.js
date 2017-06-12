const express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs');

app.use(express.static(path.join(__dirname, 'target')));

app.get('/', function (req, res) {
    fs.readFile(__dirname + '/' + 'index.html', 'utf8', function (err, data) {
        res.end(data);
    })
});

app.post('/user/login', function (req, res) {
    res.send({id: 666});
    res.end();
});

const server = app.listen(3000, function () {
    const host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
});