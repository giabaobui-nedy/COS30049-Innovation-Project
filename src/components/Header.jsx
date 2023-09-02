import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";
<<<<<<< HEAD
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "./SearchBar";
=======
import SearchIcon from '@mui/icons-material/SearchTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
>>>>>>> 395e87b (update)

function Header(props) {
    return (
        // the start of the navbar
<<<<<<< HEAD
        <nav className="navbar navbar-expand-sm">
            <div className="container border border-dark rounded-pill">
                <div className="row flex-fill">
                    <div className="col-1">
                        <Logo />
                    </div>
                    <div className="col-9">
                        <SearchBar isSearching={props.isSearching} setIsSearching={props.setIsSearching} searchInput={props.searchInput} setSearchInput={props.setSearchInput} />
                    </div>
                    <div className="col-1">
=======
        <nav className="navbar navbar-expand-md container-fluid rounded-pill bg-dark mt-2 sticky-top">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Logo />
                </div>
                <button className="navbar-toggler bg-white rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-dark rounded-4" id="nav">
                    <form class="d-inline-flex container-fluid col-9">
                        <input className="form-control me-2" type="text" placeholder="Search" />
                        <IconButton className="float-end text-white border border-2 border-white">
                            <SearchIcon />
                        </IconButton>
                    </form>
                    <div className="container-fluid">
                        <span className="container-fluid bg-white ava_pill rounded-pill">
                        <Link to="cart">
                            <IconButton className="float-end">
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
>>>>>>> 395e87b (update)
                        <Link to="user-dashboard">
                            <IconButton className="float-end bg-secondary">
                                <AccountCircleIcon />
                            </IconButton>
                        </Link>
<<<<<<< HEAD
                    </div>
                    <div className="col-1">
                        <Link to="cart">
                            <IconButton className="float-end">
                                <ShoppingCartIcon />
                                <span className="badge rounded-pill text-bg-danger">{props.numberOfItems}</span>
                            </IconButton>
                        </Link>
=======
                        </span>
>>>>>>> 395e87b (update)
                    </div>
                </div>
                
                    
            </div>
                
        </nav>
    )
}

export default Header;


