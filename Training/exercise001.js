let promise = new Promise((resolve, reject) => {
	// resolve('done!');
	reject('error');
});

promise.then(
	resolve => alert(resolve),
	// error => console.log(error)
).catch(alert);

// What is this!!
// javascript
// Must be train js
