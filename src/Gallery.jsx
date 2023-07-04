import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import IconButton from "@mui/material/IconButton";
import white from "./IMAGES/white.png"
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFetchData } from "./airbnbApi";
import Skeleton from "./Skeleton";
import Modal from "./Modal";

function Gallery({  searchResults, q = "Flowers" }) {

  const [filledHeart, setFilledHeart] = useState({});
  const [clickedImageId, setClickedImageId] = useState(null);
  const handleClick = (placeId) => {
    console.log(placeId)
    setFilledHeart((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  };



  const { places, loading } = useFetchData(searchResults, q);


  console.log(places);
  return (
    <>
      {loading
        ? Array.from({ length: 40 }).map((_, i) => <Skeleton key={i} />)
        : Array.isArray(places) && places.length > 0
        ? places.map((place, i) => {
            return (
              <React.Fragment key={i}>
                <div className="box">
                  <div className="heart-icon">
                    <IconButton onClick={() => handleClick(place.id)}>
                      <FavoriteIcon
                        className="heart-icon-style"
                        style={{
                          fill: filledHeart[place.id] ? "red" : "transparent",
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className="img-container">
                    <img
                      onClick={() => setClickedImageId(place.id)}

                      src={place.webformatURL}
                      alt={place.tags.split(",")[0]}
                    />
                    <div className="text">
                      <h3>{place.tags}</h3>
                    </div>
                  </div>
                  <div className="content">
                    <div className="headers">
                      <h3>
                        <RoomIcon className="orange" />
                        {place.tags.split(",")[0]}
                      </h3>
                      <div className="rating-container">
                        <StarIcon style={{ fontSize: "1.7rem" }} />
                        {place.likes}
                      </div>
                    </div>
                    <div className="views-container">
                      <p>
                        <VisibilityIcon /> {place.views}
                      </p>
                    </div>
                    <Modal place={place} open={place.id === clickedImageId} setClickedImageId={setClickedImageId} />

                  </div>
                </div>
              </React.Fragment>
            );
          })
        : (
          <img alt="" style={{height:'500px', margin:'auto'}} src={white} />
        )}
    </>
  );
}

export default Gallery;

