function getCache(cahceKey) {
    return JSON.parse(localStorage.getItem(cahceKey)) || {};
}

function saveCache(cahceKey, cache) {
    localStorage.setItem(cahceKey, JSON.stringify(cache));
}

function isCacheValid(cacheEntry) {
    return cacheEntry.expirationDate > new Date().getTime();
}

export {
    getCache,
    saveCache,
    isCacheValid
}