import { InputBase, IconButton } from "@mui/material";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
    return (
        // the start of the navbar
        <nav className="navbar navbar-expand-sm ">
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
                        <IconButton className="float-end">
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                    <div className="col-1">
                        <IconButton className="float-end">
                            <ShoppingCartIcon />
                        </IconButton>
                    </div>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                </div>
            </div>
        </nav>
    )
}

export default Header;


