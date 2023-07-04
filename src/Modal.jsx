import React from "react";

function Modal({ place, open, setClickedImageId }) {
  const closeModal = () => {
    setClickedImageId(null);
  };

  const handleClickOutside = (event) => {
    if (event.target.id === "myModal") {
      closeModal();
    }
  };

  return (
    <>
      <div
        id="myModal"
        className={`modal ${open ? "modal-open" : "modal-close"}`}
        onClick={handleClickOutside}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>ID number : {place.id}</h2>
          </div>
          <div className="modal-body">
            <p>Collections Number: {place.collections}</p>
            <h3>
              <a href={place.pageURL}>Picture Link</a>
            </h3>
          </div>
          <div className="modal-footer">
            <p style={{color:'#fff',fontWeight:'bold'}}>Created by User: User{place.user_id}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;