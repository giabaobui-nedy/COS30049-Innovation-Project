import PersonIcon from '@mui/icons-material/Person';

function SignUp() {
    return (
        <div className="container text-center">
            <h2 className="mt-2 text-center p-2 rounded-2 text-white bg-dark">Register your new account <PersonIcon className="rounded-pill bg-white text-dark"/></h2>
            <form>
                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Username" name="user" id="user" />
                    <label for="user">Username</label>
                </div>

                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Password" name="pwd" id="pwd" />
                    <label for="pwd">Password</label>
                </div>

                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Address" name="addr" id="addr" />
                    <label for="addr">Address</label>
                </div>

                <div className="form-floating m-3">
                    <input type="text" className="form-control" placeholder="Private Key" name="prvkey" id="prvkey" />
                    <label for="prvkey">Private Key</label>
                </div>
                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;