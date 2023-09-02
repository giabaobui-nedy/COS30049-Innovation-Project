import { Link } from "react-router-dom"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { IconButton } from "@mui/material";

function Logo() {
    return (
        <Link to="/">
            <IconButton><BubbleChartIcon/>DTP</IconButton>
        </Link>
    )
}

export default Logo

