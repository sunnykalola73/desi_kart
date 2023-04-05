import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { Rating } from 'react-simple-star-rating'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ProductList = () => {
  const [products, setProducts] = useState();
  const [cartData, setCartData] = useState([]);
  const { id } = useParams();


  const getProducts = () => {
    axios
      .get(`http://localhost:3001/categories/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((emsg) => {
        console.log(emsg);
        NotificationManager.error(emsg.message);
      });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    let cartData = JSON.parse(localStorage.getItem("CartData")) || [];
    let prductIndex = cartData.findIndex(p => p._id === product._id);
    let thisProduct;

    if (prductIndex >= 0) {
      thisProduct = cartData[prductIndex];
      thisProduct.count = thisProduct.count + 1;
      cartData[prductIndex] = thisProduct;

    }
    else {
      thisProduct = {
        ...product,
        count: 1
      }
      cartData.push(thisProduct);
    }

    localStorage.setItem("CartData", JSON.stringify(cartData))
    setCartData([...cartData]);
    NotificationManager.success("This product has been added in cart.")
  }

  useEffect(() => {
    getProducts();
  }, [])


  return (
    <>
      <Header />
      <Row>
        {products && products.map((product) => {
          return (
            <Col md={4} key={product._id}>
              <div className="card">
                <Image src={product.image} style={{ height: "300px", width: "350px", margin: "5%" }} rounded className="card-img-top" alt="..." />
                <div className="card-body">
                  <Link to={`/description/${product._id}`}> <h5 className="card-title">{product.pname}</h5></Link>
                  {/* <p className="card-text">{product.description}</p> */}
                  $<span className="card-text">{product.price}</span>
                  <p><Rating initialValue={product.rating} readonly={true} allowFraction /></p>
                  <button className="btn btn-primary" onClick={(e) => handleAddToCart(e, product)}>Add To Cart</button>
                </div>
              </div>
            </Col>);
        })}

      </Row>
      <Footer />
    </>)
}
