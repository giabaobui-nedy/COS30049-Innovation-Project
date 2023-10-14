import Tab from "./Tab";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function NavBar(props) {
    const categories = ["All", "Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]
    const [display, setDisplay] = useState(false);

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <button className="h-3 p-2 btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#cate" onClick={() => setDisplay(!display)}>
                    Categories{' '}
                    {display ? (
                        <ArrowDropDownIcon />
                    ) : (
                        <ArrowDropUpIcon />
                    )}</button>
                <div className="btn-group">
                    <button
                        className="h-3 p-2 btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Sort By
                    </button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item btn" onClick={() => props.changeSortOrder("priceUp")}>
                            Price <ArrowUpwardIcon />
                        </li>
                        <li className="dropdown-item btn" onClick={() => props.changeSortOrder("priceDown")}>
                            Price <ArrowDownwardIcon />
                        </li>
                        <li className="dropdown-item btn" onClick={() => props.changeSortOrder("name")}>
                            Alphabetical order
                        </li>
                    </ul>
                </div>
            </div>
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