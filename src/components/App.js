import React, { useState } from "react";
import "./App.css";
/* import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; */
import Navbar from "./Navbar";
import Product from "./Product";
import product from "./data/data";
function App() {
  const [cartItem, setCartItem] = useState([product]);
  return (
    <div className="App container">
      <Navbar cartItem={cartItem} setCartItem={setCartItem} />
      <Product setCartItem={setCartItem} cartItem={cartItem} />
    </div>
  );
}

export default App;
