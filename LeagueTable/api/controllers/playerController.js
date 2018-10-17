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

const player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }, number: {
        type: Sequelize.INTEGER
    }, overall: {
        type: Sequelize.INTEGER
    }, position: {
        type: Sequelize.INTEGER
    }, team_id: {
        type: Sequelize.INTEGER
    }
});

player.sync({ force: true }).then(() => {
    return player.create();
});
// force: true will drop the table if it already exists
// User.sync({ force: true }).then(() => {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });

// User.findAll().then(users => {
//     console.log(users)
// })


exports.getPlayers = function (req, res) {
    player.findAll().then(players => {
        res.send(players);
    });
};

exports.getPlayerWithId = (req, res) => {
    // var id = req.params.id;
    // db.get('SELECT * FROM players WHERE id=?', [id], (err, row) => {
    //     res.json(row);
    // });
};

exports.addPlayer = (req, res) => {
    player.insertOrUpdate({
        name: req.body.name, 
        number: req.body.number, 
        overall: req.body.overall, 
        position: req.body.position, 
        team_id: req.body.team_id
    }).catch(err => {
        res.send(err.message);
    });
    res.send('OK');
};

exports.deletePlayer = (req, res) => {
    // var id = req.params.id;
    // db.run('DELETE FROM players WHERE id=?;', [id], (err) => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    // });
    // res.send('has been deleted');
};

exports.updatePlayer = (req, res) => {
    // var id = req.params.id;
    // db.run('UPDATE players SET tatle=? WHERE id=?;', [req.body.title, id], (err) => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    // });
    // res.send('has been updated');
};