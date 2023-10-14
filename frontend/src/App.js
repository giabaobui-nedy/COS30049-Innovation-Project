import { Routes, Route } from "react-router-dom" 
import Main from "./components/Main";
import Header from "./components/Header"
import UserDashBoard from "./components/UserDashboard";
import ShoppingCart from "./components/ShoppingCart";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Custom CSS file
import "./styles/styles.css"
import TransactionHistory from "./components/TransactionHistory";
import { useState } from "react";


function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="/" render={(props) => <Header {...props}/>} element={ <Main cartItems={cartItems} addItemToCart={setCartItems}/>} />
        <Route path="/user-dashboard" render={(props) => <UserDashBoard {...props}/>} element={ <UserDashBoard/> } >
          <Route path="transaction-history" element={<TransactionHistory/>}></Route>
        </Route>
        <Route path="/cart" element={ <ShoppingCart cartItems={cartItems} setCartItems={setCartItems}/> } />
      </Routes>
    </div>
  );
}

export default App;
