import axios from "axios";

export const getNewProducts = async() => {
  try {
    const res = await axios.get("/api/products/new-arrival");

    if (res.status !== 200) {
      throw new Error("Error fetching new arrival products")
    }

    console.log(res.data);
    return res.data;
  } catch(e) {
    console.error(e)
  }
}

export const getSellerProducts = async() => {
  try {
    const res = await axios.get("/api/products/best-seller");

    if (res.status !== 200) {
      throw new Error("Error fetching new arrival products")
    }

    console.log(res.data);
    return res.data;
  } catch(e) {
    console.error(e)
  }
}

export const getFeaturedProducts = async() => {
  try {
    const res = await axios.get("/api/products/featured");

    if (res.status !== 200) {
      throw new Error("Error fetching new arrival products")
    }

    console.log(res.data);
    return res.data;
  } catch(e) {
    console.error(e)
  }
}