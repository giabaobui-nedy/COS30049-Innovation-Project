import { Link } from "react-router-dom"
import { IconButton } from "@mui/material";
import logo from "../res/img/logo.png";

function Logo() {
    return (
        <IconButton>
            <Link to="/"><img width={95} src={logo} alt="Not Available" className="img-fluid rounded" />
            </Link>
        </IconButton>
    )
}

export default Logo

