// RegistrationForm.js
// from: https://www.educative.io/answers/how-to-handle-authentication-and-authorization-in-react-js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    // const handleRegistration = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('/api/register', { username, password, address, privateKey });
    //         // Handle successful registration
    //         console.log(response.data);
    //         const registeredUser = response.data;
    //         props.setLoggedIn({state: true, currentLoggedIn: registeredUser.username})
    //     } catch (error) {
    //         // Handle registration error
    //         console.error(error);
    //     }
    // };

    return (
        <div className="container text-center col-8">
            <h2 className="mt-2 text-center p-2 rounded-2 text-white bg-dark">Register a new account <PersonIcon className="rounded-pill bg-white text-dark" /></h2>
            <form>
                <div className="form-floating m-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        name="user"
                        id="user"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><label for="user">Username</label>
                </div>
                <div className="form-floating m-3">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="pwd"
                        id="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><label for="pwd">Password</label>
                </div>
                <div className="form-floating m-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="address"
                        name="addr"
                        id="addr"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    /><label for="addr">Address</label>
                </div>
                <div className="form-floating m-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="privateKey"
                        name="priKey"
                        id="priKey"
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                    /><label for="priKey">Private Key</label>
                </div>
                <button className="btn btn-danger" type="submit">Register</button>
                <Link to="/sign-in" className="btn btn-dark m-2">Back to Sign In</Link>
            </form>
        </div>
    );
};

export default SignUp;