const jwt = require("jsonwebtoken");


exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            status: "Fail",
            message: "Access Denied. No token provided."
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: "Fail",
                message: "Invalid or expired token."
            });
        }

        req.employee = decoded; 
        next(); 
    });
};
