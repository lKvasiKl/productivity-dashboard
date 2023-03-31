import { getCache, saveCache } from "../../helper/cacheHelper";
import { isUpdateBtn } from "../../helper/quoteHelper";
import { getQuote } from "../../services/quoteService";

const currentDate = new Date().getDate();
const locale = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase() || 'en';

async function updateDailyQuote() {
    const quoteText = document.querySelector('.quote__text');
    const quoteData = localStorage.getItem('quote');
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!quoteData || lastVisitDate < currentDate) {
        showLoader();
        await updateQuote();
    }
    
    showQuote();
}

async function updateQuote() {
    const quoteText = document.querySelector('.quote__text');

    const cache = getCache('quoteCache');
    const cacheEntry = cache[locale];

    if (cacheEntry && !isUpdateBtn) {
        quoteText.textContent = `"${cacheEntry.quoteText}"`;
        hideLoader();
        showQuote();
        return;
    }

    const quote = await getQuote();

    cache[locale] = {
        quoteText: quote,
    }

    saveCache('quoteCache', cache);
    quoteText.textContent = `"${cache[locale].quoteText}"`;
    hideLoader();
    showQuote();
}

function showLoader() {
    const quoteContainer = document.querySelector('.quote');
    const quote = quoteContainer.querySelector('.quote__container');
    const loader = quoteContainer.querySelector('.loader');

    loader.classList.toggle('visible');
    quote.classList.remove('visible');
}

function hideLoader() {
    const quoteContainer = document.querySelector('.quote');
    const quote = quoteContainer.querySelector('.quote__container');
    const loader = quoteContainer.querySelector('.loader');

    loader.classList.remove('visible');
    quote.classList.toggle('visible');
}

function showQuote() {
    const quoteContainer = document.querySelector('.quote');
    const quote = quoteContainer.querySelector('.quote__container');

    quote.classList.toggle('visible');
}

export {
    updateDailyQuote,
    updateQuote,
    showLoader,
    hideLoader
}
