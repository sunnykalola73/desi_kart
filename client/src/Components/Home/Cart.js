import { Footer } from "./Footer";
import { Header } from "./Header";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

const ShoppingCart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("CartData") || []));

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
          {cart.length > 0 ? cart.map((product) => (
            <div
              key={product._id}
              style={{ alignItems: "left", marginLeft: "30px" }}
            >
              <h2>{product.pname}</h2>
              <Image width={75} height={75} src={product.image} alt="Product image"/>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleIncrement(product)}>+</button>
              {product.count}
              <button onClick={() => handleDecrement(product)}>-</button>
            </div>
          )) : <div>Your cart is empty</div>}
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
           {cart.length > 0 && <><h3>Total: {totalPrice}</h3>
            <button>Proceed to Checkout</button></>} 
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
