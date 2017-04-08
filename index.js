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

process.stdout.write(exporter(str));
