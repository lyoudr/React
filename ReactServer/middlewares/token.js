const jwt = require('jsonwebtoken');
const config = require('../config/config');
/*1. Generate Token */
class HandlerGenerator {
  login(req, res) {
    const username = req.body.userId;
    const password = req.body.password;
    // For the given user name fetch user from DB
    let mockedUsername = 'Ann' || 'John' || 'Amy' || 'Bob' || 'Mark' || 'Judy';
    let mockedPassword = '123456';
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        const token = jwt.sign(
          { username: username, password: password },
          config.secret,
          { expiresIn: '24h' }
        )
        // return the JWT token for the future API calls
        res.json({
          status: 'OK',
          token: token,
          userId : username
        });
      } else {
        res.send(401).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
  }
}

const generateToken = new HandlerGenerator();

/*2. Verify Token*/
const checkToken = (req, res, next) => {
  if(req.originalUrl === '/loginpage'){
    next('route');
  } 
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log('unotherize');
    res.writeHead(401);
    res.end('Unotherize');
  }
};

module.exports = {
  generateToken : generateToken,
  checkToken : checkToken
}