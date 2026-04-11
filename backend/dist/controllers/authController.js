"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerVendor = exports.registerBuyer = void 0;
const database_1 = __importDefault(require("../config/database"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const client_1 = require("@prisma/client");
const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};
const registerBuyer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        const hashedPassword = await (0, password_1.hashPassword)(password);
        const user = await database_1.default.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                role: client_1.UserRole.BUYER,
            },
        });
        const token = (0, jwt_1.signToken)(user.id, user.role);
        res.cookie('jwt', token, cookieOptions);
        res.status(201).json({
            status: 'success',
            data: { user: { id: user.id, email: user.email, role: user.role } },
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.registerBuyer = registerBuyer;
const registerVendor = async (req, res) => {
    try {
        const { email, password, brandName, storeSlug } = req.body;
        if (!email || !password || !brandName || !storeSlug) {
            return res.status(400).json({ error: 'Missing required vendor fields' });
        }
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Atomic transaction to create User and VendorProfile
        const result = await database_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    role: client_1.UserRole.VENDOR,
                },
            });
            const vendorProfile = await tx.vendorProfile.create({
                data: {
                    userId: user.id,
                    brandName,
                    storeSlug,
                    verificationStatus: client_1.VerificationStatus.PENDING,
                },
            });
            return { user, vendorProfile };
        });
        const token = (0, jwt_1.signToken)(result.user.id, result.user.role);
        res.cookie('jwt', token, cookieOptions);
        res.status(201).json({
            status: 'success',
            data: {
                user: { id: result.user.id, email: result.user.email, role: result.user.role },
                vendorProfile: result.vendorProfile,
            },
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email or Store Slug already exists' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.registerVendor = registerVendor;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user || !(await (0, password_1.comparePasswords)(password, user.passwordHash))) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }
        const token = (0, jwt_1.signToken)(user.id, user.role);
        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({
            status: 'success',
            data: { user: { id: user.id, email: user.email, role: user.role } },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map