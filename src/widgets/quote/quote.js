import {getQuote} from "../../services/quoteService";

const currentDate = new Date().getDate();

async function updateDailyQuote() {
    const quoteText = document.querySelector('[data-quote]');
    const quoteData = localStorage.getItem('quote');
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!quoteData || lastVisitDate < currentDate) {
        await updateQuote();
    }

    quoteText.textContent = localStorage.getItem('quote');
}

async function updateQuote() {
    const quoteText = document.querySelector('[data-quote]');
    let quote = undefined;

    while (!quote) {
        quote = await getQuote();
    }

    localStorage.setItem('quote', `"${quote}"`);
    localStorage.setItem('lastVisitDate', currentDate);
    quoteText.textContent = localStorage.getItem('quote');
}

export {
    updateDailyQuote,
    updateQuote
}
