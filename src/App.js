import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Cart } from "./features/cart/Cart";
import { fetchAsync } from "./features/cart/CartSlice";
import { Products } from "./features/products/Products";

function App() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        Cart [{items.length}]
      </button>
      {showCart ? <Cart /> : <Products />}
    </div>
  );
}

export default App;
