import { IoMdArrowDropdown } from "react-icons/io";
import SearchBrand from "./SearchBrand";

interface FiltersAsideProps {
  category: string;
  onFilter: () => void;
}

const FiltersAside = ({category, onFilter} : FiltersAsideProps) => {
  return (
    <div className="aside">
      {category === "phones" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="apple" value="Apple" />
                Apple
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="samsung" value="Samsung" />
                Samsung
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="xiaomi" value="Xiaomi" />
                Xiaomi
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="oneplus" value="OnePlus" />
                OnePlus
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="google" value="Google" />
                Google
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="huawei" value="Huawei" />
                Huawei
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="motorola" value="Motorola" />
                Motorola
              </label>
            </li>
          </ul>
        </div>  
      )}

      {category === "computers" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="dell" value="Dell" />
                Dell
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="hp" value="HP" />
                HP
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="lenovo" value="Lenovo" />
                Lenovo
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="apple" value="Apple" />
                Apple
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="asus" value="Asus" />
                Asus
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="acer" value="Acer" />
                Acer
              </label>
            </li>
          </ul>
        </div>
      )}

      {category === "headphones" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="sony" value="Sony" />
                Sony
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="bose" value="Bose" />
                Bose
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="sennheiser" value="Sennheiser" />
                Sennheiser
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="apple" value="Apple" />
                Apple
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="jbl" value="JBL" />
                JBL
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="beats" value="Beats" />
                Beats
              </label>
            </li>
          </ul>
        </div>
      )}

      {category === "cameras" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="canon" value="Canon" />
                Canon
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="nikon" value="Nikon" />
                Nikon
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="sony" value="Sony" />
                Sony
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="fujifilm" value="Fujifilm" />
                Fujifilm
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="panasonic" value="Panasonic" />
                Panasonic
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="olympus" value="Olympus" />
                Olympus
              </label>
            </li>
          </ul>
        </div>
      )}

      {category === "smart-watches" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="apple" value="Apple" />
                Apple
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="samsung" value="Samsung" />
                Samsung
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="fitbit" value="Fitbit" />
                Fitbit
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="garmin" value="Garmin" />
                Garmin
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="fossil" value="Fossil" />
                Fossil
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="huawei" value="Huawei" />
                Huawei
              </label>
            </li>
          </ul>
        </div>
      )}

      {category === "gaming" && (
        <div className="filter__section mb-6">
          <div className="filter__header flex items-center justify-between mb-4 cursor-pointer pb-2 border-b border-(--grey-color)">
            <h4 className="filter__title font-semibold">Brand</h4>
            <IoMdArrowDropdown className="text-[1.2rem] text-(--black)" />
          </div>
          <SearchBrand placeholder="Search..." />
          <ul className="filter__options flex flex-col gap-2">
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="sony" value="Sony" />
                Sony
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="microsoft" value="Microsoft" />
                Microsoft
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="nintendo" value="Nintendo" />
                Nintendo
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="razer" value="Razer" />
                Razer
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="logitech" value="Logitech" />
                Logitech
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="asus" value="Asus" />
                Asus
              </label>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default FiltersAside;