import { AppBar, Container, Typography, Toolbar, InputBase, IconButton } from "@mui/material"
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../styles/navBar.css"

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar className="navbar-container">
                <div>
                    <Typography variant="h6"><BubbleChartIcon/>DTP</Typography>
                </div>
                <div className="searchBar">
                    <InputBase type="text" />
                    <IconButton>
                        <SearchIcon className="icon" />
                    </IconButton>
                </div>
                <IconButton>
                    <AccountCircleIcon className="icon" />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;