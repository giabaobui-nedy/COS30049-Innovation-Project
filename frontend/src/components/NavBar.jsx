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
            <button className="h-3 p-2 btn btn-outline-dark" data-bs-toggle="collapse" data-bs-target="#cate" onClick={() => setDisplay(!display)}>
                Categories{' '}
                {display ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}</button>
            <button
                className="h-3 p-2 btn btn-outline-dark price_btn"
                onClick={() => { props.changeSortOrder() }}>
                Price{' '}
                {props.sortByPrice ? (
                    <ArrowUpwardIcon />
                ) : (
                    <ArrowDownwardIcon />
                )}
            </button>
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