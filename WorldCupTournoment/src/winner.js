//prefixes of implementation that we want to test
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
var openCopy = indexedDB && indexedDB.open;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (IDBTransaction) {
    IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
    IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
}

if (!indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const championData = [
    // { id: "1", year: "2000", champion: "Spain" },
    // { id: "2", year: "2001", champion: "Germany" },
];

// indexedDB.deleteDatabase('worldcup');

var db;
var request = indexedDB.open("worldcup", 1);

request.onerror = function(event) {
    console.log("error: ");
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("success: " + db);
    readAll(db);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("champions", {keyPath: "id", autoIncrement:true });
    for (var i in championData) {
        objectStore.add(championData[i]);      
    }
}

function readAll(db) {
	var objectStore = db.transaction("champions").objectStore("champions");
	
	objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
            // console.log("id:" + cursor.key + ", Year: " + cursor.value.year + ", Champion: " + cursor.value.champion);
            var tbody = document.getElementsByTagName('tbody')[0];
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.appendChild(document.createTextNode('' + cursor.value.year));
            tr.appendChild(td);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(cursor.value.champion));
            tr.appendChild(td);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(cursor.value.runner));
            tr.appendChild(td);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(cursor.value.thirth));
            tr.appendChild(td);
            tbody.appendChild(tr);
			cursor.continue();
		} else {
			// console.log("No more entries!");
		}
	};     
}
