import { Col, Row } from "react-bootstrap";
import logo from "./../../Images/logo.svg";

export const Footer = () => {
  return (
    <Row>
      <Col>
        <footer className="bg-dark text-white text-center py-3">
          <img id="Logo" src={logo} height="200"></img>
          <p>Desikart &copy; 2023</p>
        </footer>
      </Col>
    </Row>
  );
};
