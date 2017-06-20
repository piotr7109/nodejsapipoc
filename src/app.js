const express = require('express'),
    app = express(),
    path = require('path'),
    JsonDB = require('node-json-db'),
    fs = require('fs');
let uniqid = require('uniqid');

const usersDB = new JsonDB("db/usersDB", true, true),
    articlesDB = new JsonDB("db/articlesDB", true, true);

app.use(express.static(path.join(__dirname, 'target')));
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/' + 'index.html', 'utf-8', (err, data) => {
        res.end(data);
    })
});

app.get('/articles', (req, res) => {
    const tempData = articlesDB.getData("/");
    let allData = [];

    for (let prop in tempData) {
        if (tempData.hasOwnProperty(prop)) {
            allData.push(Object.assign(tempData[prop], {id: prop}));
        }
    }
    res.send(allData);
    res.end();
});

app.get('/article/:id', (req, res) => {
    const tempData = articlesDB.getData("/"),
        id = req.params.id;

    if (tempData[id]) {
        res.send(tempData[id]);
        res.end();
    } else {
        res.status('401').send('Wrong ID');
        res.end();
    }
});

app.post('/user/login', (req, res) => {
    req.on('data', (data) => {
        let tempId;
        const regData = JSON.parse(data.toString()),
            login = regData.login,
            password = regData.password,
            allData = usersDB.getData("/");

        for (let prop in allData) {
            if (allData[prop].login === login && allData[prop].password == password) {
                tempId = prop;
            }
        }

        if (tempId) {
            res.send(tempId);
            res.end();
        } else {
            res.status('401').send('Unknown user');
            res.end();
        }
    });
});

app.post('/user/register', (req, res) => {
    req.on('data', (data) => {
        let tempId;
        const regData = JSON.parse(data.toString()),
            login = regData.login,
            allData = usersDB.getData("/");

        for (let prop in allData) {
            if (allData[prop].login === login) {
                tempId = prop;
            }
        }

        if (tempId) {
            res.status('401').send('User already exist');
            res.end();
        } else {
            let id = uniqid('id-');

            usersDB.push('/' + id, regData);
            res.send(id);
            res.end();
        }
    });
});

app.post('/article/create', (req, res) => {
    req.on('data', (data) => {
        const articleData = JSON.parse(data.toString());
        let id = uniqid();

        articlesDB.push('/' + id, articleData);
        res.send(id);
        res.end();
    });
});

const server = app.listen(3000, () => {
    const host = server.address().address,
        port = server.address().port;

    console.log('Listening at http://%s:%s', host, port)
});