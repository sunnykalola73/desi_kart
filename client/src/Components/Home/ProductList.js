import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { RatingStar } from "rating-star";
import { useNavigate, useParams } from "react-router-dom";

export const ProductList = () => {
    const [products, setProducts] = useState();
    // const navigate = useNavigate();
    const { id } = useParams();
    console.log("id", id);
   
    const getProducts = () => {       
        axios
            .get(`http://localhost:3001/categories/${id}`)
            .then((response) => {   
              console.log(response);
                if(response.status === 200)
                {                  
                    setProducts(response.data);                  
                }     
            })
            .catch((emsg) => {   
              console.log(emsg);              
              NotificationManager.error(emsg.message); 
            })
      }

    useEffect(() => {
        getProducts();
    }, [])
    return ( 
    <Row>
        {products && products.map((product) => {
          return (     
          <Col md={4} key={product._id}>
            <div className="card">
              <Image src={product.image} rounded className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.pname}</h5>
                  <p className="card-text">{product.description}</p>
                  <RatingStar id="123" rating={product.rating} />               
              </div>
            </div>
          </Col>);
        })}     
     
      </Row>)
}