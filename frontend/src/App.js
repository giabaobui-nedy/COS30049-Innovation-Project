import { Routes, Route } from "react-router-dom"
import Main from "./components/Main";
import UserDashBoard from "./components/UserDashboard";
import ShoppingCart from "./components/ShoppingCart";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Custom CSS file
import "./styles/styles.css"
import TransactionHistory from "./components/TransactionHistory";
import { useState } from "react";
import RequestList from "./components/RequestList";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState({
    state: false,
    currentLoggedIn: ""
  })
  const [notif, setNotif] = useState("");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main setNotif={setNotif} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} addItemToCart={setCartItems} />}/>
        <Route path="/user-dashboard">
          <Route path="" element={<UserDashBoard notif={notif} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
          <Route path="requests" element={<RequestList username={loggedIn.currentLoggedIn}/>}/>
          <Route path="transaction-history" element={<TransactionHistory username={loggedIn.currentLoggedIn}/>} />
          <Route path="cart" element={<ShoppingCart username={loggedIn.currentLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
