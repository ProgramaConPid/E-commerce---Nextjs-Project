import { Search } from "lucide-react";

const SearchBrand = (placeholder:{placeholder: string}) => {
  return (
    <div className="flex w-full mb-4 items-center rounded-lg overflow-hidden bg-(--grey)">
      <div className="p-3">
        <Search className="text-(--grey-color)" />
      </div>
      <input
        type="text"
        className="w-full bg-(--grey) py-3 px-2 focus:outline-none"
        placeholder={placeholder.placeholder}
      />
    </div>
  );
};

export default SearchBrand;
