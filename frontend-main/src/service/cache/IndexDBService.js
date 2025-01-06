export function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ImageCacheDB', 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            db.createObjectStore('images', { keyPath: 'url' });
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.errorCode);
        };
    });
}

export function storeImageInDB(url, blob) {
    openIndexedDB().then(db => {
        const transaction = db.transaction(['images'], 'readwrite');
        const store = transaction.objectStore('images');
        store.put({ url, blob });
    });
}

export function getImageFromDB(url) {
    return new Promise((resolve, reject) => {
        openIndexedDB().then(db => {
            const transaction = db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const request = store.get(url);

            request.onsuccess = function(event) {
                resolve(event.target.result ? event.target.result.blob : null);
            };

            request.onerror = function(event) {
                reject(event.target.errorCode);
            };
        });
    });
}