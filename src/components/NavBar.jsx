import Tab from "./Tab";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";

function NavBar(props) {
    const categories = ["All", "Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]
    const [display, setDisplay] = useState(false);
    return (
        <div className="container">
            <h3 data-bs-toggle="collapse" data-bs-target="#cate"><center><button className="bg-dark rounded-pill p-2 text-white" onClick={() => setDisplay(!display)}>
                Categories{' '}
                {display ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowDropUpIcon />
                )}</button></center></h3>
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