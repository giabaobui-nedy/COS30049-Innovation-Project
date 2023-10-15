import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from "./SignIn";
import AccountDetails from "./AccountDetails";
import axios from "axios";

function UserDashBoard(props) {
    const [serverResponse, setServerResponse] = useState("")
    const [requestsToBuyAssets, setRequestsToBuyAssets] = useState([])

    const approve = (address, tokenId) => {
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/approve/${props.loggedIn.currentLoggedIn}/${address}/${tokenId}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setServerResponse(response.data.result)
            })
            .catch(error => {
                console.error(error)
            });

        // get all the requests AGAIN
        getAllRequests(props.loggedIn.currentLoggedIn)
    }

    const getAllRequests = async (username) => {
        console.log("Get All Requests From UserDashboard()")
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/getRequestsToBuyAssets/${username}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                setRequestsToBuyAssets(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }

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
                            <button className="btn btn-outline-dark sidebar_opt">My Assets</button>
                            <Link to="transaction-history">
                                <button className="btn btn-outline-dark sidebar_opt">Transaction History</button>
                            </Link>
                            <button type="submit" onClick={() => { props.setLoggedIn({ loggedIn: false, currentLoggedIn: "" }) }} className="btn btn-outline-dark sidebar_opt">Log out</button>
                        </div>
                    </div>
                    <AccountDetails user={props.loggedIn.currentLoggedIn} />
                    <div>
                        {serverResponse !== "" ? <div class="alert alert-success" role="alert">{serverResponse}</div> : <div />}
                        <h1>Requests List</h1>
                        <ul className="request-list">
                            {requestsToBuyAssets.map((request, index) => (
                                <li className="request-item" key={request.tokenId}>
                                    <h3 className="request-header">Token ID: {request.tokenId}</h3>
                                    <ul className="participants-list">
                                        {request.participants.map(([address, amount], index) => (
                                            <li className="participant-item" key={index}>
                                                <p className="participant-info">Address {address} suggests an amount of: {amount} <button className="approve-button" onClick={() => { approve(address, request.tokenId) }}>Approve</button></p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <SignIn notif={props.notif} getAllRequests={getAllRequests} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
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