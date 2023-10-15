import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountDetails(props) {
    const [userDetails, setUserDetails] = useState({});
    const [balance, setBalance] = useState(0)

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/getUserDetails/${props.user}`);
            setUserDetails(response.data.userDetails);
            setBalance(response.data.balance)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, []);

    return (
        <div>
            <h1>Account Details for {userDetails.username}</h1>
            {userDetails ? (
                <ul className="list-group">
                    <li className="list-group-item m-2">
                        <strong>Username:</strong> {userDetails.username}
                    </li>
                    <li className="list-group-item m-2">
                        <strong>Address</strong> {userDetails.address}
                    </li>
                    <li className="list-group-item m-2">
                        <strong>Private Key</strong> {userDetails.privateKey}
                    </li>
                    <li className="list-group-item m-2">
                        <strong>Balance</strong> {balance} ETH
                    </li>
                </ul>
            ) : (
                <p>Error fetching user data from server</p>
            )}
        </div>
    );
}

export default AccountDetails;