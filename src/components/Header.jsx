import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AccountCircleIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
import SearchBar from "./SearchBar";

function Header(props) {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-md custom-bg-color rounded-pill mt-2 d-flex align-items-center">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <Logo />
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse custom-bg-color p-4 rounded-2" id="nav">
                        <SearchBar
                            isSearching={props.isSearching}
                            setIsSearching={props.setIsSearching}
                            searchInput={props.searchInput}
                            setSearchInput={props.setSearchInput}
                        />
                        <Link to="cart" className="text-decoration-none position-relative">
                            <IconButton className="bg-white ms-auto">
                                <ShoppingCartIcon />
                            </IconButton>
                            <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                                {props.numberOfItems}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </Link>
                        <Link to="user-dashboard" className="text-decoration-none">
                            <IconButton className="bg-white ms-2">
                                <AccountCircleIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;


