# Introduction to NodeJS

### What is NodeJS?
NodeJS is a Javascript runtime built on google's open-source V8 Javascript Engine.

### How to run a NodeJS app on terminal:
```
node index.js        // node + filename
```
or
```
nodemon             // To automatically reload when file is saved
```

### READING AND WRITING FILES
```javascript
const fs = require('fs');

// If we do not return anything like 'utf-8, it will return a buffer
// fs.readFileSync( path, options )
const textIn = fs.readFileSync('input.txt', 'utf-8');
console.log(textIn);
```

```javascript
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on${Date.now()}`;

// Will create a output.txt file
// fs.writeFileSync( file, data, options )
fs.writeFileSync('output.txt', textOut);
console.log('File is written');
```

### SYNCHRONOUS VS. ASYNCHRONOUS CODE (BLOCKING VS. NON-BLOCKING)
The above code is a SYNCHRONOUS and Blocking Code Execution

```javascript
const fs = require('fs');

// Non-blocking code execution
fs.readFile('input.txt', 'utf-8', (err, data) => {
   console.log(data);
});

console.log('Reading file...);

```
**ASYNCHRONOUS** should be used.

### READING AND WRITING FILES ASYNCHRONOUSLY
```javascript
const fs = require('fs');

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
                console.log('Your file has been written 😁');
            })
        });
    });
});
console.log('Will read file!');
```