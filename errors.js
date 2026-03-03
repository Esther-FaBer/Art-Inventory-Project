exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({msg:"Not found."});
};

exports.handleBadRequests = (err, req, res, next) => {
    const codes = ["23502", "22P02", "23503", "23505"];

    if(codes.includes(err.code)) {
        res.status(400).send({ msg:"Bad request."});
    } else {
        next(err);
    }
};