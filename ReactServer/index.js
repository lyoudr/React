const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../PianoGame/build');

/* Mysql DataBase */
const mysql = require('mysql');
const mysql_con = mysql.createConnection({
  host: "localhost",
  user: "ann",
  password: "Awdxa48624",
  database: "mydb"
});

/* Alogrithm */
// 1. Set
const countfood = require('./foodset');
// 2. Graph(Bellman-Ford)
const countpath = require('./pathgraph');

// Static files
app.use(express.static(publicPath));
// parse application/json
app.use(bodyParser.json());
// CORS
app.use(cors());


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Catch-all => /* 代表其他路由，例如: /login、/pianogame、/courses，當輸入這些 url 時，server 會 send index.html，並且下載所有 JS 檔案(包含 React 的 routing)，React 的 Routing 才會開始作用
// Explan =>  https://tylermcginnis.com/react-router-cannot-get-url-refresh/

/*In the old days, things were simple. If you wanted to get the contents of /dashboard, the browser would make a GET request to your server, by inspecting the path portion of the URL the server would figure out that the user was requesting the /dashboard page. It would then grab that page and send back to the browser as a response. Then these things called client-side routers (CSR) came into the picture. With a CSR (like React Router), you’re no longer making requests to your server every time you change routes. Instead, your CSR is just handling that for you locally on the browser. So when you go to /dashboard, instead of making a GET request to your server, your CSR is using a browser API called history.pushState to manually change the URL and then it renders the View for that specific route - all without causing a page refresh.

Let’s look at that process a little more in depth.

The first time a user loads your app (i.e., visits your website), they don’t have any JavaScript loaded. That means no React and no React Router - so the first request will always be to your server. Then, assuming there was a successful GET request, all your JavaScript loads and React Router confidently hijacks your routing. From here on out, any other route changes in your app will be handled by React Router.

Notice the issue yet? React Router can only load after the first successful GET request to your server (or /). The reason for the dreaded Cannot GET /* error is because, if you’re at /dashboard and then hit refresh, the browser will make a GET request to /dashboard which will fail since you have no logic on your server for handling that request (since React Router is supposed to do it).

In case the issue is still fuzzy, here’s another example. Say you are really proud of the app you’ve been working on and you want to share it with your Mom. The app is Tic Tac Toe and has three routes, /, /play, and leaderboard. You send your Mom the link https://tictactyler.com/play since you want to play with her. When she enters that URL into her browser and hits enter, what happens? At this point, she has no JavaScript, no React, and no React Router. The browser makes a GET request to /play and, since you’re relying on React Router to handle all the routing logic (but she has no React Router yet), the app crashes and she gets Cannot GET /play. */

/*Login*/
// 1. User Login
app.post('/loginpage', (req, res) => {
  console.log('login info is =>', req.body);
  console.log('login req is =>', req.protocol + '://' + req.get('host') + req.originalUrl);
  const userInfo = req.body;
  res.json({
    'status': '200',
    'response': 'ok',
    'userId': userInfo.userId
  });
  res.end();
});


// getDishes
app.post('/food', (req, res) => {
  console.log('req.body is =>', req.body);
  let returneddishes = countfood.countDishes(req.body);
  console.log('returneddishes is =>', returneddishes);
  res.json({ 'status': '200', 'message': 'ok', 'dishes': returneddishes });
  res.end();
});

/* Chat */
// 1. Post personal image to backend
app.post('/uploadimage', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    var oldpath = files.photo.path;
    var newpath = 'C:\Users\ann.ko\Desktop\pictures' + files.photo.name;
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.json({ 'status': '200', 'message': 'ok' });
      res.end();
    });
  });
});

// 2. Save personal data to Mysql DataBase
app.post('/persondata', (req, res) => {
  const userInfo = req.body;
  mysql_con.query(`SELECT * FROM userchat WHERE userId='${userInfo.userId}'`, function (err, result) {
    if (err) throw err;
    if(!result.length){
      const insert_info = `INSERT INTO userchat VALUES ('${userInfo.userId}', '${userInfo.name}', '${userInfo.job}', '${userInfo.hobby}', '${userInfo.guide}', '${userInfo.gender}', '${userInfo.country}', default)`;
      mysql_con.query(insert_info, (err, result) => {
        if (err) throw err;
        if(result.affectedRows === 1){
          res.json({ 'status': '200', 'message': 'ok' });
          res.end();
        }
      });
    } else {
      const update_info = `UPDATE userchat SET name='${userInfo.name}', job='${userInfo.job}', hobby='${userInfo.hobby}', guide='${userInfo.guide}', gender='${userInfo.gender}', country='${userInfo.country}' WHERE userId='${userInfo.userId}'`
      mysql_con.query(update_info, (err, result) => {
        if(err) throw err;
        if(result.affectedRows === 1){
          res.json({ 'status': '200', 'message': 'ok' });
          res.end();
        }
      });
    }
  });
});

// 3. Query chat records
app.get('/chat', (req, res) => {
  const query_person = req.query.personId;
  const query_info = `SELECT who_send, who_receive, message, time FROM chat_table WHERE who_send='${query_person}' OR who_receive = '${query_person}' ORDER BY time`;
  let query_messages = [
    {name: 'John', message: []}, 
    {name: 'Judy', message: []}, 
    {name: 'Mark', message: []}
  ];
  mysql_con.query(query_info, (err, result) => {
    if (err) throw err;
    result.forEach((message) => {
      const arrang_message = (person) => {
        if(person !== query_person ){
          query_messages.forEach(item => {
            if(item.name === person){
              item.message.push(message);
            }
          });
        }
      }
      arrang_message(message.who_send);
      arrang_message(message.who_receive);
    });
    res.json(query_messages);
    res.end();
  });
});

/* Courses */
// 1. Post path to count shortest path
app.post('/shortestpath', (req, res) => {
  let splitedbody1 = req.body[0].split("");
  let splitedbody2 = req.body[1].split("");
  let start = splitedbody1[splitedbody1.length - 1];
  let end = splitedbody2[splitedbody2.length - 1];
  const path = countpath.countPath(start, end);
  res.json({ 'status': '200', 'message': 'ok', 'path': path });
});

/* ShopList */
// 1. Get shop list
app.post('/shoplists', (req, res) => {
  const searchText = req.body.searchText;
  mysql_con.query(`SELECT * FROM shoplist WHERE itemname LIKE '%${searchText}%'`, function (err, results) {
    if (err) throw err;
    console.log('results is =>', results);
    const modified_result = results.map(result => {
      result.isDetail = Boolean(result.isDetail);
      result.detail = JSON.parse(result.detail);
      return result;
    });
    res.json({ data: modified_result });
  });
});
// 2. Get shop items according to Price
app.post('/shop_price', (req, res) => {
  const min_price = Number(req.body.price.slice(0, 3));
  const max_price = Number(req.body.price.slice(6, 10));
  const query_con = `SELECT * FROM shoplist WHERE price BETWEEN ${min_price} AND ${max_price} ORDER BY price`;
  mysql_con.query(query_con, function (err, results) {
    if (err) throw err;
    const modified_result = results.map(result => {
      result.isDetail = Boolean(result.isDetail);
      result.detail = Boolean(result.detail);
      return result;
    });
    res.json(modified_result);
    res.end();
  });
});

app.listen(8085, () => {
  console.log('server listen on port 3000!');
});



