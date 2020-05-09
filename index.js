const fs = require('fs');
const http = require('http');
const url = require('url');
const port = process.env.PORT || 8000;


///////////////////// FILES /////////////////////
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');        // If we do not return anything like 'utf-8, it will return a buffer

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File is written');

// // Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR 😓');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('Your file has been written 😁');
//             })
//         });
//     });
// });
// console.log('Will read file!');


///////////////////// SERVER /////////////////////

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('OVERVIEW');
    } else if (pathName === '/product') {
        res.end('PRODUCT');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(port,() => {
    console.log(`Listening on port `+port);
});