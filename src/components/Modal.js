import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import product from "./data/data";
import "./Modal.css";
const Modal = ({ isModalOpen, setIsModalOpen }) => {
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
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overlay-open");
    document.body.classList.remove("no-scroll");
  };
  useEffect(() => {
    window.addEventListener("resize", closeModal);
    return () => window.removeEventListener("resize", closeModal);
  }, []);
  return (
    <div className={`${isModalOpen ? "modal show-modal" : "modal"}`}>
      <button className="modal-close-btn" onClick={closeModal}>
        <FaTimes />
      </button>
      <div className="main-img">
        <button className="prev" onClick={handlePrev}>
          <FiChevronLeft />
        </button>
        <img src={images[imgIndex]} alt="" />
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
