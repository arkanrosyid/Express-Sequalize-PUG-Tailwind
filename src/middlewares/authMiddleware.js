const jwt = require('jsonwebtoken')

const checkUserRole = async (req, next, roles) => {
    try {
        if (!user) {
            throw {statusCode :404, message: "User not found"}
        }
        if (roles.include(user.role)) {
            next()
        }else {
            throw {statusCode:403, message : "Endpoint restricted"}
        }

    } catch (error) {
        next(error)
    }
}

const createRoleMiddleware = (roles) => {
    return async (req, res, next) => {
        checkUserRole(req, res, next);
    }
}

exports.isLogin = async (req, next) => {
    try {
         // check access token from request header first
         const authHeader = req.headers["authorization"];
         let token = authHeader && authHeader.split(" ")[1];
 
         // if no access token in request header then check access token from cookise
         if (!token) {
             cookie = req.headers.cookie;
             const token = cookie.token;
         }
        
         if (!token) {
             throw {statusCode: 401, message: 'Unauthorized'};
         }
         const user = jwt.verify(token, process.env.JWT_SECRET);
         req.user = user;
         next();
        
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            next({ statusCode: 401, message: "Invalid token" });
          } else if (error.name === "TokenExpiredError") {
            next({ statusCode: 403, message: "Token expired" });
          } else {
            next(error);
          }
    }
}

exports.isAdmin = createRoleMiddleware(['admin'])
exports.isGuru = createRoleMiddleware(['guru'])
exports.isGuruPiket = createRoleMiddleware(['guruPiket'])   
