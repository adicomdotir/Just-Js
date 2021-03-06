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
    let arr = [];
    objectStore.getAll().onsuccess = function(event) {
        const result = event.target.result;
        for (var i = 0; i < result.length; i++) {
            let obj = { name: result[i].champion, score: 3 };
            let res = arr.filter(s => s.name === obj.name);
            if (res.length === 0) {
                arr.push(obj);
            } else {
                res.map(s => {
                    s.score += obj.score
                });
            }
            obj = { name: result[i].runner, score: 2 };
            res = arr.filter(s => s.name === obj.name);
            if (res.length === 0) {
                arr.push(obj);
            } else {
                res.map(s => {
                    s.score += obj.score
                });
            }
        }
        arr.sort(function (a, b) {
            return b.score - a.score;
        });
        for (var i = 0; i < arr.length; i++) {
            var tbody = document.getElementsByTagName('tbody')[0];
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.appendChild(document.createTextNode('' + (i + 1)));
            tr.appendChild(td);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode('' + arr[i].name));
            tr.appendChild(td);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(arr[i].score));
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    };
}
