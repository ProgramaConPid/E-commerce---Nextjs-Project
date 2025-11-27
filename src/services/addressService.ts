import axios from "axios";

export interface AddressPayload {
  _id?: string;
  userId?: string;
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  phone?: string;
  place?: string;
}

export const getAddresses = async (userId: string) => {
  const res = await axios.get(`/api/address?userId=${userId}`);
  return res.data;
};

export const addAddress = async (data: AddressPayload) => {
  const response = await axios.post("/api/address", data);
  return response.data;
};
