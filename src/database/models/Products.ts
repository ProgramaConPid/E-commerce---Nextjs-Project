import {Schema, model, models} from "mongoose";

export interface IProduct {
  _id?: string; 
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  tags: string[];
  colors: string[];
  storageOptions: string[];

  specs: {
    [key: string]: string | number | boolean | undefined;
  };

  description?: string;
  images: string[];
  stock: number;
  delivery?: string;
  warranty?: string;

  createdAt?: string;
  updatedAt?: string;
}


const ProductSchema = new Schema<IProduct>(
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
