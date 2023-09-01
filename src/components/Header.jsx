import { InputBase, IconButton } from "@mui/material";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
    return (
        // the start of the navbar
        <nav className="navbar navbar-expand-sm rounded-pill fixed-top">
            <div className="container-fluid">
                <div className="col-2 p-2">
                    <div><BubbleChartIcon />DTP</div>
                </div>
                <div className="collapse navber-collapse" id="#nav">
                    <form className="border">
						<input className="form-control me-2" type="text" placeholder="Search"/>
						<IconButton className="float-end">
                            <SearchIcon className="icon" />
                        </IconButton>
					</form>
                </div>
                <div className="col-2 rounded-pill">
                    <span>Username</span>
                    <IconButton className="float-end">
                        <AccountCircleIcon/>
                    </IconButton>
                </div>
                <div className = "col-1">
                    <IconButton className="float-end">
                        <ShoppingCartIcon/>
                    </IconButton>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
					<span className="navbar-toggler-icon"></span>
    			</button>
            </div>
        </nav>
    )
}

export default Header;


