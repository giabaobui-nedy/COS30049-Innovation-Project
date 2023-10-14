import { Link, Outlet } from "react-router-dom"
import Logo from "./Logo"
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from "./SignIn";

function UserDashBoard(props) {
    const { loggedIn } = props;
    
    return (
        <div className="container">
            {loggedIn.state ? (
                <>
                    <div className="sidebar">
                        <IconButton data-bs-toggle="offcanvas" data-bs-target="#dashboard">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div class="offcanvas offcanvas-start" id="dashboard">
                        <div class="offcanvas-header">
                            <Logo size="70vw" />
                        </div>
                        <div class="offcanvas-body">
                            <h3 className="">Menu</h3>
                            <button className="btn btn-outline-dark sidebar_opt">Account Details</button>
                            <button className="btn btn-outline-dark sidebar_opt">My Assets</button>
                            <Link to="transaction-history">
                                <button className="btn btn-outline-dark sidebar_opt">Transaction History</button>
                            </Link>
                            <button className="btn btn-outline-dark sidebar_opt">Log out</button>
                        </div>
                    </div>
                </>
            ) : (
                <SignIn setLoggedIn = {props.setLoggedIn} />
            )}
            <Outlet />
        </div>
    )
}

export default UserDashBoard