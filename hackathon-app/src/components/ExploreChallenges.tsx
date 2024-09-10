import { useState } from "react";
import ExploreChallengesCard from "./ExploreChallengesCard";
import { items } from "../utils/items";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const checkStatusList = ["easy", "medium", "hard"];
const checkLevelList = ["all", "active", "past", "upcoming"];

const CheckListLayout = ({
  item,
  setSearchItem,
}: {
  item: string;
  setSearchItem: (value: string) => void;
}) => (
  <div className="flex items-center space-x-2 px-4 py-2 hover:bg-white rounded-sm cursor-pointer">
    <IoSearch className="w-4" />
    <input
      id={item}
      type="checkbox"
      value={item}
      onChange={(e) =>
        e.target.value !== "all"
          ? e.target.checked && setSearchItem(e.target.value)
          : e.target.checked && setSearchItem("")
      }
    />
    <label htmlFor={item}>{item}</label>
  </div>
);

const ExploreChallenges: React.FC = () => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchItem(e.target.value);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.type.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.status.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchItem("");
  };

  return (
    <section className="bg-custom-light">
      <div className="bg-custom-dark py-16 space-y-8">
        <h2 className="text-white text-3xl font-bold">Explore challenges</h2>
        <div className="flex items-center justify-center space-x-2">
          <form className="flex max-w-2xl w-full" onSubmit={handleSubmit}>
            <div className="text-xl bg-white border-none outline-none pl-5 py-4 rounded-l-xl">
              <IoSearch className="opacity-70" />
            </div>
            <input
              type="text"
              value={searchItem}
              onChange={handleChange}
              placeholder="Search"
              className="bg-white border-none outline-none px-6 text-lg font-semibold rounded-r-xl w-full placeholder:text-base"
            />
          </form>
          <div className="relative">
            <button
              type="button"
              className="flex items-center bg-gradient-to-r from-blue-300 to-teal-800 text-black-800 rounded-xl ml-3 px-6 py-4 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              onClick={() => setIsOpen(!isOpen)}
            >
              Filter
              <FaChevronDown className="mt-1 ml-1" />
            </button>
            {isOpen && (
              <form className="absolute z-40 bg-white/90 backdrop-blur-sm rounded-sm mt-2 flex flex-col divide-y divide-custom-light border border-transparent hover:border-custom-dark">
                <div className="p-4">
                  <p>Status</p>
                  {checkLevelList.map((item) => (
                    <CheckListLayout
                      key={item}
                      item={item}
                      setSearchItem={setSearchItem}
                    />
                  ))}
                </div>
                <div className="p-4">
                  <p>Level</p>
                  {checkStatusList.map((item) => (
                    <CheckListLayout
                      key={item}
                      item={item}
                      setSearchItem={setSearchItem}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="bg-custom-light text-white mx-4 mb-4"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          filteredItems.length && "masonry-3-col"
        } max-w-6xl mx-auto py-16`}
      >
        {filteredItems.length ? (
          filteredItems.map((item) => (
            <ExploreChallengesCard item={item} key={item.id} />
          ))
        ) : (
          <h2 className="text-white">Please try another search...</h2>
        )}
      </div>
    </section>
  );
};

export default ExploreChallenges;
