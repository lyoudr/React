/*Server WebSocket*/
const WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var socket = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});
let connectionlists = [];
socket.on('request', function(request) {
  var connection = request.accept('echo-protocol', request.origin);
  connectionlists.push(connection);
  //On message
  connection.on('message', function(message) {
    console.log('message is =>', message);
    if (message.type === 'utf8') {
      connectionlists.forEach((connection) => {
        connection.sendUTF(message.utf8Data); 
      });
    } else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }
  });
  
  //On Close
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});



    