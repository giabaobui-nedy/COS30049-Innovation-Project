import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountDetails(props) {
    const { loggedInUser } = props;
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/getAllUserDetails/${loggedInUser}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserDetails();
    }, [loggedInUser]);

    return (
        <div>
            <h2>Account Details for {loggedInUser}</h2>
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