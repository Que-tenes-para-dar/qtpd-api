const errorHandler = (err, req, res, next) => {
    console.log(err);
    // if this occurs because we send a custom error, send it's values. Otherwise send 500
    return res.status(err.statusCode || 500).send({
        message: err.message || 'Internal server error',
        errors: err.stack || err.message,
        errorName: err.name || "InternalServerError"
    });
};

module.exports = errorHandler;