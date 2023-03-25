import { Footer } from "./Footer";
import { Header } from "./Header";
import React, { useState } from "react";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 10, count: 1 },
    { id: 2, name: "Product 2", price: 20, count: 2 },
    { id: 3, name: "Product 3", price: 30, count: 3 },
  ]);

  const handleIncrement = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };
    updatedCart[index].count++;
    setCart(updatedCart);
  };

  const handleDecrement = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.indexOf(product);
    updatedCart[index] = { ...product };
    updatedCart[index].count--;
    setCart(updatedCart.filter((product) => product.count > 0));
  };

  const totalPrice = cart.reduce(
    (accumulator, product) => accumulator + product.price * product.count,
    0
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <span style={{ height: 90, color: "#f59e42" }}>
        <center>
          <h1>Shopping Cart</h1>
        </center>
      </span>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ marginRight: "30px" }}>
          {cart.map((product) => (
            <div
              key={product.id}
              style={{ alignItems: "left", marginLeft: "30px" }}
            >
              <h2>{product.name}</h2>
              <img alt="Product image"></img>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleIncrement(product)}>+</button>
              {product.count}
              <button onClick={() => handleDecrement(product)}>-</button>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              verticalAlign: "center",
            }}
          >
            <h3>Total: {totalPrice}</h3>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      </div>
      {/* <span style={{ height: "90" }}></span> */}
      <br></br>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
