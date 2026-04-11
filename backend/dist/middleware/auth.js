"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const database_1 = __importDefault(require("../config/database"));
const protect = async (req, res, next) => {
    try {
        let token;
        // 1. Get token from cookies or Authorization header
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ error: 'You are not logged in. Please log in to get access.' });
        }
        // 2. Verify token
        const decoded = (0, jwt_1.verifyToken)(token);
        // 3. Check if user still exists
        const user = await database_1.default.user.findUnique({
            where: { id: decoded.id },
            include: { vendorProfile: true }
        });
        if (!user) {
            return res.status(401).json({ error: 'The user belonging to this token no longer exists.' });
        }
        // 4. Grant access to protected route
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.js.map