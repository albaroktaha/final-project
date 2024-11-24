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
const mongoose_1 = __importDefault(require("mongoose"));
const mail_1 = __importDefault(require("../utils/mail/templates/mail"));
const Schema = mongoose_1.default.Schema;
const OrderItemSchema = new Schema({
    name: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1, max: 5 },
});
const OrderSchema = new Schema({
    grandTotal: { type: Number, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    fullName: { type: Schema.Types.String, required: true },
}, { timestamps: true });
OrderSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = doc;
        //send mail
        console.log("Email Terkirim");
        const content = yield mail_1.default.render('register-success.ejs', {
            username: user.email,
            grandTotal: user.grandTotal,
            customerName: user.fullName,
            orderItems: user.orderItems,
        }); // Memastikan bahwa content bertipe string
        yield mail_1.default.send({
            to: user.email,
            subject: "Berhasil Melakukan Order",
            content,
        });
        next();
    });
});
const OrderModel = mongoose_1.default.model("Order", OrderSchema);
exports.default = OrderModel;
