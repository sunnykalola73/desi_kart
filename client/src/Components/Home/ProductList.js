import axios from "axios";
import { useEffect, useState } from "react";
import {  Col, Image, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { RatingStar } from "rating-star";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ProductList = () => {
    const [products, setProducts] = useState();
    const navigate = useNavigate();
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
                            <Link className="card" to={`/description/${product._id}`} style={{cursor: "pointer"}}>
                                <Image src={product.image} style={{height: "300px", width: "350px", margin:"5%"}} rounded className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{product.pname}</h5>
                                    {/* <p className="card-text">{product.description}</p> */}
                                    $<span className="card-text">{product.price}</span>
                                    <p><RatingStar id="123" rating={product.rating} /></p>
                                </div>
                            </Link>
                        </Col>);
                })}

            </Row>
            <Footer/>
        </>)
}
