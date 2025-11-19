import { nunitoSans, raleway } from "@/app/fonts/mainFonts";
import FiltersAside from "@/components/layout/filters/FiltersAside";
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
      <div className="catalog__header flex items-center gap-6 mt-8 mb-14">
        <span
          className={`${raleway.className} text-[1.2rem] text-(--grey-color)`}
        >
          Home
        </span>

        <SlArrowRight className="text-(--grey-color)" />

        <span
          className={`${raleway.className} text-[1.2rem] text-(--grey-color)`}
        >
          Catalog
        </span>

        <SlArrowRight className="text-(--grey-color)" />

        <span className={`${raleway.className} text-[1.2rem]`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>

      <div className="main__content flex gap-10">
        <div className="aside__filters w-[25%]">
          <FiltersAside category={category} onFilter={() => {}} />
        </div>

        <div className="products__section w-[75%] mb-20">
          <div className="container__products--header flex items-center justify-between mb-4">
            <h3 className={`container__products--lenght ${nunitoSans.className} text-[1.2rem] text-(--grey-color)`}>
              Selected Products: <span className="text-(--black)">{products.length}</span>
            </h3>
            <select
              name="rating"
              id="rating"
              className="p-2 border border-(--grey-color) rounded-md"
            >
              <option value="By Rating">
                Sort by Rating
              </option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

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
    </div>
  );
}
