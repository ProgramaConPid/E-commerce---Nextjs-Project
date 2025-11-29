import axios from "axios";

export const getNewProducts = async() => {
  try {
    const res = await axios.get("/api/products/new-arrival");

    if (res.status !== 200) {
      throw new Error("Error fetching new arrival products")
    }

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

    return res.data;
  } catch(e) {
    console.error(e)
  }
}

export const getDiscountProducts = async() => {
  try {
    const res = await axios.get("/api/products/discount");

    if (res.status !== 200) {
      throw new Error("Error fetching new discount products")
    }

    return res.data;
  } catch(e) {
    console.error(e)
  }
}

export const createProduct = async (formData: FormData) => {
  try {
    const res = await axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 201) {
      throw new Error("Error creating product");
    }

    return res.data;
  } catch (e) {
    console.error("❌ Error in createProduct:", e);
    throw e;
  }
};
