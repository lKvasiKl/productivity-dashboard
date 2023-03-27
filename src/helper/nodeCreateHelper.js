function createNode(templateId) {
    const template = document.getElementById(templateId);
    const node = template.content.firstElementChild.cloneNode(true);

    return node;
}

export {
    createNode
}