exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({msg:"Not found."});
};