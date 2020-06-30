/* WebSocket */
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});
/* Mysql DataBase */
const mysql = require('mysql');
const mysql_con = mysql.createConnection({
  host: "localhost",
  user: "ann",
  password: "123456",
  database: "mydb"
}); 

let websocket_clients = {};

wss.on('connection', (ws, req, client) => {
  console.log('req.url is =>', req.url);

  const userID = req.url.substr(1);
  websocket_clients[userID] = ws;

  ws.on('open', () => {
    console.log('connection time is =>', Date.now()); 
  });

  ws.on('message', (msg) => {
    const json_msg = JSON.parse(msg);
    console.log('json_msg is =>', json_msg);
    // Save messages to database
    const insert_info = `INSERT INTO chat_table VALUES(default, '${json_msg.who_send}', '${json_msg.person}', '${json_msg.message}', '${json_msg.time}')`;
    mysql_con.query(insert_info, (err, result) => {
      if(err) throw err;
      console.log('result is =>', result);
    });
    websocket_clients[json_msg.who_send].send(msg);
    if(websocket_clients[json_msg.person]){
      websocket_clients[json_msg.person].send(msg);
    }
  });

  ws.on('close', () => {
    console.log('close websocket');
  });
});



    