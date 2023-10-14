import PersonIcon from '@mui/icons-material/Person';
import useState from "react";

function SignIn(props) {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your authentication logic here
        // Assuming authentication is successful:
        props.setLoggedIn({ state: true, currentLoggedIn: username });
    };
    return (
        <div className="container text-center">
            <h2 className="mt-2 text-center p-2 rounded-2 text-white bg-dark">Log in to your account <PersonIcon className="rounded-pill bg-white text-dark" /></h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Username" name="user" id="user" />
                    <label for="user">Username</label>
                </div>

                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Password" name="pwd" id="pwd" />
                    <label for="pwd">Password</label>
                </div>
                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
        </div>
    )
}

export default SignIn;