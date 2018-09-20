export default class DataBase {
    constructor(champion, runner) {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
        let openCopy = indexedDB && indexedDB.open;
        let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

        if (IDBTransaction) {
            IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
            IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
        }

        if (!indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }

        this.db = null;
        let request = indexedDB.open("worldcup", 1);

        request.onerror = function (event) {
            console.log("error: open db");
        };

        request.onsuccess = (event) => {
            this.db = request.result;
            this.addChampion(2000, champion, runner);
        };

        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            let objectStore = db.createObjectStore("champions", {
                keyPath: "id",
                autoIncrement: true
            });
            for (let i in championData) {
                objectStore.add(championData[i]);
            }
        }
    }

    addChampion(year, champion, runner) {
        let transaction = this.db.transaction(["champions"], "readwrite");
        transaction.oncomplete = function (event) {
            // console.log("oncomplete");
        };
    
        transaction.onerror = function (event) {
            console.log("Error in adding ...", event);
        };
        let objectStore = transaction.objectStore("champions");
    
        let count = objectStore.count();
        let lastYear = 1999;
    
        count.onsuccess = function () {
            // console.log(count.result);
            let request = objectStore.get(count.result);
            request.onerror = function (event) {
                console.log(event);
            };
            request.onsuccess = function (event) {
                // Get the old value that we want to update
                let data = event.target.result;
                if (data) {
                    lastYear = data.year;
                    objectStore.add({
                        year: ++lastYear,
                        champion: champion,
                        runner: runner
                    });
                } else {
                    objectStore.add({
                        year: ++lastYear,
                        champion: champion,
                        runner: runner
                    });
                }
            };
        };
    
    }
}