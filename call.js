const fs = require('fs');

const fetchStack = (location='./json/stack.json') => {
    try {
        return JSON.parse(fs.readFileSync(location));
    } catch (err) {
        return [];
    }
};

const saveStack = (stack, location='./json/stack.json') => {
    fs.writeFileSync(location, JSON.stringify(stack));
};

const addLayer = (layer) => {
    let stack = fetchStack();
    stack.unshift(layer);
    saveStack(stack);
};

const displayStack = () => {
    let stack = fetchStack();
    let display = '';
    stack.forEach( layer => display += `${layer} \n`);
    console.log(display);
};

const clearStack = () => {
    saveStack([])
};

const archiveStack = (name) => {
    let stack = fetchStack();
    saveStack(stack, `./json/archive/${name}.json`);
};

const loadStack = (name) => {
    let stack = fetchStack(`./json/archive/${name}.json`);
    saveStack(stack);
};

const listStack = () => {
    let list = './json/archive/'
    fs.readdirSync(list).forEach(file => {
        console.log(file.split('.')[0]);
    })
};

const undoLayer = () => {
    let stack = fetchStack();
    let topLayer = stack.shift();
    saveStack(stack);
    let removed = fetchStack('./json/removed-layers.json');
    removed.push(topLayer);
    saveStack(removed, './json/removed-layers.json');
};

const redoLayer = () => {
    let removed = fetchStack('./json/removed-layers.json');
    let layer = removed.pop();
    if (layer) {
        saveStack(removed, './json/removed-layers.json');
        addLayer(layer);
    }
};

module.exports = {
    addLayer,
    displayStack,
    clearStack,
    archiveStack,
    loadStack,
    listStack,
    undoLayer,
    redoLayer
}