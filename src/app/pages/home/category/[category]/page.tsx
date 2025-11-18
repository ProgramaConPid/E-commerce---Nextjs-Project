import { raleway } from "@/app/fonts/mainFonts";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import type { ProductCardProps } from "@/interfaces/main";
import { SlArrowRight } from "react-icons/sl";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching products");
  }

  const products = await res.json();

  return (
    <div className="container">
      <div className="catalog__header flex items-center gap-6 mt-8 mb-10">

        <span className={`${raleway.className} text-[1.2rem] text-(--grey-color)`}>
          Home
        </span>

        <SlArrowRight className="text-(--grey-color)" />

        <span className={`${raleway.className} text-[1.2rem] text-(--grey-color)`}>
          Catalog
        </span>

        <SlArrowRight className="text-(--grey-color)" />

        <span className={`${raleway.className} text-[1.2rem]`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>

      </div>

      <div className="main__content flex gap-10">
        <div className="aside__filters w-[25%]">{/* Filtros */}</div>

        <div className="container__products grid grid-cols-3 gap-6">
          {products.map((product: ProductCardProps, i: number) => (
            <ProductCard
              key={product._id || i}
              _id={product._id}
              name={product.name}
              images={product.images?.[0] || "/images/default.png"}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}