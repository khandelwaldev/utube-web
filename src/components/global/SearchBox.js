import { useState, useRef, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";

import { useRouter } from "next/router";

const SearchBox = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://pipedapi.kavin.rocks/suggestions?query=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const query = inputRef.current.value;

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
    closeSearch();
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    inputRef.current.value = suggestion;
    setSuggestions([]);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    closeSearch();
  };

  const inputRef = useRef(null);

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current.focus(); // Focus on the input element when the search box is opened
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div ref={searchBoxRef}>
      {/** Search Btn */}
      {!searchOpen && (
        <div className="min-[740px]:w-[500px] w-[350px] h-[40px] flex items-center ">
          <div
            className="w-full h-full px-3 flex items-center border-[2px] border-border rounded-l-2xl cursor-text"
            onClick={openSearch}
          >
            <span className="text-lg text-secondaryText font-medium">
              Search
            </span>
          </div>
          <button
            onClick={openSearch}
            className="h-[40px] w-[40px] flex items-center justify-center bg-secondaryBg rounded-r-2xl hover:bg-secondaryHoverBg"
          >
            <SearchIcon size={23} color={"#fff"} />
          </button>
        </div>
      )}

      {/*** Search Box */}
      {searchOpen && (
        <div className="bg-secondaryBg rounded-2xl">
          <form
            className="w-[500px] h-[40px] flex items-center"
            onSubmit={handleFormSubmit}
          >
            <input
              className="w-full h-full px-3 flex items-center rounded-l-2xl cursor-text text-lg text-secondaryText font-medium bg-transparent border-none outline-none"
              placeholder="Search"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <button className="h-[40px] w-[40px] flex items-center justify-center bg-secondaryHoverBg rounded-r-2xl hover:border hover:h-[39px] border-[#fff]">
              <SearchIcon size={23} color={"#fff"} />
            </button>
          </form>
          {/** Search Suggestions */}
          <div
            className="w-[500px] h-auto py-3 rounded-2xl absolute bg-primaryBg border border-border mt-1"
            style={{ zIndex: 99 }}
          >
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer w-full hover:bg-secondaryHoverBg px-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
