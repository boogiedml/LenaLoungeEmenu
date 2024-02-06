import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBox = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setSearchQuery(newInputValue);
  };

  return (
    <div className="max-w-lg mx-auto relative mt-5">
      <input
        type="text"
        className="w-full py-2 md:py-3 px-6 pr-10 text-base outline-none border border-[1px] border-[rgb(255 255 255)] bg-opacity-40 text-black placeholder:text-black"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
      />
      <RiSearch2Line className="absolute text-base md:text-lg right-3 top-3 md:top-4 text-black" />
    </div>
  );
};

export default SearchBox;
