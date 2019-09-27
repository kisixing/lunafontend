#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  console.log(new Date() + 'Server received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, function() {
  console.log(new Date() + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
  httpServer: server,

  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(new Date() + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  var connection = request.accept('echo-protocol', request.origin);
  console.log(new Date() + 'Server connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Server received Message: ' + message.utf8Data);
      const colors = ['red', 'blue', 'yellow', 'pink', 'green', 'skyblue'];
      connection.sendUTF(
        JSON.stringify({ color: colors[Math.round(Math.random() * 5)], message: message.utf8Data })
      );
      connection;
    } else if (message.type === 'binary') {
      console.log('Server received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', function(reasonCode, description) {
    console.log(new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
