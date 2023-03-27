function getCache() {
    return JSON.parse(localStorage.getItem('cache')) || {};
}

function saveCache(cache) {
    localStorage.setItem('cache', JSON.stringify(cache));
}

function isCacheValid(cacheEntry) {
    return cacheEntry.expirationDate > new Date().getTime();
}

export {
    getCache,
    saveCache,
    isCacheValid
}