import { InputBase, IconButton } from "@mui/material";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
    return (
        <div className="container border rounded p-3 my-2">
            <div className="row">
                <div className="col-2 p-2">
                    <div><BubbleChartIcon />DTP</div>
                </div>
                <div className="col-8 border rounded">
                    <InputBase type="text"/>
                    <IconButton className="float-end">
                        <SearchIcon className="icon" />
                    </IconButton>
                </div>
                <div className="col-2">
                    <IconButton className="float-end">
                        <AccountCircleIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Header;


