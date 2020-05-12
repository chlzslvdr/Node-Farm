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
- **ASYNCHRONOUS** should be used.

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

### CREATING A SIMPLE WEB SERVER
```javascript
const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    res.end('hello world');
});

server.listen(port,() => {
    console.log(`🚀Listening on port `+port);
});
```

### ROUTING
```javascript
const url = require('url');

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
```

- **API** is a service to request data.

- **__dirname** always translate to the directory in which the script were currently executing is located.

## HOW NODE.JS WORKS

### EVENT LOOPS
- All the application code that is inside **callback functions** (non-top-top-level code)
- Node.js is build around callback functions
-  Event-driven architecture:
    * Events are emitted
    * Event loops picks them up
    * Callbacks are called
- Event loop does **orchestration**
        (means that it receives events,calls their callback function and uploads the most expensive task on the throttle)

### THE EVENT-DRIVEN ARCHITECTURE
In nodejs, there are certain Objects called **events emitters** that emit named events as soon as something important happens in the app like request hitting a server or a timer is expiring, or a file finished to read.
These events are picked up by and event listeners that we developers setup which will fire up callback functions that are attached to each listener. i.e, on one hand, we have event emitters, on the other hand, we have event listeners that will react by calling callbacks.

Sample:
```javascript
 const server = http.createServer();

 server.on('request', (req, res) => {
  console.log('request receved');
  res.end('request receved');
 });
```
This 'server.on' is actually how we create and a listener and in this case for the request event. So let's say we have our server running and a new request is made. The server acts as an emitter and will automatically emit an event called request each time that a request hits the server then the callback function attached to this listener will be called which will send some data back to the clients. It works this way because behind the scenes the server is an instance of the event-emitter class and this event-emitter logic is called the observer pattern in javascript and is quite a popular pattern. The idea is there is an observer, in this case, the event listener which keeps observing the subjects that will eventually emit the event that the listener is waiting for. 

### EVENTS

The Observer Pattern
```javascript
const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

// The ON is the observers (listening for an event). They observe the emitter and wait until it emits the newSale event
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});
myEmitter.on("newSale", () => {
  console.log("Costumer name: Joy");
});

// The object that emits events
<!--myEmitter.emit("newSale");-->

// We can even pass arguments to the EventListener by passing them as an additional argument in the emitter
myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 7);

//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

// Listen to close event
server.on("close", () => {
  console.log("Server closed");
});

// Fire up server
server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
```
OUTPUT:
```
There was a new sale!
Costumer name: Joy
There are now 7 items left in stock.
Waiting for requests...
Request received         //when 127.0.0.1:8000 is accessed in the browser
Another request 😀      // 2nd event listener
Request received
Another request 😀
```

### STREAMS
Used to process (read and write) data piece by piece (chunks), without completing the whole read or write operation, and therefore without keeping all the data in memory.
-  Perfect for handling large volumes of data, for example videos (i.e Netflix and Youtube);
-  More efficient data processing in terms of memory (no need to keep all data in memory) and time (we don’t have to wait until all the data is available).

**NodeJS Streams Fundamental**
- **Writable**: streams to which we can write data. For example, ``fs.createWriteStream()`` lets us write data to a file using streams.
- **Readable**: streams from which data can be read(consume) data. For example: ``fs.createReadStream()`` lets us read the contents of a file.
- **Duplex**: streams that are both Readable and Writable. For example, ``net.Socket``
- **Transform**: streams that can modify or transform the data as it is written and read. For example, in the instance of file-compression, you can write compressed data and read decompressed data to and from a file.


SAMPLE STREAM
```javascript
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1 - node will actually have to load the entire file into memory, because only after that's ready, it can then send that data. This is a problem when the file is big, and also when there are a ton of requests hitting your server. 
 
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams - the problem is that ourreadable stream, the one that we're using to read the file from the disk, is much much faster than actually sending the result with the response writable stream over the network. And this will overwhelm the response stream, which cannot handle all this incoming data so fast. And this problem is called backpressure.
  
  // backpressure happens when the response cannot send the data nearly as fast as it is receiving it from the file
 
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", chunk => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // Solution 3 : Pipe Operator - it will automatically handle the speed basically of the data coming in, and the speed of the data going out.
  
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});

```

### COMMONJS MODULE SYSTEM
- Each JavaScript file is treated as a separate module;
- Node.js uses the **CommonJS module system**:require(),exportsormodule.exports;
- **ES module system** is used in browsers: import/export;
