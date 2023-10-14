import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignIn from "./SignIn";
import AccountDetails from "./AccountDetails";
import axios from "axios";

function UserDashBoard(props) {
    const [requestsToBuyAssets, setRequestsToBuyAssets] = useState([])

    const approve = (address, tokenId) => {
        console.log(address)
        console.log(tokenId)
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/approve/${props.loggedIn.currentLoggedIn}/${address}/${tokenId}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                console.log(response.data.result)
            })
            .catch(error => {
                console.error(error)
            });
    }

    const getAllRequests = () => {
        // fetch data from the local server
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/getRequestsToBuyAssets/${props.loggedIn.currentLoggedIn}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                // console.log(response.data)
                setRequestsToBuyAssets(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }


    const switchView = () => {
        if (props.loggedIn.state) {
            return (
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
                            <button type="submit" onClick={() => { props.setLoggedIn({ loggedIn: false, currentLoggedIn: "" }) }} className="btn btn-outline-dark sidebar_opt">Log out</button>
                        </div>
                    </div>
                    <AccountDetails user={props.loggedIn.currentLoggedIn} />
                    <div>
                        <h1>Request List</h1>
                        <ul>
                            {requestsToBuyAssets.map((request, index) => (
                                <li key={index}>
                                    <h3>Token ID: {request.tokenId}</h3>
                                    <ul>
                                        {request.participants.map(([address, amount]) => (
                                            <li key={address}>
                                                <p>Address: {address} | Amount: {amount} <button onClick={() => { approve(address, request.tokenId) }}>Approve</button></p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            );
        } else {
            return <SignIn loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />;
        }
    };

    try {
        useEffect(() => {
            getAllRequests()
        }, [])
        return (
            <div className="container">
                {switchView()}
            </div>
        )
    } catch {
        return (
            <div>Not available!</div>
        )
    }
}

export default UserDashBoard