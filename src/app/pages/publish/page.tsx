"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./publish.module.css";
import { createProduct } from "@/services/products";
import { toast } from "sonner";
import { raleway, nunitoSans } from "@/app/fonts/mainFonts";
import Image from "next/image";

type ProductForm = {
  name: string;
  category: string;
  price: string;
  tags: string[];
  colors: string[];
  description: string;
  screen: string;
  processor: string;
  battery: string;
  stock: string;
  delivery: string;
  warranty: string;
  images: File[];
  specs: { [key: string]: string };
};

const categories = [
  "New Arrival",
  "Best Seller",
  "Limited Edition",
  "Sale",
  "Premium",
  "Eco-Friendly",
];

const AVAILABLE_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Red", hex: "#EF4444" },
  { name: "Green", hex: "#10B981" },
  { name: "Purple", hex: "#8B5CF6" },
];

const SPECS_BY_CATEGORY = {
  Phones: [
    { name: "screen", placeholder: "e.g., 6.7 OLED" },
    { name: "cpu", placeholder: "e.g., A17 Pro" },
    { name: "mainCamera", placeholder: "e.g., 48MP + 12MP" },
    { name: "frontCamera", placeholder: "e.g., 12MP" },
    { name: "battery", placeholder: "e.g., 4.300 mAh" },
  ],
  Computers: [
    { name: "resolution", placeholder: "e.g., 3840x2160" },
    { name: "panel", placeholder: "e.g., IPS" },
    { name: "refreshRate", placeholder: "e.g., 60Hz" },
    { name: "ports", placeholder: "e.g., HDMI, USB-C, Etc..." },
  ],
  Cameras: [
    { name: "sensor", placeholder: "e.g., Super 35 HDR" },
    { name: "resolution", placeholder: "e.g., 6K" },
    { name: "mount", placeholder: "e.g., EF Lens Mount" },
    { name: "screen", placeholder: "e.g.,  '5' Touchscreen" },
  ],
  "Smart Watches": [
    { name: "screen", placeholder: "e.g., Super AMOLED" },
    { name: "chip", placeholder: "e.g., Exynos W930" },
    { name: "battery", placeholder: "e.g., 284mAh" },
    { name: "features", placeholder: "e.g., GPS, Heart Rate Monitor" },
  ],
  Headphones: [
    { name: "type", placeholder: "e.g., Over-Ear" },
    { name: "noiseCancellation", placeholder: "e.g., Yes/No" },
    { name: "battery", placeholder: "e.g., Up to 30 hours" },
    { name: "connectivity", placeholder: "e.g., Bluetooth 5.0" },
  ],
  Gaming: [
    { name: "storage", placeholder: "e.g., 1TB SSD" },
    { name: "resolution", placeholder: "e.g., 4K" },
    { name: "controller", placeholder: "e.g., Wireless Controller" },
    { name: "fps", placeholder: "e.g., Up to 120 FPS" },
  ],
};

const PublisProduct = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    tags: [],
    colors: [],
    description: "",
    screen: "",
    processor: "",
    battery: "",
    stock: "",
    delivery: "",
    warranty: "",
    images: [],
    specs: {},
  });
  const activeSpecs =
    SPECS_BY_CATEGORY[formData.category as keyof typeof SPECS_BY_CATEGORY] ||
    [];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const isSpec = activeSpecs.some((spec) => spec.name === name);

    if (isSpec) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [name]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTags = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, id]
        : prev.tags.filter((tag) => tag !== id),
    }));
  };

  const handleColors = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      colors: checked
        ? [...prev.colors, value]
        : prev.colors.filter((color) => color !== value),
    }));
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Product name is required");

    if (!formData.category.trim()) return toast.error("Category is required");

    if (!formData.price || Number(formData.price) <= 0)
      return toast.error("Price must be a valid number");

    if (formData.tags.length === 0)
      return toast.error("Select at least one tag");

    if (formData.colors.length === 0)
      return toast.error("Select at least one color");

    if (!formData.description.trim())
      return toast.error("Description is required");

    const requiredSpecs =
      SPECS_BY_CATEGORY[formData.category as keyof typeof SPECS_BY_CATEGORY] ||
      [];

    for (const spec of requiredSpecs) {
      const value = formData.specs[spec.name];

      if (!value || !value.trim()) {
        return toast.error(
          `${spec.name.replace(/([A-Z])/g, " $1").toUpperCase()} is required`
        );
      }
    }

    if (!formData.stock.trim() || Number(formData.stock) < 0)
      return toast.error("Stock must be a valid number");

    if (!formData.delivery.trim())
      return toast.error("Delivery time is required");

    if (!formData.warranty.trim()) return toast.error("Warranty is required");

    if (formData.images.length === 0)
      return toast.error("Please upload at least ONE product image");

    const fd = new FormData();

    fd.append("name", formData.name);
    fd.append("category", formData.category);
    fd.append("price", formData.price);
    fd.append("description", formData.description);
    fd.append("stock", formData.stock);
    fd.append("delivery", formData.delivery);
    fd.append("warranty", formData.warranty);

    Object.entries(formData.specs).forEach(([key, value]) => {
      fd.append(key, value);
    });

    formData.tags.forEach((tag) => fd.append("tags", tag));
    formData.colors.forEach((color) => fd.append("colors", color));
    formData.images.forEach((file) => fd.append("images", file));

    const res = await createProduct(fd);

    toast.success("Product created successfully! 🎉");
    console.log(res);

    setFormData({
      name: "",
      category: "",
      price: "",
      tags: [],
      colors: [],
      description: "",
      screen: "",
      processor: "",
      battery: "",
      stock: "",
      delivery: "",
      warranty: "",
      images: [],
      specs: {},
    });

    setImagePreviews([]);

    const fileInput = document.getElementById(
      "productImages"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className={`container ${styles.publish__section}`}>
      <h2 className={`${styles.publish__sectionTitle} ${raleway.className}`}>
        Add New Product
      </h2>

      <p
        className={`${styles.publish__sectionDescription} ${nunitoSans.className}`}
      >
        Create a new product listing for your store
      </p>

      <form className={styles.publish__form} onSubmit={handleSubmit}>
        <div className={styles.form__basicInformation}>
          <h3
            className={`${styles.basic__informationTitle} ${raleway.className}`}
          >
            Basic Information
          </h3>

          <div className={styles.form__groupName}>
            <label
              className={`${styles.label} ${raleway.className}`}
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className={styles.input__name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Iphone 15 Pro Max"
            />
          </div>

          <div className={styles.form__groups}>
            <div className={styles.form__groupCategory}>
              <label
                className={`${styles.label} ${raleway.className}`}
                htmlFor="category"
              >
                Category
              </label>
              <select
                className={styles.select__category}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Phones">Smartphones</option>
                <option value="Computers">Computers</option>
                <option value="Headphones">Headphones</option>
                <option value="Cameras">Cameras</option>
                <option value="Smart Watches">Smart Watches</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>

            <div className={styles.form__groupPrice}>
              <label
                className={`${styles.label} ${raleway.className}`}
                htmlFor="price"
              >
                Price
              </label>
              <input
                className={styles.input__price}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="999.99"
              />
            </div>
          </div>
        </div>

        <div className={styles.form__productDetails}>
          <h3
            className={`${styles.product__detailsTitle} ${raleway.className}`}
          >
            Product Details
          </h3>

          <div className={styles.product__detailsTags}>
            <h4 className={`${styles.details__tagsTitle} ${raleway.className}`}>
              Tags
            </h4>

            <div className={styles.details__tagsContainer}>
              {categories.map((c, i) => (
                <div className={styles.tag__parent} key={i}>
                  <input
                    type="checkbox"
                    id={c}
                    checked={formData.tags.includes(c)}
                    onChange={handleTags}
                    className={styles.tag__checkbox}
                  />
                  <label
                    htmlFor={c}
                    className={`${styles.tag} ${nunitoSans.className}`}
                  >
                    {c}
                  </label>
                </div>
              ))}
            </div>

            <div className={styles.product__detailsColors}>
              <h4
                className={`${styles.details__colorsTitle} ${raleway.className}`}
              >
                Available Colors
              </h4>

              <div className={styles.colors__container}>
                {AVAILABLE_COLORS.map((c, i) => (
                  <label
                    key={i}
                    className={`
                  ${styles.colorOption} ${nunitoSans.className}`}
                  >
                    <input
                      type="checkbox"
                      value={c.name}
                      checked={formData.colors.includes(c.name)}
                      onChange={handleColors}
                      className={styles.colorInput}
                    />
                    <span
                      className={styles.colorCircle}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span
                      className={`${styles.colorName} ${nunitoSans.className}`}
                    >
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.details__description}>
              <h4
                className={`${styles.details__descriptionTitle} ${raleway.className}`}
              >
                Product Description
              </h4>

              <textarea
                className={styles.details__textarea}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the product"
              ></textarea>
            </div>
          </div>
        </div>

        <div className={styles.form__technicalSpecifications}>
          <h3
            className={`${styles.technical__specificationsTitle} ${raleway.className}`}
          >
            Technical Specifications
          </h3>

          <div className={styles.form__groupsSpecifications}>
            {activeSpecs.length === 0 && (
              <p className={nunitoSans.className}>
                Select a category to add specifications
              </p>
            )}

            {activeSpecs.map((spec, i) => (
              <div className={styles.form__group} key={i}>
                <label
                  className={`${styles.label} ${raleway.className}`}
                  htmlFor={spec.name}
                >
                  {spec.name.charAt(0).toUpperCase() + spec.name.slice(1)}
                </label>
                <input
                  type="text"
                  name={spec.name}
                  value={formData.specs[spec.name] || ""}
                  onChange={handleChange}
                  placeholder={spec.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.form__productImages}>
          <h3 className={`${styles.product__imagesTitle} ${raleway.className}`}>
            Product Images
          </h3>

          <div className={styles.upload__container}>
            <div className={styles.inputWrapper}>
              <input
                type="file"
                id="productImages"
                className={styles.upload__input}
                accept="image/png, image/jpeg, image/webp"
                multiple
                onChange={handleImages}
              />

              <label htmlFor="productImages" className={styles.upload__label}>
                <div className={styles.upload__icon}>⬆</div>
                <h3 className={raleway.className}>Upload Product Images</h3>
                <p className={nunitoSans.className}>
                  Click to browse or drag and drop your images here
                </p>
                <span
                  className={`${styles.upload__info} ${nunitoSans.className}`}
                >
                  PNG, JPG, WEBP up to 10MB each
                </span>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className={styles.preview__container}>
                {imagePreviews.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Product Image"
                    className={styles.preview__image}
                    height={100}
                    width={100}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.form__inventoryAndShipping}>
          <h3
            className={`${styles.inventory__shippingTitle} ${raleway.className}`}
          >
            Inventory & Shipping
          </h3>

          <div className={styles.form__groupsInventoryAndShipping}>
            <div className={styles.form__group}>
              <label
                className={`${styles.label} ${raleway.className}`}
                htmlFor="stock"
              >
                Stock Quantity
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g., 50"
              />
            </div>

            <div className={styles.form__group}>
              <label
                className={`${styles.label} ${raleway.className}`}
                htmlFor="delivery"
              >
                Delivery Time
              </label>
              <input
                type="text"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                placeholder="e.g., 2-3 business days"
              />
            </div>

            <div className={styles.form__group}>
              <label
                className={`${styles.label} ${raleway.className}`}
                htmlFor="warranty"
              >
                Warranty
              </label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="e.g., 1 year manufacturer"
              />
            </div>
          </div>
        </div>

        <button
          className={`${styles.form__submitBtn} ${raleway.className}`}
          type="submit"
        >
          Publish Product
        </button>
      </form>
    </div>
  );
};

export default PublisProduct;
