import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';

function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        //authentication

        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/authenticate/${username}/${password}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                if (response.data.result === 'authenticated') {
                    props.setLoggedIn({state: true, currentLoggedIn: username})
                }
            })
            .catch(error => {
                console.error(error)
            })

        // console.log (username, password)
    }

    return (
        <div className="container text-center col-8">
            <h2 className="mt-2 text-center p-2 rounded-2 text-white bg-dark">Log in to your account <PersonIcon className="rounded-pill bg-white text-dark" /></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating m-3">
                    <input onChange={(e) => {setUsername(e.target.value)}} value={username} type="text" className="form-control" placeholder="Username" name="user" id="user" />
                    <label for="user">Username</label>
                </div>

                <div className="form-floating m-3">
                    <input onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" className="form-control" placeholder="Password" name="pwd" id="pwd" />
                    <label for="pwd">Password</label>
                </div>
                <button type="submit" className="btn btn-danger m-2">Submit</button>
                <Link to="/signup" className="btn btn-dark m-2">Signup</Link>
            </form>
        </div>
    )
}

export default SignIn;