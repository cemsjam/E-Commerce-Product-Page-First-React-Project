import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import "./Product.css";
import Modal from "./Modal";
import product from "./data/data";

const Product = ({ setCartItem, cartItem }) => {
  const [count, setCount] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { name, price, discount, images, id } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (count <= 0) {
      setCartItem(null);
    } else {
      const newCartItem = {
        ...product,
        amount: count,
        image: images[imgIndex],
      };
      setCartItem([newCartItem]);
    }
    setCount(0);
  };
  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("overlay-open");
    document.body.classList.add("no-scroll");
  };
  const handlePrev = () => {
    if (imgIndex <= 0) {
      setImgIndex(product.images.length - 1);
    } else {
      setImgIndex((imgIndex) => (imgIndex -= 1));
    }
    return imgIndex;
  };
  const handleNext = () => {
    if (imgIndex >= product.images.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((imgIndex) => (imgIndex += 1));
    }
    return imgIndex;
  };
  return (
    <main className="main-content">
      <div className="product-item">
        <div className="product-item__container">
          <button className="prev" onClick={handlePrev}>
            <FiChevronLeft />
          </button>
          <button type="button" className="main-img-btn" onClick={openModal}>
            <img
              src={images[imgIndex]}
              alt={cartItem[0].name}
              className="main-img"
            />
          </button>
          <button className="next" onClick={handleNext}>
            <FiChevronRight />
          </button>
          <div className="product-item__mini-images">
            {product.thumbnails.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImgIndex(index)}
                  className={`${imgIndex === index ? "selected" : ""}`}
                >
                  <img src={item} alt={cartItem[0].name} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="product-item__body" key={id}>
          <h2 className="body-subtitle">Sneaker company</h2>
          <h1 className="body-title">{name}</h1>
          <p className="body-description">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="body-pricing">
            <div className="body-discount">
              <strong className="discount-price">
                ${(price * (discount / 100)).toFixed(2)}
              </strong>
              <span className="discount-percent">{discount}%</span>
            </div>
            <div className="body-real-price">${price.toFixed(2)}</div>
          </div>
          <form className="body-cta-section" onSubmit={handleSubmit}>
            <div className="cta-input-container">
              <button
                type="button"
                className="minus"
                onClick={() =>
                  setCount((count) => (count <= 0 ? (count = 0) : (count -= 1)))
                }
              >
                <AiOutlineMinus className="count-icons" />
              </button>
              <input
                type="number"
                className="input-count"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
              <button
                type="button"
                className="plus"
                onClick={() => setCount((count) => (count += 1))}
              >
                <AiOutlinePlus className="count-icons" />
              </button>
            </div>
            <button type="submit" className="body-cta-btn">
              <AiOutlineShoppingCart />
              Add To Cart
            </button>
          </form>
        </div>
      </div>

      <Modal
        product={product}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
      />
    </main>
  );
};

export default Product;
