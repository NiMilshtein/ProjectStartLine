import React, { useEffect, useState } from "react";
import amazingviews from "./IMAGES/amazingviews.jpeg";
import beachfront from "./IMAGES/beachfront.jpeg";
import cabin from "./IMAGES/cabin.jpeg";
import countryside from "./IMAGES/countryside.jpeg";
import lakehouse from "./IMAGES/lakehouse.jpeg";
import mansions from "./IMAGES/mansions.jpeg";
import omg from "./IMAGES/omg.jpeg";
import room from "./IMAGES/room.jpeg";
import topoftheworld from "./IMAGES/topoftheworld.jpeg";
import trending from "./IMAGES/trending.jpeg";
import tropical from "./IMAGES/tropical.jpeg";
import tiny from "./IMAGES/tiny.jpeg";
import play from "./IMAGES/play.jpeg";
import domes from "./IMAGES/domes.jpeg";
import farms from "./IMAGES/farms.jpeg";
import desgin from "./IMAGES/desgin.jpeg";
import caves from "./IMAGES/caves.jpeg";
import castle from "./IMAGES/castle.jpeg";
import desert from "./IMAGES/desert.jpeg";
import arctic from "./IMAGES/arctic.jpeg";
import boats from "./IMAGES/boats.jpeg";
import camping from "./IMAGES/camping.jpeg";
import barns from "./IMAGES/barns.jpeg";
import yurts from "./IMAGES/yurts.jpeg";
import { fetchPixabayData } from "./airbnbApi";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

const IconCarousel = ({ onIconClicked }) => {
  const icons = [
    { id: 1, title: "beachfront", icon: beachfront },
    { id: 2, title: "amazingviews", icon: amazingviews },
    { id: 3, title: "cabin", icon: cabin },
    { id: 4, title: "lakehouse", icon: lakehouse },
    { id: 5, title: "mansions", icon: mansions },
    { id: 6, title: "Countryside", icon: countryside },
    { id: 7, title: "omg", icon: omg },
    { id: 8, title: "room", icon: room },
    { id: 9, title: "mountain", icon: topoftheworld },
    { id: 10, title: "trending", icon: trending },
    { id: 11, title: "tropical", icon: tropical },
    { id: 12, title: "tiny", icon: tiny },
    { id: 13, title: "play", icon: play },
    { id: 14, title: "domes", icon: domes },
    { id: 15, title: "farms", icon: farms },
    { id: 16, title: "desgin", icon: desgin },
    { id: 17, title: "caves", icon: caves },
    { id: 18, title: "castle", icon: castle },
    { id: 19, title: "desert", icon: desert },
    { id: 20, title: "arctic", icon: arctic },
    { id: 21, title: "boats", icon: boats },
    { id: 22, title: "camping", icon: camping },
    { id: 23, title: "barns", icon: barns },
    { id: 24, title: "yurts", icon: yurts },
  ];

  const getNumVisibleIcons = () => {
    if (window.innerWidth <= 479) {
      return 3;
    } else if (window.innerWidth <= 767) {
      return 6;
    } else {
      return 12;
    }
  };

  const numVisibleIcons = getNumVisibleIcons();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const handleIconClick = async (id) => {
    const selectedIcon = icons.find((icon) => icon.id === id);
    onIconClicked && onIconClicked(selectedIcon);
    setSelectedIconId(id);
  };
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - numVisibleIcons + icons.length) % icons.length
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + numVisibleIcons) % icons.length
    );
  };

  const carouselTransform = {
    transform: `translateX(-${(currentIndex / icons.length) * 100}%)`,
  };

  const isLastPage = currentIndex + numVisibleIcons >= icons.length;

  return (
    <div className="icon-carousel">
      <button
        className="navigation-btn"
        onClick={handlePrevious}
        style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
      >
        ‹
      </button>
      <div className="carousel-wrapper">
        {loading ? (
          <div className="icons-wrapper">
            {Array.from({ length: 24 }).map((_, index) => (
              <div key={index} className="icon-container skeleton">
                <div className="icon"></div>
                <div className="title"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="icons-wrapper" style={carouselTransform}>
            {icons.map((icon, index) => (
              <div
                key={icon.id}
                className={`icon-container${
                  icon.id === selectedIconId ? " selected" : ""
                }`}
                onClick={() => handleIconClick(icon.id)}
              >
                <div className="icon">
                  <img style={{ height: "1.5rem" }} alt="" src={icon.icon} />
                </div>
                <div className="title">{icon.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="navigation-btn"
        onClick={handleNext}
        style={{ visibility: isLastPage ? "hidden" : "visible" }}
      >
        ›
      </button>
    </div>
  );
};

export default IconCarousel;
