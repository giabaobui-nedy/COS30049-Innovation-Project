import { Link } from "react-router-dom"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { IconButton } from "@mui/material";
import logo from "../res/img/logo.png";

function Logo(props) {
    return (
            <IconButton><Link to="/" ><img src={logo} alt="Not Available"  height={props.size} className="rounded-3"/></Link></IconButton>
        
    )
}

export default Logo

