#!/usr/bin/env node
const fs = require('fs');
const args = process.argv;
const filename = args[2];
const exporter = require('./lib/index.js');

if (!filename) {
    console.error(`Usage: ${args[1]} filename.styl > filename.pcss`);
    process.exit(255);
}

const str = fs.readFileSync(filename).toString();

try {
    // process.stdout.write(exporter(str));
    exporter(str);
} catch (e) {
    process.stdout.write(`error at processing '${filename}':\n${e.stack}`);
}
