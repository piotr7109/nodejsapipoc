const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db');
const fs = require('fs');
const uniqid = require('uniqid');

const usersDB = new JsonDB("db/usersDB", true, true);
const articlesDB = new JsonDB("db/articlesDB", true, true);

app.use(express.static(path.join(__dirname, 'target')));
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/' + 'index.html', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
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
        res.status(401).send('Wrong ID');
        res.end();
    }
});

app.post('/user/login', (req, res) => {
    let tempId;
    const { login, password } = req.body,
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
        res.status(401).send('Unknown user');
        res.end();
    }
});

app.post('/user/register', (req, res) => {
    let tempId;
    const regData = req.body,
        login = regData.login,
        allData = usersDB.getData("/");

    for (let prop in allData) {
        if (allData[prop].login === login) {
            tempId = prop;
        }
    }

    if (tempId) {
        res.status(401).send('User already exist');
        res.end();
    } else {
        const id = uniqid('id-');

        usersDB.push('/' + id, regData);
        res.send(id);
        res.end();
    }
});

app.post('/article/create', (req, res) => {
    const articleData = req.body,
    id = uniqid();

    articlesDB.push('/' + id, articleData);
    res.send(id);
    res.end();
});

const server = app.listen(3000, () => {
    const host = server.address().address,
        port = server.address().port;

    console.log('Running on', host, port);
});