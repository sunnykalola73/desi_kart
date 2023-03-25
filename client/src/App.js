import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Home from "./Components/Home/Home";
import Products from "./Components/Home/Products";
import Cart from "./Components/Home/Cart";
import Register from "./Components/Home/Register";
import Login from "./Components/Home/Login";
import { ProductList } from "./Components/Home/ProductList";
import ProductDescription from "./Components/Home/ProductDescription";

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />       
          <Route path="/products" element={<Products />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} />          
          <Route path="/cart" element={<Cart />} />         
          <Route path="/collections/:id" element={<ProductList />} />  
          <Route path="/description/:id" element={<ProductDescription />} />   
=======
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections/:id" element={<ProductList />} />
>>>>>>> 23600e855e180a82906190e196cd3ca1b8a8f43a
      </Routes>
      <NotificationContainer />
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />}/ >
    //       <Route path="/products" element={<Products />} />
    //       <Route path="/cart" element={<Cart />} />
    //     </Route>
    //   </Routes>
    // </Router>
  );
};

export default App;
