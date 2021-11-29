import React, { useState, useLayoutEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import ShoppingCart from "./ShoppingCart";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
const Navbar = ({ cartItem, setCartItem }) => {
  const [isNavBarOpen, setIsNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openNavBar = () => {
    document.body.classList.add("overlay-open");
    document.body.classList.add("no-scroll");
    setIsNavbarOpen(true);
  };
  const closeNavBar = () => {
    document.body.classList.remove("overlay-open");
    document.body.classList.remove("no-scroll");
    setIsNavbarOpen(false);
  };

  useLayoutEffect(() => {
    const stopAnimations = () => {
      let resizeTimer;
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    };
    const checkSize = () => {
      const isMobile = 576;
      let screenSize = window.innerWidth;
      if (!document.body.classList.contains("overlay-open")) {
        closeNavBar();
      }
      if (screenSize >= isMobile) {
        return closeNavBar();
      }
    };
    window.addEventListener("resize", checkSize);
    window.addEventListener("resize", stopAnimations);

    return () => {
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("resize", stopAnimations);
    };
  }, []);
  return (
    <header className="main-header">
      <button className="hamburger-btn" onClick={openNavBar}>
        <GiHamburgerMenu />
      </button>
      <a href="/" className="logo-container">
        <img src={logo} alt="sneakers logo" className="logo" />
      </a>
      <nav className="main-nav">
        <ul
          className={`${isNavBarOpen ? "nav-links show-navbar" : "nav-links"}`}
        >
          <button className="nav-close-btn" onClick={closeNavBar}>
            <FaTimes />
          </button>
          <li className="nav-list-item">
            <a href="/">Collections</a>
          </li>
          <li className="nav-list-item">
            <a href="/">Men</a>
          </li>
          <li className="nav-list-item">
            <a href="/">Women</a>
          </li>
          <li className="nav-list-item">
            <a href="/">About</a>
          </li>
          <li className="nav-list-item">
            <a href="/">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="cart-profile-container">
        <button
          className="cart"
          onClick={() => {
            setIsCartOpen(!isCartOpen);
          }}
        >
          <AiOutlineShoppingCart />
          <span
            className={`${
              cartItem[0].amount > 0
                ? "cart-count show-cart-count "
                : "cart-count"
            }`}
          >
            {cartItem[0].amount}
          </span>
        </button>
        <button className="avatar">
          <img src={avatar} alt="profile pic" className="avatar-img" />
        </button>
        <ShoppingCart
          isCartOpen={isCartOpen}
          setCartItem={setCartItem}
          cartItem={cartItem}
        />
      </div>
    </header>
  );
};

export default Navbar;
