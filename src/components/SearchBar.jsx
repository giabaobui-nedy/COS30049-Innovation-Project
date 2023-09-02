import { IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

    return (
        <form className="d-inline-flex container-fluid col-9">
            <input 
            className="form-control me-2" 
            onChange={(e) => {
                props.setSearchInput(e.target.value);
                (e.target.value === "") && props.setIsSearching(false);
            }} value={props.searchInput} type="text" placeholder="Search">
            </input>
            <IconButton onClick={() => { (props.searchInput !== "") && props.setIsSearching(true) }} className="float-end text-white border border-2 border-white">
                <SearchIcon />
            </IconButton>
        </form>
    )
}

export default SearchBar