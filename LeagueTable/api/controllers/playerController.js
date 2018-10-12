const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./custom.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error('DB Error: \n' + err.message);
    }
    console.log('Connected to the custom SQLite database.');
});

exports.getPlayers = function (req, res) {
    db.all('SELECT * FROM players', (err, row) => {
        res.json(row);
    });
};

exports.getPlayerWithId = (req, res) => {
    var id = req.params.id;
    db.get('SELECT * FROM some_table WHERE id=?', [id], (err, row) => {
        res.json(row);
    });
};

exports.addPlayer = (req, res) => {
    const sql = 'INSERT INTO players(name, number, overall, position, team_id) VALUES(?, ?, ?, ?, ?)';
    db.run(sql, [req.body.name, req.body.number, req.body.overall, req.body.position, req.body.team_id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('OK');
};

exports.deletePlayer = (req, res) => {
    var id = req.params.id;
    db.run('DELETE FROM some_table WHERE id=?;', [id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been deleted');
};

exports.updatePlayer = (req, res) => {
    var id = req.params.id;
    db.run('UPDATE some_table SET tatle=? WHERE id=?;', [req.body.title, id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been updated');
};