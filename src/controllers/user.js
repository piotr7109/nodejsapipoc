const JsonDB = require('node-json-db');
const uniqid = require('uniqid');

const usersDB = new JsonDB("db/usersDB", true, true);

module.exports = {
    login : function(req, res){
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
    },

    register : function(req, res){
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
    }
}