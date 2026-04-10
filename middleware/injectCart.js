module.exports = (req, res, next) => {
    res.locals.cart = req.session.cart || [];
    next();
};