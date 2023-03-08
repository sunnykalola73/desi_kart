import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { CategoryList } from './CategoryList';
import { Header } from './Header';


const Home = () => {
    
  return (
    <div>
      <Container fluid>
      <Header />
        {/* Jumbotron */}
        <Row>
          <Col>
            <div className="jumbotron">
              <Image src="https://cdn.shopify.com/s/files/1/0524/1874/0389/files/Allthingsdesi_8a26573f-b748-435f-a239-559b22ea1241_1600x.gif?v=1646847947" className="card-img-top"  />
              <Image src="https://cdn.shopify.com/s/files/1/0524/1874/0389/files/March-Banner_b842ca4c-03dd-445a-889d-0d3e10f3841a_1400x.jpg?v=1677635268" className="card-img-top" />
              <Button variant="primary" size="lg" href="#" role="button">Shop Now</Button>
            </div>
          </Col>
        </Row>

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
