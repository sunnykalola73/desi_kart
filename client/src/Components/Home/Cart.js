import { Footer } from "./Footer";
import { Header } from "./Header";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import { Rating } from 'react-simple-star-rating';
import emptyCart from "./../../Images/EmptyCart.png";
import { Link } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51MovUaFfBNsel5oD2T1lZvoisrG26ZPTFgbUPqSdvaWEJTNfJEuCoaHxPh8YRvoT5maHX5fo36xVpoW1LeTuRByF00y8ohV6zC');

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("CartData")) {
      setCart(JSON.parse(localStorage.getItem("CartData")))
    }
  }, []);

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
  ).toFixed(2);

  const noOfItems = cart.reduce(
    (accumulator, product) => accumulator + product.count,
    0
  );

  return (
    <Elements stripe={stripePromise}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <section class="pt-5 pb-5">
          <div class="container">
            <div class="row w-100">
              <div class="col-lg-12 col-md-12 col-12">
                <h3 class="mb-2 text-left">Shopping Cart</h3>
                <p class="mb-5">
                  <i class="font-weight-bold">{noOfItems}</i> items in your cart</p>
                {cart.length > 0 ? <table id="shoppingCart" class="table table-condensed table-responsive">
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>Products</th>
                      <th style={{ width: "10%" }}>Price</th>
                      <th style={{ width: "100%" }}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      return <tr key={index}>
                        <td data-th="Product">
                          <div class="row">
                            <div class="col-md-3 text-left">
                              <img src={item.image} alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow " />
                            </div>
                            <div class="col-md-9 text-left mt-sm-2">
                              <h5>{item.pname}</h5>
                              <p><Rating initialValue={item.rating} readonly={true} allowFraction /></p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price">${item.price}</td>
                        <td class="actions" data-th="">
                          <div class="text-right">
                            <button class="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => handleDecrement(item)}>
                              <i class="fas fa-minus"></i>
                            </button>{" "}
                            <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                              {item.count}
                            </button>{" "}
                            <button class="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => handleIncrement(item)}>
                              <i class="fas fa-plus"></i>
                            </button>
                            {/* <button class="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => handleDecrement(item)}>
                              <i class="fas fa-trash"></i>
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    })}

                  </tbody>
                </table> : <div className="text-center"><Image src={emptyCart} /></div>}

              </div>
            </div>
            <div class="row mt-2 d-flex align-items-center">
              <div class="col-sm-6 order-md-2 text-right">
                {cart.length > 0 &&
                  <><h3>Total: ${totalPrice}</h3>
                    <CheckoutForm amount={totalPrice} cart={cart} />
                  </>}
              </div>
              <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                <Link to={"/"}>
                  <i class="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section >
        <Footer />
      </div>
    </Elements>
  );
};

export default Cart;
