import { updateDailyQuote, updateQuote } from "../widgets/quote/quote";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const quoteNode = createNode('quote-template');
const updateQuoteButton = quoteNode.querySelector('[data-update-quote-button]');

const updateQuoteHandler = () => updateQuote();

function quoteMount() {
    workingAreaContent.appendChild(quoteNode);
    updateQuoteButton.addEventListener('click', updateQuoteHandler);
    updateDailyQuote();
}

function quoteUnmount() {
    workingAreaContent.removeChild(quoteNode);
    updateQuoteButton.removeEventListener('click', updateQuoteHandler);
}

export {
    quoteMount,
    quoteUnmount
}