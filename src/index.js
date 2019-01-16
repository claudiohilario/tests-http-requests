const http = require("http");

const appServer1 = require("./server1");
const appServer2 = require("./server2");

const server1 = http.createServer(appServer1);
const server2 = http.createServer(appServer2);

server1.listen(5000);
server2.listen(5001);
