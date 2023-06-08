const jwt = require("jsonwebtoken");
const config = process.env;

const validateToken = async (req, res, next) => {
    const token = req.body.accessToken || req.query.accessToken || req.headers["x-access-token"];
    if (!token)
        return res.status(403).send("A token is required for authentication");
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = validateToken;