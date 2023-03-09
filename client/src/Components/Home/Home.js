import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { CategoryList } from './CategoryList';
import { Footer } from './Footer';
import { Header } from './Header';
import banner from '../../Images/image2.png'


const Home = () => {

  return (
    <div>
      <Container fluid>
        <Header />
        {/* <img src="https://img.freepik.com/free-vector/food-pattern-design_1284-566.jpg?w=740&t=st=1678322255~exp=1678322855~hmac=146158e1332d6f437ffe9524fc83a827e05fdb56017635261dd8c86741e5e663" 
      alt="background" className="bg-img"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
      }} /> */}
        {/* Jumbotron */}
        <Row>
          <Col>
            <div className="jumbotron">
              <Image src="https://cdn.shopify.com/s/files/1/0524/1874/0389/files/Allthingsdesi_8a26573f-b748-435f-a239-559b22ea1241_1600x.gif?v=1646847947" className="card-img-top" />
              
              <Image src={banner} className="card-img-top mb-3" />
             
            </div>
          </Col>
        </Row>
        
        {/* Categories Section */}
        <CategoryList />

        {/* Footer */}
       <Footer />
      </Container>
    </div>
  );
};

export default Home;
