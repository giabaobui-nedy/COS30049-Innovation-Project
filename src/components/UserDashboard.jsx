import { Link, Outlet} from "react-router-dom"
import Logo from "./Logo"

function UserDashBoard() {
    return (
        <div className="container">
            <Logo/>
            <Link to="transaction-history">
                <p>Transaction History</p>
            </Link>
            <div>This is user dashboard!</div>
            <Outlet/>
        </div>
        
    )
}

export default UserDashBoard