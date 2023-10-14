import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import {useState} from "react";
import { Link } from 'react-router-dom';

function SignIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        //authentication
        axios.get('http://127.0.0.1:8000/getUserCredentials')
        .then(response => {
            const users = response.data;
            
            const logInUser = users.find(user => user.username === username && user.password === password);

            if(logInUser){
                props.setLoggedIn({state: true, currentLoggedIn: username});
            }else{
                alert("Incorrect login credentials!")
            }
        })
        .catch(error => {
            console.error(error);
        })
    };
    return (
        <div className="container text-center col-8">
            <h2 className="mt-2 text-center p-2 rounded-2 text-white bg-dark">Log in to your account <PersonIcon className="rounded-pill bg-white text-dark" /></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Username" name="user" id="user" />
                    <label for="user">Username</label>
                </div>

                <div className="form-floating m-3">
                    <input type="password" className="form-control" placeholder="Password" name="pwd" id="pwd" />
                    <label for="pwd">Password</label>
                </div>
                <button type="submit" className="btn btn-danger m-2">Submit</button>
                <Link to="/signup" className="btn btn-dark m-2">Signup</Link>
            </form>
        </div>
    )
}

export default SignIn;