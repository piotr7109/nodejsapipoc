const express = require('express'),
    app = express(),
    path = require('path'),
    JsonDB = require('node-json-db'),
    fs = require('fs');
let uniqid = require('uniqid');

const db = new JsonDB("myDB", true, true);

app.use(express.static(path.join(__dirname, 'target')));
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/' + 'index.html', 'utf-8', (err, data) => {
        res.end(data);
    })
});

app.post('/user/login', (req, res) => {
    req.on('data', (data) => {
        let tempId;
        const regData = JSON.parse(data.toString()),
            login = regData.login,
            password = regData.password,
            allData = db.getData("/");

        for (let prop in allData) {
            if (allData[prop].login === login && allData[prop].password === password) {
                tempId = prop;
            }
        }

        if (tempId) {
            res.send(tempId);
            res.end();
        } else {
            res.send({msg: "Unknown user", status: 403});
            res.end();
        }
    });
});

app.post('/user/register', (req, res) => {
    req.on('data', (data) => {
        let tempId;
        const regData = JSON.parse(data.toString()),
            login = regData.login,
            allData = db.getData("/");

        for (let prop in allData) {
            if (allData[prop].login === login) {
                tempId = prop;
            }
        }

        if (tempId) {
            res.send({msg: "User already exist", status: 403});
            res.end();
        } else {
            let id = uniqid('id-');

            db.push('/'+id, regData);
            res.send(id);
            res.end();
        }
    });
});

const server = app.listen(3000, () => {
    const host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
});