const express = require('express');
const router = express.Router();

const players = require('../controllers/playerController');

// get all players
router.get('/players', players.getPlayers);
// get a player with id
router.get('/player/:id', players.getPlayerWithId);
// add player
router.post('/player', players.addPlayer);
// delete player
router.delete('/player/:id', players.deletePlayer);
// update player
router.put('/player/:id', players.updatePlayer);

module.exports = router;