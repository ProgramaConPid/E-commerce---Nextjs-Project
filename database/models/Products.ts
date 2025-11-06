import {Schema, model, models} from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    storageOptions: {
      type: [String],
      default: [],
    },
    specs: {
      type: Object,
      default: {},
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    delivery: {
      type: String,
      default: "3-5 days",
    },
    warranty: {
      type: String,
      default: "1 year",
    },
  },
  {
    timestamps: true, 
  },
);

const Product =
  models.Product || model("Product", ProductSchema);

export default Product;
