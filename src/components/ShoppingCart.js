import React from "react";
import "./ShoppingCart.css";
import { BsTrash } from "react-icons/bs";
import product from "./data/data";

const ShoppingCart = ({ isCartOpen, cartItem, setCartItem }) => {
  if (cartItem[0].amount === 0) {
    return (
      <div
        className={`${
          isCartOpen ? "shopping-cart show-cart" : "shopping-cart"
        }`}
      >
        <header className="shopping-cart__title">
          <h3>Cart</h3>
        </header>
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }
  const { image, name, price, amount, discount, id } = cartItem[0];
  const onSalePrice = price * (discount / 100);
  const resetCart = () => {
    setCartItem([product]);
  };
  return (
    <div
      className={`${isCartOpen ? "shopping-cart show-cart" : "shopping-cart"}`}
    >
      <header className="shopping-cart__title">
        <h3>Cart</h3>
      </header>
      <div className="shopping-cart__body" key={id}>
        <div className="cart-item">
          <img src={image} className="cart-item__img" alt={name} />
          <div className="cart-item__info">
            <h4 className="cart-item__title">{name}</h4>
            <p className="cart-item__price">
              ${onSalePrice.toFixed(2)} x{" "}
              <span className="cart-item__count">{amount}</span>
              <strong>
                $
                <span className="cart-item__fullprice">
                  {(onSalePrice * amount).toFixed(2)}
                </span>
              </strong>
            </p>
          </div>
          <button className="cart-delete-btn" onClick={resetCart}>
            <BsTrash />
          </button>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
