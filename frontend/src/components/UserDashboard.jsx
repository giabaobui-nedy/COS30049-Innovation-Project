import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from "./SignIn";
import AccountDetails from "./AccountDetails";
import axios from "axios";

function UserDashBoard(props) {
    // const [serverResponse, setServerResponse] = useState("")
    // const [requestsToBuyAssets, setRequestsToBuyAssets] = useState([])

    // const approve = (address, amount, tokenId) => {
    //     console.log("Approving...")

    //     const options = {
    //         method: 'GET',
    //         url: `http://127.0.0.1:8000/approve/${props.loggedIn.currentLoggedIn}/${address}/${amount}/${tokenId}`,
    //         headers: { accept: 'application/json' }
    //     }

    //     axios
    //         .request(options)
    //         .then(response => {
    //             setServerResponse(response.data.result)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         });

    //     // get all the requests AGAIN
    //     getAllRequests(props.loggedIn.currentLoggedIn)
    // }

    // const getAllRequests = async (username) => {
    //     setServerResponse("")
    //     console.log("Get All Requests From UserDashboard()")
    //     const options = {
    //         method: 'GET',
    //         url: `http://127.0.0.1:8000/getRequestsToBuyAssets/${username}`,
    //         headers: { accept: 'application/json' }
    //     }

    //     axios
    //         .request(options)
    //         .then(response => {
    //             setRequestsToBuyAssets(response.data)
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         });
    // }

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