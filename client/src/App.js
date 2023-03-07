import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home/Home";
import Products from "./Components/Home/Products";
import Cart from "./Components/Home/Cart";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />       
          <Route path="/products" element={<Products />} />         
          <Route path="/cart" element={<Cart />} />         
      </Routes>
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
