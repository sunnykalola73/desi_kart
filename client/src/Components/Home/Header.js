import { Row, Col, Image } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "./../../Images/logo.png"

export const Header = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();    
        let userData = JSON.parse(localStorage.getItem("userData"));
        let config = {
          headers: {
            'Authorization': 'Bearer ' + userData.token
          }
        }
        axios
            .post("http://localhost:3001/auth/logout", null, config)
            .then((response) => {   
              console.log(response);
                if(response.status === 200)
                {                  
                  NotificationManager.success('You have logged out successfully!');          
                  localStorage.removeItem("userData");               
                  navigate("/");
                }     
            })
            .catch((emsg) => {                            
              NotificationManager.error(emsg.response.data); 
            })
      }

    return (    
          <Row>
          <Col>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-faded">
              <a className="navbar-brand" href="/"><img className="img-fluid" height="10" thumbnail={true} src={logo} alt="DesiKart"/></a>
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
                  {localStorage.getItem("userData") ? 
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                  </li> : 
                  <><li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li></>}
                
                </ul>
              </div>
            </nav> */}
             <nav class="navbar navbar-expand-lg navbar-light bg-light">
             <div class="container-fluid">
            <a href="/" class="navbar-brand">
                <img src={logo} height="40" alt="DesiKart"/>
            </a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              
                <form class="d-flex input-group w-auto">
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                    />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </form>
                <div class="navbar-nav ms-auto">
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="far fa-heart"></i>
                    </span>
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-shopping-cart"></i>
                    </span>                    
                    <a href="/login" class="nav-item nav-link">Login</a>
                </div>
            </div>
        </div>
    </nav>
          </Col>
        </Row>
    );
        
    }