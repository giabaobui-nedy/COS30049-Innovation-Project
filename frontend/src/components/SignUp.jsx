// RegistrationForm.js
// from: https://www.educative.io/answers/how-to-handle-authentication-and-authorization-in-react-js
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { username, password, address, privateKey });
            // Handle successful registration
            console.log(response.data);
        } catch (error) {
            // Handle registration error
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <input
                className="inputBox"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="privateKey"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
            />
            <button className='button' type="submit">Register</button>
        </form>
    );
};

export default SignUp;