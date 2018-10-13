const express = require('express');
const router = express.Router();

const teams = require('../controllers/teamController');

// get all teams
router.get('/teams', teams.getTeams);
// get a team with id
router.get('/team/:id', teams.getTeamWithId);
// add team
router.post('/team', teams.addTeam);
// delete team
router.delete('/team/:id', teams.deleteTeam);
// update team
router.put('/team/:id', teams.updateTeam);

module.exports = router;