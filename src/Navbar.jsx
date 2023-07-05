import React, { useState } from 'react'
import airbnb from "./IMAGES/airbnb.png";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { fetchPixabayData } from "./airbnbApi";

function Navbar({setSearchResults}) {
    const [searchValue, setSearchValue] = useState("");
    const [search, setSearch] = useState(false);
  
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
  return (
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
  )
}

export default Navbar