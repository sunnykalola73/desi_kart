import axios from 'axios';
import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { Header } from './Header';
import logo from "./../../Images/logo.png"

export default function Register() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileno: "",
    addressline1: "",
    addressline2 :"",
    city: "",
    province: "",
    country:"",
    pincode:""
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const validateForm = () => {
   let isValid = true;
   let errors = {};
   
   if(!form.fname.trim())
   {
    isValid = false;
    errors["fname"] = "Please enter first name"
   }
   if(!form.lname.trim())
   {
    isValid = false;
    errors["lname"] = "Please enter last name"
   }
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
   //8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
   else if(!form.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
   {
    isValid = false;
    errors["password"] = "Please enter valid password"
   }
   if(!form.confirmPassword.trim())
   {
    isValid = false;
    errors["confirmPassword"] = "Please enter confirm password"
   }
   if(form.password !== form.confirmPassword)
   {
    isValid = false;
    errors["confirmPassword"] = "Password and confirm password must be same"
   }
   if(!form.mobileno)
   {
    isValid = false;
    errors["mobileno"] = "Please enter mobile no."
   }
   else if(form.mobileno.length > 10)
   {
    isValid = false;
    errors["mobileno"] = "Please enter valid mobile no."
   }
   if(!form.addressline1)
   {
    isValid = false;
    errors["addressline1"] = "Please enter address line 1"
   }
   if(!form.city)
   {
    isValid = false;
    errors["city"] = "Please enter city"
   }
   if(!form.province)
   {
    isValid = false;
    errors["province"] = "Please enter province"
   }
   if(!form.country)
   {
    isValid = false;
    errors["country"] = "Please enter country"
   }
   if(!form.pincode)
   {
    isValid = false;
    errors["pincode"] = "Please enter pincode"
   }   
   setErrors({...errors})
   return isValid;
  }
  const clearForm = () => {
    setForm({ 
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileno: "",
      addressline1: "",
      addressline2 :"",
      city: "",
      province: "",
      country:"",
      pincode:""
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
   
    if(validateForm())
    {
        delete form["confirmPassword"];  
        axios
        .post("http://localhost:3001/auth/signup", form)
        .then((response) => {   
            if(response.status === 201)
            {
                clearForm();     
                NotificationManager.success('You have registered successfully!');          
                localStorage.setItem("userData", JSON.stringify(response.data));  
                setErrors({});
                setError("");
                navigate("/");
            }     
        })
        .catch((emsg) => {         
            setError(emsg.response.data);          
        })
    }
  }

  return (
    <div >
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
      <Container fluid>        
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-warning"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                <Image className="img-fluid" src={logo}/>
                  <div className="mb-3">
                    <Form>
                    {error && <p style={{"color": "red"}}>{error}</p>}
                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          First Name<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name"  name="fname" value={form.fname} onChange={onChange}/>
                        {errors.fname && <p style={{"color": "red"}}>{errors.fname}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Last Name<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name"  name="lname" value={form.lname} onChange={onChange}/>
                        {errors.lname && <p style={{"color": "red"}}>{errors.lname}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"  name="email" value={form.email} onChange={onChange}/>
                        {errors.email && <p style={{"color": "red"}}>{errors.email}</p>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"                        
                      >
                        <Form.Label>Password<span style={{"color": "red"}}>*</span></Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  name="password" value={form.password} onChange={onChange}/>
                        {errors.password && <p style={{"color": "red"}}>{errors.password}</p>}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"                        
                      >
                        <Form.Label>Confirm Password<span style={{"color": "red"}}>*</span></Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password"  name="confirmPassword" value={form.confirmPassword} onChange={onChange}/>
                        {errors.confirmPassword && <p style={{"color": "red"}}>{errors.confirmPassword}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Mobile No.<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Mobile No."  name="mobileno" value={form.mobileno} onChange={onChange}/>
                        {errors.mobileno && <p style={{"color": "red"}}>{errors.mobileno}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Address Line 1<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Address Line 1"  name="addressline1" value={form.addressline1} onChange={onChange}/>
                        {errors.addressline1 && <p style={{"color": "red"}}>{errors.addressline1}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Address Line 2
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Address Line 2"  name="addressline2" value={form.addressline2} onChange={onChange}/>
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          City<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter City"  name="city" value={form.city} onChange={onChange}/>
                        {errors.city && <p style={{"color": "red"}}>{errors.city}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Province<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Province"  name="province" value={form.province} onChange={onChange}/>
                        {errors.province && <p style={{"color": "red"}}>{errors.province}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Country<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Country"  name="country" value={form.country} onChange={onChange}/>
                        {errors.country && <p style={{"color": "red"}}>{errors.country}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Postal Code<span style={{"color": "red"}}>*</span>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Postal Code"  name="pincode" value={form.pincode} onChange={onChange}/>
                        {errors.pincode && <p style={{"color": "red"}}>{errors.pincode}</p>}
                      </Form.Group>                   
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleSubmit} style={{backgroundColor: "#ed9102"}}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                      <Link to={"/login"} className="text-warning fw-bold"> Sign In </Link>
                      </p>
                      <p className="mb-0  text-center">                     
                      <Link to={"/"} className="text-warning fw-bold"> Back to Home </Link>
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