import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  _id?: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  place?: string; 
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  cart: ICartItem[];
  addresses: IAddress[]; 
}

const CartItemSchema = new Schema<ICartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const AddressSchema = new Schema<IAddress>({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  phone: { type: String },
  place: { type: String },
});

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    cart: {
      type: [CartItemSchema],
      default: [],
    },

    // DIRECCIONES
    addresses: {
      type: [AddressSchema],
      default: [],
    },
  },
  {
    collection: "users",
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
