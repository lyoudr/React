const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});
let websocket_clients = {};

wss.on('connection', (ws, req, client) => {
  console.log('req.url is =>', req.url);
  console.log('client is =>', client);
  const userID = req.url.substr(1);
  websocket_clients[userID] = ws;

  ws.on('open', () => {
    console.log('connection time is =>', Date.now()); 
  });

  ws.on('message', (msg) => {
    let modified_msg = JSON.parse(msg);
    websocket_clients[modified_msg.nameId].send(msg);
    websocket_clients[modified_msg.person].send(msg);
  });

  ws.on('close', () => {
    console.log('close websocket');
  });
});



    