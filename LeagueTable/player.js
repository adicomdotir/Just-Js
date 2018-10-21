$(document).ready(function () {
    const player = JSON.parse(localStorage.getItem('user')).player;
    $("#name").text(player.name);
    $("#age").text(player.age + ' years old');
    $("#overall").text('Overall: ' + player.overall + '/10');
    $("#attack").text('Attack: ' + player.attack + '/10');
    $("#defend").text('Defend: ' + player.defend + '/10');
    $("#position").text(player.position);
    $("#team").text(player.team_id);
    $("#number").text('NUMBER: ' + player.number);
});