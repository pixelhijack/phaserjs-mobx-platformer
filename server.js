const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.static(path.resolve(__dirname, 'assets')));

app.get('/level/:id', function (req, res) {
    console.log('[SERVER] GET /level/', req.params.id);
    res.sendFile(path.normalize(__dirname + '/assets/levelconfigs/levelconfig-' + req.params.id + '.json'));
});

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
