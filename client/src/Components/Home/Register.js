import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

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
  const [errors, setErrors] = useState({})

  const onChange = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const validateForm = () => {
   let isValid = true;
   let errors = {}
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm())
    {
      console.log(form);
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
                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          First Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name"  name="fname" value={form.fname} onChange={onChange}/>
                        {errors.fname && errors.fname}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name"  name="lname" value={form.lname} onChange={onChange}/>
                        {errors.lname && errors.lname}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email 
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"  name="email" value={form.email} onChange={onChange}/>
                        {errors.email && errors.email}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"                        
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  name="password" value={form.password} onChange={onChange}/>
                        {errors.password && errors.password}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"                        
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Confirm Password"  name="confirmPassword" value={form.confirmPassword} onChange={onChange}/>
                        {errors.confirmPassword && errors.confirmPassword}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Mobile No.
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Mobile No."  name="mobileno" value={form.mobileno} onChange={onChange}/>
                        {errors.mobileno && errors.mobileno}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Address Line 1
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Address Line 1"  name="addressline1" value={form.addressline1} onChange={onChange}/>
                        {errors.addressline1 && errors.addressline1}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          Address Line 2
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Address Line 2"  name="addressline2" value={form.addressline2} onChange={onChange}/>
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                          City
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter City"  name="city" value={form.city} onChange={onChange}/>
                        {errors.city && errors.city}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Province
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Province"  name="province" value={form.province} onChange={onChange}/>
                        {errors.province && errors.province}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Country
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Country"  name="country" value={form.country} onChange={onChange}/>
                        {errors.country && errors.country}
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="text-center">
                        Postal Code
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Postal Code"  name="pincode" value={form.pincode} onChange={onChange}/>
                        {errors.pincode && errors.pincode}
                      </Form.Group>                   
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                      <Link to={"/login"} className="text-primary fw-bold"> Sign In </Link>
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