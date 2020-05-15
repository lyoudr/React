const express = require('express');
const app = express();

// Login JWT Token
const cors = require('cors');

const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../PianoGame/build');

/* Alogrithm */
//1. Set
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
    const userInfo = req.body;
    res.json({
        'status': '200', 
        'response': 'ok',
        'userId': userInfo.userId
    });
    res.end();
});


// getDishes
app.post('/food',(req, res) =>{
    console.log('req.body is =>', req.body);
    let returneddishes = countfood.countDishes(req.body);
    console.log('returneddishes is =>', returneddishes);
    res.json({'status':'200', 'message': 'ok', 'dishes': returneddishes});
    res.end();
});

/* Chat */
// 1. Post personal image to backend
app.post('/uploadimage' ,(req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        var oldpath = files.photo.path;
        var newpath = 'C:\Users\ann.ko\Desktop\pictures' + files.photo.name;
        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err;
            res.json({'status':'200', 'message': 'ok'});
            res.end();
        });
    });
});

// 2. Save personal data to backend
app.post('/persondata', (req, res) => {
    res.json({'status':'200', 'message': 'ok'});
    res.end();
});

app.get('/chat', (req, res) => {
    console.log('req is =>', req.query.personId);
    res.json([{'name': 'John'}, {'name': 'Judy'},{'name': 'Mark'}]);
});

// Post path to count shortest path
app.post('/shortestpath', (req, res) => {
    let splitedbody1 = req.body[0].split("");
    let splitedbody2 = req.body[1].split("");
    let start = splitedbody1[splitedbody1.length - 1];
    let end = splitedbody2[splitedbody2.length - 1];
    const path = countpath.countPath(start, end);
    res.json({'status':'200', 'message': 'ok', 'path': path});
});
// Get shop list
app.post('/shoplists', (req, res) => {
    let searchText = req.body;
    console.log('searchText is =>', searchText);
    res.json({'status': '200', 'data': [
        {
            id : 'tshirt_1',
            imgsrc : '../../../assets/images/T_shirt_1.jpg',
            itemname: 'T_shirt_1',
            isDetail : false,
            detail : {
                img : '../../../assets/images/T_shirt_1.jpg',
                explain : 'A T-shirt is a style of fabric shirt named after the T shape of its body and sleeves. Traditionally it has short sleeves and a round neckline, known as a crew neck, which lacks a collar. T-shirts are generally made of a stretchy, light and inexpensive fabric and are easy to clean.',
                price : '300$'
            }
        },
        {
            id : 'tshirt_2',
            imgsrc : '../../../assets/images/T_shirt_2.jpg',
            itemname: 'T_shirt_2',
            isDetail : false,
            detail : {
              img : '../../../assets/images/T_shirt_2.jpg',
              explain : 'Typically made of cotton textile in a stockinette or jersey knit, it has a distinctively pliable texture compared to shirts made of woven cloth. Some modern versions have a body made from a continuously knitted tube, produced on a circular knitting machine, such that the torso has no side seams. The manufacture of T-shirts has become highly automated and may include cutting fabric with a laser or a water jet.',
              price : '200$'
            }
        },
        {
            id : 'tshirt_3',
            imgsrc : '../../../assets/images/T_shirt_3.jpg',
            itemname: 'T_shirt_3',
            isDetail : false,
            detail : {
              img : '../../../assets/images/T_shirt_3.jpg',
              explain : 'A V-neck T-shirt has a V-shaped neckline, as opposed to the round neckline of the more common crew neck shirt (also called a U-neck). V-necks were introduced so that the neckline of the shirt does not show when worn beneath an outer shirt, as would that of a crew neck shirt.',
              price : '100$'
            }
        },
        {
            id : 'tshirt_4',
            imgsrc : '../../../assets/images/T_shirt_4.jpg',
            itemname: 'T_shirt_4',
            isDetail : false,
            detail : {
              img : '../../../assets/images/T_shirt_4.jpg',
              explain : 'The T-shirt evolved from undergarments used in the 19th century. First, the one-piece union suit underwear was cut into separate top and bottom garments, with the top long enough to tuck under the waistband of the bottoms. With and without buttons, they were adopted by miners and stevedores during the late 19th century as a convenient covering for hot environments.',
              price : '400$'
            }
        },
        {
            id : 'tshirt_5',
            imgsrc : '../../../assets/images/T_shirt_5.jpg',
            itemname: 'T_shirt_5',
            isDetail : false,
            detail : {
              img : '../../../assets/images/T_shirt_5.jpg',
              explain : 'Current versions are available in many different designs and fabrics, and styles include crew-neck and V-neck shirts. T-shirts are among the most worn garments of clothing used today. T-shirts are especially popular with branding for companies or merchandise, as they are inexpensive to make and purchase.',
              price : '500$'
            }
        }
    ]});
});

app.listen(8085, () => {
    console.log('server listen on port 8085!');
});