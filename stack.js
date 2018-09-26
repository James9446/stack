const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const nameOptions = {
    describe: 'The name of your stack',
    demand: true,
    alias: 'n'
};

const argv = yargs
    .command('undo', 'Remove the last layer added to the stack')
    .command('redo', 'Return the previously deleted layer to the stack')
    .command('clear', 'Clear the stack')
    .command('print', 'Print current stack')
    .command('list', 'Print a list of archived stacks')
    .command('save', 'Save your stack', {
        name: nameOptions
    })
    .command('load', 'Load a saved stack', {
        name: nameOptions
    })
    .help()
    .argv;
const call = require('./call.js');

let command = argv._[0];

if (command === 'undo') {
    call.undoLayer();
    call.displayStack();
} else if (command === 'redo') {
    call.redoLayer();
    call.displayStack();
} else if (command === 'clear') {
    call.clearStack();
} else if (command === 'save') {
    call.archiveStack(argv.name);
} else if (command === 'load') {
    call.loadStack(argv.name)
    call.displayStack();
} else if (command === 'list') {
    call.listStack();
} else if (command === 'print') {
    call.displayStack();
} else {
    call.addLayer(command);
    call.displayStack();
}
