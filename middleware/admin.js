module.exports = function(req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden (can't access resource)
    console.log("running admin middleware function");
    if (!req.user.isAdmin) return res.status(403).send("access denied, user is not admin");
    next();
}