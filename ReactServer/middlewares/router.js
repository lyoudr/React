const express = require('express');
const router = express.Router();

const LogTime = (req, res, next) => {
    console.log('Time is =>', Date.now());
    next();
}

const ReqUrl = (req, res, next) => {
    console.log('request url is =>', req.originalUrl);
    next();
}

router.get('/user/:id', [LogTime, ReqUrl], (req, res, next) => {
    console.log('req.params is =>', req.params);
    res.json({status : 'ok'});
    res.end();
});

module.exports = router;
