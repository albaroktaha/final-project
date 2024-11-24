"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CategoriesSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    images: {
        type: [Schema.Types.String],
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    qty: {
        type: Schema.Types.Number,
        required: true,
        min: [1, "Minimal qty adalah 1"],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
}, {
    timestamps: true,
});
const CategoriesModel = mongoose_1.default.model("Categories", CategoriesSchema);
exports.default = CategoriesModel;
