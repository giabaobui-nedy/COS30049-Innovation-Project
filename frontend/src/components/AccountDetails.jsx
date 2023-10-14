import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountDetails(props) {
    const [userDetails, setUserDetails] = useState({});

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/getUserDetails/${props.user}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, []);

    return (
        <div>
            <h2>Account Details for {userDetails.username}</h2>
            {userDetails ? (
                <ul>
                    <li>
                        <strong>Username:</strong> {userDetails.username}
                    </li>
                    <li>
                        <strong>Address</strong> {userDetails.address}
                    </li>
                    <li>
                        <strong>Private Key</strong> {userDetails.privateKey}
                    </li>
                </ul>
            ) : (
                <p>User details not found!</p>
            )}
        </div>
    );
}

export default AccountDetails;