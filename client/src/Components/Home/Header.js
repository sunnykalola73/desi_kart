import { Row, Col } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../Images/logo.svg";
import "./Header.css";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      axios
        .get("http://localhost:3001/search/" + event.target.value)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setSearchResults(response.data[0]);
          }
        })
        .catch((emsg) => {
          NotificationManager.error(emsg.response.data);
        });
    }
    else {
      setSearchResults([])
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    let userData = JSON.parse(localStorage.getItem("userData"));
    let config = {
      headers: {
        Authorization: "Bearer " + userData.token,
      },
    };
    axios
      .post("http://localhost:3001/auth/logout", null, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          NotificationManager.success("You have logged out successfully!");
          localStorage.removeItem("userData");
          navigate("/");
        }
      })
      .catch((emsg) => {
        NotificationManager.error(emsg.response.data);
      });
  };


  const navigateProduct = (product) => {
    navigate("/description/" + product._id);
    setSearchResults([])
  }

  return (
    <Row>
      <Col>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a href="/" class="navbar-brand">
              <img src={logo} height="70" alt="DesiKart" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <form
                class="d-flex input-group ms-auto"
                style={{ width: "80%", marginLeft: "2%!important" }}
              >
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  aria-describedby="search-addon"
                  style={{ borderColor: "#ED6523" }}
                  onChange={handleSearch}
                />

                <span
                  class="input-group-text border-0 bg-transparent"
                  id="search-addon"
                  style={{ borderColor: "#ED6523" }}
                >
                  <i style={{ color: "#ED6523" }} class="fas fa-search"></i>
                </span>
                {searchResults.length > 0 && (
                  <ul class="search-results">
                    {searchResults.map((result) => (
                      <li key={result._id} onClick={() => navigateProduct(result)}>
                        <img src={result.image} alt="" style={{ height: "30px" }} />
                        <span key={result._id}>{result.pname}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              <div class="navbar-nav ms-auto">
                {/* <span
                  class="input-group-text border-0 bg-transparent"
                  id="search-addon"
                >
                  <i style={{ color: "#ED6523" }} class="far fa-heart"></i>
                </span> */}
                <span
                  class="input-group-text border-0 bg-transparent"
                  id="search-addon"
                >
                  <a href="/Cart">
                    <i
                      style={{ color: "#ED6523" }}
                      class="fas fa-shopping-cart"
                    >
                      {/* {noOfItems > 0 && <Badge bg="warning">{noOfItems}</Badge>} */}
                    </i>
                  </a>
                </span>
                <span
                  class="input-group-text border-0 bg-transparent"
                  id="search-addon"
                >
                  {localStorage.getItem("userData") ? (
                    <a
                      style={{ color: "#ED6523" }}
                      href="/"
                      class="nav-item nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  ) : (
                    <a
                      style={{ color: "#ED6523" }}
                      href="/login"
                      class="nav-item nav-link"
                    >
                      Login
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </nav>

      </Col>
    </Row>


  );
};

