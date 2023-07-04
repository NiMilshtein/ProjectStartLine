import React, { useState } from "react";
import airbnb from "./IMAGES/airbnb.png";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fetchPixabayData } from "./airbnbApi";
import IconCarousel from "./IconCarousel";
import Gallery from "./Gallery";

function Home() {
  const [searchResults, setSearchResults] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    console.log("Search triggered");

    const capitalizedSearchValue =
      searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

    const formattedSearchValue = capitalizedSearchValue.replace(/\s+/g, "+");

    const searchParameters = {
      q: formattedSearchValue,
    };
    console.log("Search parameters:", searchParameters);
    setSearch(true);

    const searchResults = await fetchPixabayData(searchParameters.q);
    setSearchResults(searchResults);
    setSearchValue("");
    setSearch(false);
    console.log("Search results:", searchResults);
  };

  const handleIconClicked = async (icon) => {
    setSearch(true);
    const searchResults = await fetchPixabayData(icon.title);
    setSearchResults(searchResults);
    setSearch(false);
  };
  const handleShowMore = async () => {
    setPage((prevPage) => prevPage + 1);
    setSearch(true);
    const newResults = await fetchPixabayData(searchResults.q, page + 1);
    setSearchResults((prevResults) => ({
      ...prevResults,
      hits: [...prevResults.hits, ...newResults.hits],
    }));
    setSearch(false);
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <img alt="" src={airbnb} />
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="find your place"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SearchIcon className="gogle" onClick={handleSearch} />
        </div>
        <div className="host">
          <p>Become a Modal</p>
          <LanguageIcon className="globeIcon" />
          <div className="user">
            <MenuIcon />
            <AccountCircleIcon />
            <div className="notification-indicator">1</div>
          </div>
        </div>
      </header>
      <IconCarousel onIconClicked={handleIconClicked} />
      <section className="packages" id="packages">
        <div className="box-container">
          <Gallery searchResults={searchResults} />
        </div>
        {searchResults && searchResults.hits.length > 0 && !search && (
          <button onClick={handleShowMore} className="btn">
            Show More
          </button>
        )}
      </section>
    </>
  );
}

export default Home;
