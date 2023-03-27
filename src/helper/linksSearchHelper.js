import { createNode } from "./nodeCreateHelper";

const workingAreaContent = document.querySelector('.main');
const linksSearchNode = createNode('links-search-template');

function linksSearchMount() {
    workingAreaContent.appendChild(linksSearchNode);
}

function linksSearchUnmount() {
    workingAreaContent.removeChild(linksSearchNode);
}

export {
    linksSearchMount,
    linksSearchUnmount
}