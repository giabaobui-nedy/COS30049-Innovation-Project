import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AccountCircleIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
import SearchBar from "./SearchBar";

function Header(props) {
    return (
        // the start of the navbar
        <nav className="navbar navbar-expand-md container-fluid rounded-pill bg-dark mt-2 sticky-top">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Logo />
                </div>
                <button className="navbar-toggler bg-white rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-dark rounded-4" id="nav">
                    <SearchBar isSearching={props.isSearching} setIsSearching={props.setIsSearching} searchInput={props.searchInput} setSearchInput={props.setSearchInput} />
                    <div className="container-fluid">
                        <span className="container-fluid bg-white ava_pill rounded-pill">
                            <Link to="cart">
                                <IconButton className="float-end">
                                    <ShoppingCartIcon />
                                    <span className="badge-sm rounded-pill text-bg-danger">{props.numberOfItems}</span>
                                </IconButton>
                            </Link>
                            <Link to="user-dashboard">
                                <IconButton className="float-end bg-secondary">
                                    <AccountCircleIcon />
                                </IconButton>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;


