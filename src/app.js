const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const user = require('./controllers/user');
const article = require('./controllers/article');
const port = 3000;

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

app.get('/articles', article.showArticles);

app.get('/article/:id', article.showById);
app.post('/article/create', article.create);

app.post('/user/login', user.login);
app.post('/user/register', user.register);

app.listen(port, () => {
    console.log('Running on port ' + port);
});