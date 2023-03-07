import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

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
                </ul>
              </div>
            </nav>
          </Col>
        </Row>

        {/* Jumbotron */}
        <Row>
          <Col>
            <div className="jumbotron">
              <h1>Welcome to My Ecommerce Website</h1>
              <p>Discover our wide range of products at competitive prices</p>
              <Button variant="primary" size="lg" href="#" role="button">Shop Now</Button>
            </div>
          </Col>
        </Row>

        {/* Products Section */}
        <Row>
          <Col md={4}>
            <div className="card">
              <Image src="https://via.placeholder.com/300x200" rounded className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Product Name</h5>
                <p className="card-text">Product Description</p>
                <Button variant="primary">Add to Cart</Button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card">
              <Image src="https://via.placeholder.com/300x200" rounded className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Product Name</h5>
                <p className="card-text">Product Description</p>
                <Button variant="primary">Add to Cart</Button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card">
              <Image src="https://via.placeholder.com/300x200" rounded className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Product Name</h5>
                <p className="card-text">Product Description</p>
                <Button variant="primary">Add to Cart</Button>
              </div>
            </div>
          </Col>
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
