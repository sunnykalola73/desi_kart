import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { categoryList } from '../../Constants';

const Home = () => {
  return (
    <div>
      <Container fluid>
        {/* Navigation Bar */}
        <Row>
          <Col>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="https://google.com">DesiKart</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/products">Products</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/cart">Cart</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                </ul>
              </div>
            </nav>
          </Col>
        </Row>

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

        {/* Products Section */}
        <Row>
          {categoryList.map((category, key) => {
            return (     
            <Col md={4}>
              <div className="card">
                <Image src={category.image} rounded className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{category.title}</h5>
                  <p className="card-text">Product Description</p>
                  <Button variant="primary">View Products</Button>
                </div>
              </div>
            </Col>);
          })}
     
       
        </Row>

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
