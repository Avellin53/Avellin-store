"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    // Connect to Database
    await (0, database_1.connectDB)();
    const server = http_1.default.createServer(app_1.default);
    server.listen(PORT, () => {
        console.log(`🚀 AVELLIN Backend is running on port ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    // Handle sudden shutdowns
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received. Closing HTTP server...');
        server.close(() => {
            console.log('HTTP server closed.');
            process.exit(0);
        });
    });
};
startServer();
//# sourceMappingURL=server.js.map