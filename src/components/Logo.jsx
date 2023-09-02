import { Link } from "react-router-dom"
import { IconButton } from "@mui/material";
import logo from "../res/img/logo.png";

function Logo() {
    return (
        <IconButton><Link to="/" ><img src={logo} alt="Not Available" height="60px" className="rounded-3" /></Link></IconButton>
    )
}

export default Logo

