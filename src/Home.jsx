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
import Navbar from "./Navbar";

function Home() {
  const [searchResults, setSearchResults] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(1);



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
<Navbar setSearchResults={setSearchResults} />
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
