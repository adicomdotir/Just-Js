// let promise = new Promise((resolve, reject) => {
// 	// resolve('done!');
// 	reject('error');
// });

// promise.then(
// 	resolve => alert(resolve),
// 	// error => console.log(error)
// ).catch(alert);

// What is this!!
// javascript
// Must be train js

/*
(function(name){
	console.log('hello ' + name);
})('adicom');
*/

// (function(func){
// 	func('adicom');
// })(function(name) {
// 	console.log('hello ' + name);
// });

function indentify() {
	return this.name.toUpperCase();
}
let me = {
	name: 'adicom'
};
console.log(indentify.call());

function foo() {
	console.log( this.a );
	console.log(this);
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo(); // 2

class Vehicle {
engines = 1
ignition() {
output( "Turning on my engine." );
}
drive() {
ignition();
output( "Steering and moving forward!" )
}
}
class Car inherits Vehicle {
wheels = 4
drive() {
inherited:drive()
output( "Rolling on all ", wheels, " wheels!" )
}
}
class SpeedBoat inherits Vehicle {
engines = 2
ignition() {
output( "Turning on my ", engines, " engines." )
}
pilot() {
inherited:drive()
output( "Speeding through the water with ease!" )
}
}