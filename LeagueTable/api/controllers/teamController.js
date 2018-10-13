const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./custom.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error('DB Error: \n' + err.message);
    }
    console.log('Connected to the custom SQLite database.');
});

exports.getTeams = function (req, res) {
    db.all('SELECT * FROM teams', (err, row) => {
        res.json(row);
    });
};

exports.getTeamWithId = (req, res) => {
    var id = req.params.id;
    db.get('SELECT * FROM teams WHERE id=?', [id], (err, row) => {
        res.json(row);
    });
};

exports.addTeam = (req, res) => {
    const sql = 'INSERT INTO teams(name) VALUES(?)';
    
    db.run(sql, [req.body.name], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("val  "+this.lastID);
    });
    db.lastID
    res.send('OK' + db.lastID);
};

exports.deleteTeam = (req, res) => {
    var id = req.params.id;
    db.run('DELETE FROM teams WHERE id=?;', [id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been deleted');
};

exports.updateTeam = (req, res) => {
    var id = req.params.id;
    db.run('UPDATE teams SET tatle=? WHERE id=?;', [req.body.title, id], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    res.send('has been updated');
};