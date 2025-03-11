import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { deleteAsync, updateAsync } from "./CartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const handleChange = (e, id) =>
    dispatch(updateAsync({ id, change: { quantity: Number(e.target.value) } }));
  return (
    <div>
      <div>
        {items.map((item, index) => {
          return (
            <div className="cart-card" key={index}>
              <div className="cart-item">
                <div className="product-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-brand">{item.brand}</p>
                  <p className="product-price">${item.price}</p>

                  <div className="quantity-selector">
                    {/* <label htmlFor={`quantity-${item.id}`}>Quantity</label> */}
                    Quantity
                    <select
                      // id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => handleChange(e, item.id)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(deleteAsync(item.id))}
                    aria-label="Remove item"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
