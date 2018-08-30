//////////////////////////////////////
function order() {
	var food;
	function waiter(order) {
		chef(order);
		return food;
	}
	function chef(order) {
		if (order === 'pasta') {
			food = ['pasta', 'gravy', 'seasoning'];
			cook();
		}
	}
	function cook() { food.push('cooked'); }
	return waiter;
}
var myOrder = order();
console.log(myOrder('pasta'));
// Array [ "pasta", "gravy", "seasoning", "cooked" ]
//////////////////////////////////////
var name = 'Velma';
console.log(sayCatchPhrase(name)); //"Jinkies!"
function sayCatchPhrase(name) {
	phrases = {
		'Fred Flintstone': 'Yabba dabba doo!',
		'Velma': 'Jinkies!',
		'Razor': 'Bingo!',
		'He-Man': 'I Have the Power'
	};
	return phrases[name];
}

// what is js??
let index = 8;
if (++index == 9) {
	Console.log('Perfect');
}
// This is test for github and my training!!
