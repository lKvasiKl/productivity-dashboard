function createNode(templateId) {
    const template = document.getElementById(templateId);
    return template.content.firstElementChild.cloneNode(true);
}

export {
    createNode
}