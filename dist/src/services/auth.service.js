"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.me = exports.register = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const userByEmail = yield user_model_1.default.findOne({
        email,
    });
    if (!userByEmail) {
        return Promise.reject(new Error("email: user not found"));
    }
    const validatePassword = (0, encryption_1.encrypt)(password) === userByEmail.password;
    if (!validatePassword) {
        return Promise.reject(new Error("password: user not found"));
    }
    const token = (0, jwt_1.generateToken)({
        id: userByEmail._id,
        roles: userByEmail.roles,
    });
    return token;
});
exports.login = login;
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, username, password, roles } = payload;
    const user = yield user_model_1.default.create({
        email,
        fullName,
        password,
        username,
        roles,
    });
    return user;
});
exports.register = register;
const me = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        return Promise.reject(new Error("user not found"));
    }
    return user;
});
exports.me = me;
const updateProfile = (userId, updateUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate(userId, Object.assign({}, updateUserData), {
        new: true,
    });
    if (!result) {
        return Promise.reject(new Error("failed update user"));
    }
    return result;
});
exports.updateProfile = updateProfile;
