const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');        // If we do not return anything like 'utf-8, it will return a buffer

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File is written');
