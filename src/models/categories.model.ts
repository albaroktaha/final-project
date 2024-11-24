import mongoose,{ Types } from "mongoose";

export interface Categories {
  name: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  categoryId: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  _id?: Types.ObjectId;
}

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema<Categories>(
  {
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
  },
  {
    timestamps: true,
  }
);

const CategoriesModel = mongoose.model("Categories", CategoriesSchema);

export default CategoriesModel;
