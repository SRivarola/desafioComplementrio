export default (error, req, res, next) => {
    return res.status(error.statusCode).json({
        method: req.method,
        path: req.url,
        message: error.message
    })
};