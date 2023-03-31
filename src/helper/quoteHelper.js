import { hideLoader, showLoader, updateDailyQuote, updateQuote } from "../widgets/quote/quote";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const quoteNode = createNode('quote-template');
const updateQuoteButton = quoteNode.querySelector('.quote__button');

let isUpdateBtn = false;

const updateQuoteHandler = async () => {
    isUpdateBtn = true;
    showLoader();
    await updateQuote();
    hideLoader();
    isUpdateBtn = false;
};

async function quoteMount() {
    workingAreaContent.appendChild(quoteNode);
    updateQuoteButton.addEventListener('click', updateQuoteHandler);
    await updateDailyQuote();
}

function quoteUnmount() {
    workingAreaContent.removeChild(quoteNode);
    updateQuoteButton.removeEventListener('click', updateQuoteHandler);
}

export {
    quoteMount,
    quoteUnmount,
    isUpdateBtn
}