import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');

function linksSearchMount() {
    const linksSearchNode = createNode('links-search-template');
    workingAreaContent.appendChild(linksSearchNode);
}

function linksSearchUnmount() {
    const linksSearchElement = workingAreaContent.querySelector('.links-search');

    workingAreaContent.removeChild(linksSearchElement);
}

export {
    linksSearchMount,
    linksSearchUnmount
}