import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import product from "./data/data";
import "./Modal.css";
const Modal = ({ isModalOpen, closeModal }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const { images, thumbnails } = product;

  const handlePrev = () => {
    if (imgIndex <= 0) {
      setImgIndex(images.length - 1);
    } else {
      setImgIndex((imgIndex) => {
        setImgIndex((imgIndex -= 1));
      });
    }
    return imgIndex;
  };
  const handleNext = () => {
    if (imgIndex >= images.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((imgIndex) => {
        setImgIndex((imgIndex += 1));
      });
    }
    return imgIndex;
  };

  return (
    <div className={`${isModalOpen ? "modal show-modal" : "modal"}`}>
      <button className="modal-close-btn" onClick={closeModal}>
        <FaTimes />
      </button>
      <div className="main-img">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt="shoe product"
              key={index}
              className={`${
                imgIndex === index ? "slide-images active" : "slide-images"
              }`}
            />
          );
        })}
        <button className="prev" onClick={handlePrev}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FiChevronRight />
        </button>
      </div>
      <div className="product-item__mini-images">
        {thumbnails.map((item, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => setImgIndex(index)}
              className={`${imgIndex === index ? "selected" : ""}`}
            >
              <img src={item} alt="" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
