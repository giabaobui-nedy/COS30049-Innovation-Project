import { Link, Outlet } from "react-router-dom"
import Logo from "./Logo"
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from "react";
import axios from "axios";

function UserDashBoard() {
    const [requestsToBuyAssets, setRequestsToBuyAssets] = useState([])

    const approve = (address, tokenId) => {
        console.log(address)
        console.log(tokenId)
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/approve/admin1/${address}/${tokenId}`,
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

    const fetchApiData = () => {
        // fetch data from the local server
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/getRequestsToBuyAssets/' + 'admin2',
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

    try {
        useEffect(() => {
            fetchApiData();
        }, [])

        return (
            <div className="container">
                <div className="col-2 sidebar border">
                    <IconButton data-bs-toggle="offcanvas" data-bs-target="#dashboard">
                        <MenuIcon />
                    </IconButton>
                </div>
                <div className="col-10 container-fluid">
                    <h1>Request List</h1>
                    <ul>
                        {requestsToBuyAssets.map((request, index) => (
                            <li key={index}>
                                <h3>Token ID: {request.tokenId}</h3>
                                <ul>
                                    {request.participants.map(([address, amount]) => (
                                        <li key={address}>
                                            <p>Address: {address} | Amount: {amount} <button onClick={() => {approve(address, request.tokenId)}}>Approve</button></p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="offcanvas offcanvas-start" id="dashboard">
                    <div className="offcanvas-header">
                        <Logo size="70vw" />
                    </div>
                    <div className="offcanvas-body">
                        <h3 className="">Menu</h3>
                        {/* <Link to="my-account"> */}
                            <button className="btn btn-outline-dark sidebar_opt">Account Details</button>
                        {/* </Link> */}
                        {/* <Link to="my-asset"> */}
                            <button className="btn btn-outline-dark sidebar_opt">My Assets</button>
                        {/* </Link> */}
                        <Link to="transaction-history">
                            <button className="btn btn-outline-dark sidebar_opt">Transaction History</button>
                        </Link>
                        <button className="btn btn-outline-dark sidebar_opt">Log out</button>
                    </div>
                </div>
                {/* <SignUp /> */}
                <Outlet />
            </div >
        )
    } catch {
        return (<div> No data available! </div>)
    }
}

export default UserDashBoard