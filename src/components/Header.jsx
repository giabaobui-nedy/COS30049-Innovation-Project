import { InputBase, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
    return (
        // the start of the navbar
        <nav className="navbar navbar-expand-sm">
            <div className="container border border-dark rounded-pill">
                <div className="row flex-fill">
                    <div className="col-1">
                        <span><BubbleChartIcon />DTP</span>
                    </div>
                    <div className="col-9">
                        <span>
                            <InputBase type="text" placeholder="Search"></InputBase>
                            <IconButton className="float-end">
                                <SearchIcon />
                            </IconButton>
                        </span>
                    </div>
                    <div className="col-1">
                        <Link to="user-dashboard">
                            <IconButton className="float-end">
                                <AccountCircleIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="col-1">
                        <Link to="cart">
                            <IconButton className="float-end">
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;


