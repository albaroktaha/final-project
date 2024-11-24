"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.getUserData = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, env_1.SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.generateToken = generateToken;
const getUserData = (token) => {
    const user = jsonwebtoken_1.default.verify(token, env_1.SECRET);
    return user;
};
exports.getUserData = getUserData;
// Fungsi untuk memverifikasi token JWT
const verifyToken = (req) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Mengambil token dari header Authorization
    if (!token) {
        throw new Error("Token tidak ditemukan");
    }
    try {
        // Verifikasi token dan ambil data pengguna
        const decoded = jsonwebtoken_1.default.verify(token, env_1.SECRET);
        return decoded; // Mengembalikan payload token (data pengguna)
    }
    catch (error) {
        throw new Error("Token tidak valid");
    }
};
exports.verifyToken = verifyToken;
