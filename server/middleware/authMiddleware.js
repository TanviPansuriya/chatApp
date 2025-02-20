const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please log in again" });
        }
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = auth;
