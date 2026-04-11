"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const security_1 = require("./middleware/security");
const csrf_1 = require("./middleware/csrf");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// --- 1. Top-level Security Middlewares ---
app.use(security_1.helmetMiddleware);
app.use(security_1.corsMiddleware);
app.use(security_1.generalLimiter);
// --- 2. Parsers ---
app.use(express_1.default.json({ limit: '10kb' })); // Body limit to prevent DoS
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// --- 3. CSRF Protection (applied to all routes except excluded ones) ---
// Note: csrf-csrf automatically ignores GET/HEAD/OPTIONS based on config
app.use(csrf_1.doubleCsrfProtection);
// --- 4. Routes ---
app.use('/api/v1', routes_1.default);
// --- 5. 404 Handler ---
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
// --- 6. Global Error Handler ---
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ error: 'Invalid CSRF Token. Possible CSRF attack detected.' });
    }
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map