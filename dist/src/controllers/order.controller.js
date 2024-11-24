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
const order_model_1 = __importDefault(require("../models/order.model"));
const Yup = __importStar(require("yup"));
const createOrderValidationSchema = Yup.object().shape({
    grandTotal: Yup.number().required(),
    orderItems: Yup.array()
        .of(Yup.object().shape({
        name: Yup.string().required(),
        productId: Yup.string().required(),
        price: Yup.number().required(),
        quantity: Yup.number().min(1).max(5).required(),
    }))
        .required(),
    status: Yup.mixed().oneOf(["pending", "completed", "cancelled"]).required(),
});
exports.default = {
    // Create Order
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield createOrderValidationSchema.validate(req.body);
                const result = yield order_model_1.default.create(req.body);
                res.status(201).json({
                    data: result,
                    message: "Success create product",
                });
            }
            catch (error) {
                if (error instanceof Yup.ValidationError) {
                    res.status(400).json({
                        data: error.errors,
                        message: "Failed create product",
                    });
                    return;
                }
                const err = error;
                res.status(500).json({
                    data: err.message,
                    message: "Failed create product",
                });
            }
        });
    },
    // Get User Orders
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit = 10, page = 1, search = "", } = req.query;
                const query = {};
                if (search) {
                    Object.assign(query, {
                        name: { $regex: search, $options: "i" },
                    });
                }
                const result1 = yield order_model_1.default.find(query);
                const result = yield order_model_1.default.findOne({
                    createdBy: req.params.createdby,
                });
                const total = yield order_model_1.default.countDocuments(query);
                res.status(200).json({
                    data: result1,
                    message: "Success get one product",
                    page: +page,
                    limit: +limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                });
            }
            catch (error) {
                const err = error;
                res.status(500).json({
                    data: err.message,
                    message: "Failed get one product",
                });
                return;
            }
        });
    }
};
