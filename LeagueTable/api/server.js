const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./custom.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the custom SQLite database.');
});

const bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

// Get all object api
app.get('/players', function (req, res) {
    db.all('SELECT * FROM some_table', (err, row) => {
        res.json(row);
    });
});

// Get a object api
app.get('/player/:id', (req, res) => {
    var id = req.params.id;
    db.get('SELECT * FROM some_table WHERE id=?', [id], (err, row) => {
        res.json(row);
    });
});

// Post api
app.post('/player/add', (req, res) => {
    db.run('INSERT INTO some_table(tatle) VALUES(?)', [req.body.title], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('OK');
});

// Delete api
app.delete('/player/:id', (req, res) => {
    var id = req.params.id;
    db.run('DELETE FROM some_table WHERE id=?;', [id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been deleted');
});

// Update api
app.put('/player/:id', (req, res) => {
    var id = req.params.id;
    db.run('UPDATE some_table SET tatle=? WHERE id=?;', [req.body.title, id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been updated');
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", 'localhost', port);
});