import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { RatingStar } from "rating-star";
import { NotificationManager } from 'react-notifications';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from "./Footer";

const ProductDescriptionPage = () => {

  const [product, setProduct] = useState({})
  const { id } = useParams();

  const getProductDetails = () => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setProduct(response.data[0]);
        }
      })
      .catch((emsg) => {
        console.log(emsg);
        NotificationManager.error(emsg.message);
      });
  };

  useEffect(() => {
    getProductDetails();
  }, [])

  const handleAddToCart = () => {
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
    NotificationManager.success("This product has been added in cart.")
  }
  return (
    <>  <Header />
      <Container className='mb-5 mt-3'>
        <Row mb={1}>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <h2>{product.pname}</h2>
            <p>{product.description}</p>
            <p><RatingStar id="123" rating={product.rating} /></p>
            <h3>${product.price}</h3>
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDescriptionPage;