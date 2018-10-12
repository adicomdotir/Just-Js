const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./custom.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the custom SQLite database.');
});

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

app.get('/list', function (req, res) {
    db.all('SELECT * FROM some_table', (err, row) => {
        res.json(row);
    });
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", 'localhost', port);
});

// let sql = `CREATE TABLE IF NOT EXISTS some_table (id INTEGER PRIMARY KEY AUTOINCREMENT, tatle VARCHAR);`;
// db.exec(sql, (self, err) => {
//     if (err) {
//         console.error(err.message);
//     }
// });

// let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
// let placeholders = languages.map((language) => '(?)').join(',');
// sql = 'INSERT INTO some_table(tatle) VALUES ' + placeholders;

// db.run(sql, languages, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// })

// sql = `SELECT * FROM some_table`;
// db.each(sql, (err, row) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log(`${row.tatle}`);
// });

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }

//     console.log('Close the database connection.');
// });