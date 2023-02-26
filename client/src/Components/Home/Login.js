import React, { useState } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ 
    email: "",
    password: "",  
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const onChange = e => {
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
      })
  }
  const validateForm = () => {
   let isValid = true;
   let errors = {}  
   if(!form.email.trim())
   {
    isValid = false;
    errors["email"] = "Please enter email"
   }
   else if(!form.email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)){
    isValid = false;
    errors["email"] = "Please enter valid email"
   }  
   if(!form.password.trim())
   {
    isValid = false;
    errors["password"] = "Please enter password"
   } 
   setErrors({...errors})
   return isValid;
  } 

  const handleSubmit = (e) => {
    e.preventDefault();    
    if(validateForm())
    {
        axios
        .post("http://localhost:3001/login", form)
        .then((response) => {           
            if(response.status === 200)
            {
                clearForm();     
                localStorage.setItem("userData", JSON.stringify(response.data));           
            }     
        })
        .catch((emsg) => {
            setError(emsg.response.data);          
        })
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Logo</h2>
                  <div className="mb-3">
                    <Form>    
                        {error && <p style={{"color": "red"}}>{error}</p>}                  
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email 
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"  name="email" value={form.email} onChange={onChange}/>
                        {errors.email && <p style={{"color": "red"}}>{errors.email}</p>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"                        
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  name="password" value={form.password} onChange={onChange}/>
                        {errors.password && <p style={{"color": "red"}}>{errors.password}</p>}
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Don't have account??{" "}
                      <Link to={"/register"} className="text-primary fw-bold"> Sign Up </Link>
                        {/* <a href="{''}" className="text-primary fw-bold">
                          Sign In
                        </a> */}
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
  )
}