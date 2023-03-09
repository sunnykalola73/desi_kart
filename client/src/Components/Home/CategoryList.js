import { Row, Col, Image, Button } from 'react-bootstrap';
import { categoryList } from '../../Constants';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CategoryList = () => {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

   
    const getCategories = () => {       
        axios
            .get("http://localhost:3001/categories")
            .then((response) => {   
              console.log(response);
                if(response.status === 200)
                {                  
                    setCategories(response.data);                  
                }     
            })
            .catch((emsg) => {   
              console.log(emsg);              
              NotificationManager.error(emsg.message); 
            })
      }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <Row >
          {categories && categories.map((category) => {
            return (     
            <Col md={2} key={category._id}>
              <div className="card">
                <Image src={category.image} rounded className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{category.title}</h5>
                  {/* <p className="card-text">Product Description</p> */}
                  <Button variant="warning" onClick={() => navigate(`collections/${category._id}`)}>View Products</Button>
                </div>
                
              </div>
              <br></br>
            </Col>);
          })}     
       
        </Row>
    )
}