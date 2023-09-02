import { Routes, Route } from "react-router-dom" 
import Main from "./components/Main";
import UserDashBoard from "./components/UserDashboard";
import ShoppingCart from "./components/ShoppingCart";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Custom CSS file
import "./styles/styles.css"


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Main/> } />
        <Route path="/user-dashboard" element={ <UserDashBoard/> } />
        <Route path="/cart" element={ <ShoppingCart/> } />
      </Routes>
    </div>
  );
}

export default App;
