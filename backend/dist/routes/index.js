"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const csrf_1 = require("../middleware/csrf");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// --- Public Routes ---
// Health Check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'AVELLIN Backend is operational' });
});
// CSRF Token Generation
router.get('/csrf-token', (req, res) => {
    const token = (0, csrf_1.generateToken)(req, res);
    res.json({ csrfToken: token });
});
// Auth Routes (Login, Register)
router.use('/auth', authRoutes_1.default);
// --- Protected Sample Routes ---
// Protected: Any logged in user
router.get('/profile', auth_1.protect, (req, res) => {
    res.json({
        status: 'success',
        data: { user: req.user },
    });
});
// Restricted: Vendor Dashboard access
router.get('/vendor/dashboard', auth_1.protect, (0, auth_1.restrictTo)(client_1.UserRole.VENDOR), (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to the Vendor Dashboard',
        vendor: req.user?.vendorProfile,
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map