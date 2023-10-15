import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import AccountCircleIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartTwoTone';
import SearchBar from "./SearchBar";

function NavigationalBar(props) {
    return (
        // the start of the navbar
        <nav className="navbar navbar-expand-md container-fluid rounded-pill bg-dark mt-2 sticky-top">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Logo size="50px" />
                </div>
                <button className="navbar-toggler bg-white rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-dark rounded-4 text-center p-1" id="nav">
                    <SearchBar className="mt-2 mb-1" setApiData={props.setApiData} getAllAssets={props.getAllAssets} />
                    <div className="container-fluid mt-2 mb-2">
                        <span className="container-fluid bg-white ava_pill rounded-pill">
                            <Link to="user-dashboard/cart">
                                <IconButton className="float-end border">
                                    <ShoppingCartIcon />
                                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill small-badge">
                                        {props.numberOfItems}
                                        <span className="visually-hidden">unread messages</span>
                                    </div>
                                </IconButton>
                            </Link>
                            <Link to="user-dashboard">
                                <IconButton className="float-end border">
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

export default NavigationalBar;


