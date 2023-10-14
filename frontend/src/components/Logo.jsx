import { Link } from "react-router-dom"
import { IconButton } from "@mui/material";
import logo from "../res/img/logo.png";

// Swinburne Logo
function Logo(props) {
    return (
        <IconButton><Link to="/" ><img src={logo} alt="Not Available" height={props.size} className="rounded-3" /></Link></IconButton>
    )
}

export default Logo

