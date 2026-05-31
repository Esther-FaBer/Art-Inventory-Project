exports.handlePathNotFound = (req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404;
    next(error);
};

exports.handleBadRequests = (err, req, res, next) => {
    const codes = ["23502", "22P02", "23503", "23505"];
    if(codes.includes(err.code)) {
        res.status(400).send({ msg:"Bad request."});
    } else {
        next(err);
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.statusCode || err.status){
    res.status(err.statusCode || err.status).send({ msg: err.msg || err.message });
    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Server Error."})
};
