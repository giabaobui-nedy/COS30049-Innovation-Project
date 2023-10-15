import { Link, Outlet } from "react-router-dom";
import Logo from "./Logo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from "./SignIn";
import AccountDetails from "./AccountDetails";

function UserDashBoard(props) {

    const switchView = () => {
        if (props.loggedIn.state) {
            return (
                <div>
                    <div className="sidebar">
                        <IconButton data-bs-toggle="offcanvas" data-bs-target="#dashboard">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div className="offcanvas offcanvas-start" id="dashboard">
                        <div className="offcanvas-header">
                            <Logo size="70vw" />
                        </div>
                        <div className="offcanvas-body">
                            <h3 className="">Menu</h3>
                            <Link to="">
                                <button className="btn btn-outline-dark sidebar_opt">Account Details</button>
                            </Link>
                            <Link to="requests">
                                <button className="btn btn-outline-dark sidebar_opt">My Assets</button>
                            </Link>
                            <Link to="transaction-history">
                                <button className="btn btn-outline-dark sidebar_opt">Transaction History</button>
                            </Link>
                            <button type="submit" onClick={() => { props.setLoggedIn({ loggedIn: false, currentLoggedIn: "" }) }} className="btn btn-outline-dark sidebar_opt">Log out</button>
                        </div>
                    </div>
                    <AccountDetails user={props.loggedIn.currentLoggedIn} />
                    <Outlet />
                </div>
            );
        } else {
            return <SignIn notif={props.notif} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
        }
    };

    try {
        return (
            <div className="container">
                {switchView()}
            </div>
        )
    } catch {
        return (
            <div>Fail to fetch server data!</div>
        )
    }
}

export default UserDashBoard