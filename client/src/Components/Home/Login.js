import React, { useState } from "react";
import axios from "axios";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Header } from "./Header";
import logo from "./../../Images/logo.png";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const clearForm = () => {
    setForm({
      email: "",
      password: "",
    });
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (!form.email.trim()) {
      isValid = false;
      errors["email"] = "Please enter email";
    } else if (
      !form.email.match(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
      )
    ) {
      isValid = false;
      errors["email"] = "Please enter valid email";
    }
    if (!form.password.trim()) {
      isValid = false;
      errors["password"] = "Please enter password";
    }
    setErrors({ ...errors });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3001/auth/login", form)
        .then((response) => {
          if (response.status === 200) {
            clearForm();
            NotificationManager.success("You have logged in successfully!");
            localStorage.setItem("userData", JSON.stringify(response.data));
            setErrors({});
            setError("");
            navigate("/");
          }
        })
        .catch((emsg) => {
          setError(emsg.response.data);
        });
    }
  };

  return (
    <div>
      <Container
        fluid
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/food-pattern-design_1284-566.jpg?w=740&t=st=1678322255~exp=1678322855~hmac=146158e1332d6f437ffe9524fc83a827e05fdb56017635261dd8c86741e5e663)",
          height: window.innerHeight,
          // width: '1000px',
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // opacity:0.8
        }}
      >
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-warning"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <Image className="img-fluid" src={logo} />
                  <div className="mb-3">
                    <Form>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          id="login-email"
                          name="email"
                          value={form.email}
                          onChange={onChange}
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          Password<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          id="login-password"
                          name="password"
                          value={form.password}
                          onChange={onChange}
                        />
                        {errors.password && (
                          <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                      </Form.Group>
                      <div className="d-grid">
                        {/* <Button variant="primary" type="submit" onClick={handleSubmit} style={{backgroundColor: "#ec6520"}}> */}
                        <Button
                          id="login-button"
                          variant="primary"
                          type="submit"
                          onClick={handleSubmit}
                          style={{ backgroundColor: "#ed9102" }}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have account??{" "}
                        <Link to={"/register"} className="text-warning fw-bold" id="signup">
                          {" "}
                          Sign Up{" "}
                        </Link>
                      </p>
                      <p className="mb-0  text-center">
                        <Link to={"/"} className="text-warning fw-bold">
                          {" "}
                          Back to Home{" "}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
