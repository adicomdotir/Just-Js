$(document).ready(function () {
    const teamList = JSON.parse(localStorage.getItem('teamList'));
    const player = JSON.parse(localStorage.getItem('user')).player;
    $("#name").text(player.number + '. ' + player.name);
    $("#age").text(player.age + ' years old');
    $("#overall").text('Overall: ' + player.overall + '/10');
    $("#attack").text('Attack: ' + player.attack + '/10');
    $("#defend").text('Defend: ' + player.defend + '/10');
    $("#position").text(player.position === 1 ? 'GoalKeeper' : 'Player');
    $("#team").text(teamList[player.team_id].name);
});