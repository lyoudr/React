/* Error handler */

const error_handler = (err, req, res, next) => {
    console.error('err is =>', err.stack);
    res.status(500).send('Server error');
}

module.exports = error_handler;