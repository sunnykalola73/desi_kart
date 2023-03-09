import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { CategoryList } from './CategoryList';
import { Header } from './Header';


const Home = () => {
    
  return (
    <div>
      <Container fluid>
      <Header />
      <img src="https://img.freepik.com/free-vector/food-pattern-design_1284-566.jpg?w=740&t=st=1678322255~exp=1678322855~hmac=146158e1332d6f437ffe9524fc83a827e05fdb56017635261dd8c86741e5e663" 
      alt="background" className="bg-img"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
      }} />
        {/* Jumbotron */}
        <Row>
          <Col>
            <div className="jumbotron">
              <Image src="https://cdn.shopify.com/s/files/1/0524/1874/0389/files/Allthingsdesi_8a26573f-b748-435f-a239-559b22ea1241_1600x.gif?v=1646847947" className="card-img-top"  />
              <hr></hr>
              <Image src="https://cdn.shopify.com/s/files/1/0524/1874/0389/files/March-Banner_b842ca4c-03dd-445a-889d-0d3e10f3841a_1400x.jpg?v=1677635268" className="card-img-top" />
              {/* <Image src="./Images/image2.png" className="card-img-top" /> */}
              {/* <Button variant="primary" size="lg" href="#" role="button">Shop Now</Button> */}
            </div>
          </Col>
        </Row>
        <hr></hr>
        {/* Categories Section */}
        <CategoryList/>

        {/* Footer */}
        <Row>
          <Col>
            <footer className="bg-dark text-white text-center py-3">
              <p>My Ecommerce Website &copy; 2023</p>
            </footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
