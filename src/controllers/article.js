const JsonDB = require('node-json-db');
const uniqid = require('uniqid');

const articlesDB = new JsonDB("db/articlesDB", true, true);

module.exports = {
    showArticles : function(req, res){
        const tempData = articlesDB.getData("/");
        let allData = [];

        for (let prop in tempData) {
            if (tempData.hasOwnProperty(prop)) {
                allData.push(Object.assign(tempData[prop], {id: prop}));
            }
        }
        res.send(allData);
        res.end();
    },
    showById : function(req, res){
        const tempData = articlesDB.getData("/"),
            id = req.params.id;

        if (tempData[id]) {
            res.send(tempData[id]);
            res.end();
        } else {
            res.status(401).send('Wrong ID');
            res.end();
        }
    },
    create: function(req, res){
        const articleData = req.body,
            id = uniqid();

        articlesDB.push('/' + id, articleData);
        res.send(id);
        res.end();
    }
}