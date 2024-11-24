"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = exports.SECRET = exports.DATABASE_URL = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "957216835935484";
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "7psc43eiO0jO44zHIoIr7-Coxp860gKTcWS63IwDO9de5XtGttWFQ4";
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dpri4itxw";
exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://albaroktahaa:LRVN0hxa3M7mF8Ft@cluster-wpu-course.e9818.mongodb.net/?retryWrites=true&w=majority&appName=cluster-wpu-course";
exports.SECRET = process.env.SECRET || "secret";
// Konfigurasi transporter untuk mengirim email
exports.mail = nodemailer_1.default.createTransport({
    service: "zoho", // Sesuaikan dengan penyedia email yang kamu pakai
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
