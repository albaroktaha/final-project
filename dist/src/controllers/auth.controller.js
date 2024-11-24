"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_model_1 = __importDefault(require("../models/user.model"));
const Yup = __importStar(require("yup"));
const auth_service_1 = require("../services/auth.service");
const registerSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), ""], "Passwords must match"),
    roles: Yup.array().of(Yup.string()).optional(),
});
const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
            #swagger.tags = ['Auth']
            #swagger.requestBody = {
              required: true,
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
            */
            try {
                const { email, password } = req.body;
                yield loginSchema.validate({ email, password });
                const token = yield (0, auth_service_1.login)({ email, password });
                res.status(200).json({
                    message: "login success",
                    data: token,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    data: null,
                    message: err.message,
                });
            }
        });
    },
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
            #swagger.tags = ['Auth']
            #swagger.requestBody = {
              required: true,
              schema: {
                $ref: "#/components/schemas/RegisterRequest"
              }
            }
            */
            try {
                const { email, fullName, password, username, confirmPassword, roles } = req.body;
                yield registerSchema.validate({
                    email,
                    fullName,
                    password,
                    username,
                    confirmPassword,
                    roles,
                });
                const user = yield (0, auth_service_1.register)({
                    email,
                    fullName,
                    username,
                    password,
                    roles,
                });
                res.status(200).json({
                    message: "registration success!",
                    data: user,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    data: err.message,
                    message: "Failed register",
                });
            }
        });
    },
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            /**
            #swagger.tags = ['Auth']
            #swagger.security = [{
              "bearerAuth": []
            }]
            */
            try {
                const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const user = yield user_model_1.default.findById(id);
                if (!user) {
                    return res.status(403).json({
                        message: "user not found",
                        data: null,
                    });
                }
                res.status(200).json({
                    message: "success fetch user profile",
                    data: user,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    data: err.message,
                    message: "Failed get user profile",
                });
            }
        });
    },
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            /**
            #swagger.tags = ['Auth']
            #swagger.requestBody = {
              required: true,
              schema: {$ref: "#/components/schemas/UpdateProfileRequest"}
            }
            #swagger.security = [{
              "bearerAuth": []
            }]
            */
            try {
                const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield (0, auth_service_1.updateProfile)(id, req.body);
                res.status(200).json({
                    message: "Profile updated successfully",
                    data: result,
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    data: err.message,
                    message: "Failed update user profile",
                });
            }
        });
    },
};
