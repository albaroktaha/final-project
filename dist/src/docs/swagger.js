"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API BukaToko",
        description: "Dokumentasi API BukaToko",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            LoginRequest: {
                email: "joni2024@yopmail.com",
                password: "123412341",
            },
            RegisterRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
            UpdateProfileRequest: {
                fullName: "joni joni",
                username: "joni2024",
                email: "joni2024@yopmail.com",
                password: "123412341",
                confirmPassword: "123412341",
            },
        },
    },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];
(0, swagger_autogen_1.default)({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
