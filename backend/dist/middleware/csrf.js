"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.doubleCsrfProtection = void 0;
const csrf_csrf_1 = require("csrf-csrf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { doubleCsrfProtection, generateCsrfToken, } = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: () => process.env.CSRF_SECRET || 'super_secret_fallback',
    getSessionIdentifier: (req) => req.ip || 'anonymous', // In modern apps, this would be a session ID
    cookieName: 'x-csrf-token',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    },
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
});
exports.doubleCsrfProtection = doubleCsrfProtection;
exports.generateToken = generateCsrfToken;
//# sourceMappingURL=csrf.js.map