import Tab from "./Tab";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function NavBar(props) {
    const categories = ["All", "Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]
    const [display, setDisplay] = useState(false);
    const [menuItem, setMenuItem] = useState(null);

    const handleMenuClick = (event) => {
        setMenuItem(event.currentTarget);
    };

    const handleMenuItemClick = (sortingOption) => {
        setMenuItem(null);
        props.changeSortOrder(sortingOption);
    };

    const handleClose = () => {
        setMenuItem(null);
    };
    return (
        <div className="container">
            <button className="h-3 p-2 btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#cate" onClick={() => setDisplay(!display)}>
                Categories{' '}
                {display ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}</button>
            <Button
                className="h-3 p-2 btn btn-outline-dark price_btn"
                aria-controls="sort-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
            >
                Price <ArrowDropDownIcon />
            </Button>
            <Menu
                id="sort-menu"
                menuItem={menuItem}
                keepMounted
                open={Boolean(menuItem)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleMenuItemClick("priceUp")}>
                    Price <ArrowUpwardIcon />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("priceDown")}>
                    Price <ArrowDownwardIcon />
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("name")}>
                    Name
                </MenuItem>
            </Menu>
            <center className="collapse" id="cate">
                <hr></hr>
                {categories.map(category => {
                    return <Tab setChosenCategory={props.setChosenCategory} isChosen={props.chosenCategory === category} key={category} category={category} />
                })}
            </center>
        </div>
    )
}

export default NavBar;