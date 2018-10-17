const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    // SQLite only
    storage: 'database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const team = sequelize.define('team', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});

team.sync({ force: true }).then(() => {
    return team.create();
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
    team.insertOrUpdate({
        name: req.body.name
    }).catch(err => {
        res.send(err.message);
    });
    res.send('OK');
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