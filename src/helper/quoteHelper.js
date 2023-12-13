import { hideLoader, showLoader, updateDailyQuote, updateQuote } from "../widgets/quote/quote";
import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');

let isUpdateBtn = false;

const updateQuoteHandler = async () => {
    isUpdateBtn = true;
    showLoader();
    await updateQuote();
    hideLoader();
    isUpdateBtn = false;
};

async function quoteMount() {
    const quoteNode = createNode('quote-template');
    const updateQuoteButton = quoteNode.querySelector('.quote__button');

    workingAreaContent.appendChild(quoteNode);
    updateQuoteButton.addEventListener('click', updateQuoteHandler);
    await updateDailyQuote();
}

function quoteUnmount() {
    const quteElement = workingAreaContent.querySelector('.quote');
    const updateQuoteButton = quteElement.querySelector('.quote__button');

    workingAreaContent.removeChild(quteElement);
    updateQuoteButton.removeEventListener('click', updateQuoteHandler);
}

export {
    quoteMount,
    quoteUnmount,
    isUpdateBtn
}