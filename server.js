const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.static(path.resolve(__dirname, 'assets')));

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
