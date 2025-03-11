import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../cart/CartSlice";
import "./Products.css";
import { fetchAsync } from "./productsSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);
  return (
    <div>
      <div>
        {products &&
          products.map((product, index) => (
            <div className="card" key={index}>
              <div className="discount-badge">-20%</div>
              <div className="image-container">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="card-content">
                <h1 className="product-title">{product.title}</h1>
                <div className="rating">
                  <span>★★★★☆</span>
                  <span className="review-count">(24)</span>
                </div>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <button
                  className="add-to-cart"
                  onClick={() => {
                    dispatch(addAsync(product));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
