let hello = " Hello, World! ";
let wsRegex = /^\s+(\w+,\s\w+!)\s+$/; // Change this line
let result = hello.replace(wsRegex, '$1'); // Change this line