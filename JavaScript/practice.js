// const users = [
// 	{
// 		name: 'Ali',
// 		age: 25
// 	},
// 	{
// 		name: 'Hassan',
// 		age: 29
// 	},
// 	{
// 		name: 'Yaser',
// 		age: 20
// 	},
// ];
// users.forEach((user) => {
// 	console.log(user);
// });

// const user2 = users.filter((user) => {
// 	return user.age <= 25
// });
// console.log(user2);
// function User(){
// 	var username, password;
// 	function doLogin(user,pw) {
// 		username = user;
// 		password = pw;

// 		// do the rest of the login work
// 	}
// 	var publicAPI = {
// 		login: doLogin
// 	};
// 	return publicAPI;
// }

// // create a `User` module instance
// var fred = User();
// fred.login( "adicom", "12Battery34!" );

// //--------------------//
// (function IIFE(){
// 	console.log( "Hello!" );
// })();
// // "Hello!"

// function makeNum(x) {
// 	function add(y) {
// 		return y + x;
// 	};
// 	return add;
// }

// var addOne = makeNum(1);
// var addTen = makeNum(10);

// addOne(3);		// 4  <-- 1 + 3
// addOne(41);		// 42 <-- 1 + 41
// addTen(13);		// 23 <-- 10 + 13

// // Closure Example
// function sayHello(name) {
// 	var text = 'Hello ' + name;
// 	var say = function() { console.log(text); }
// 	say();
// }
// sayHello('Adicom');

// function sayHello2(name) {
// 	var text = 'Hello ' + name; // Local variable
// 	var say = function() { console.log(text); }
// 	return say;
// }
// var say2 = sayHello2('Adicom');
// say2(); // logs "Hello Adicom"

// function say667() {
// 	// Local variable that ends up within closure
// 	var num = 42;
// 	var say = function() { console.log(num); }
// 	num++;
// 	return say;
// }
// var sayNumber = say667();
// sayNumber(); // logs 43

//////////////////////////////////////
// Below code is for ES5
// var promise1 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });
// let myPromise = new Promise((resovle, reject) => {
// 	setTimeout(() => {
// 		resovle('message');
// 		// reject('error')
// 	}, 2000)
// });
// myPromise.then((message) => {
// 	console.log("HelloWorld1 " + message);
// 	return 0;
// }).then((message) => {
// 	console.log("HelloWorld2 " + message);
// }).catch((error) => {
// 	console.log(error);
// });

// function doAsyncTask(cb) {
//   setTimeout(() => {
//     console.log("Async Task Calling Callback");
//     cb();
//   }, 1000);
// }
// doAsyncTask(() => console.log("Callback Called"));
// Promise.resolve("done")
//   .then(
//     (val) => {
//       console.log(val);
//       return 'done2';
//     },
//     (err) => console.error(err)
//   )
//   .then(
//     (val) => console.log(val),
//     (err) => console.error(err)
//   );