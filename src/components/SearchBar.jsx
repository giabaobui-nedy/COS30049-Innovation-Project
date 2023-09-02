import { InputBase, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

    return (
        <span>
            <InputBase 
            onChange={(e) => 
            {
                props.setSearchInput(e.target.value);
                (e.target.value === "") && props.setIsSearching(false);
            }
            } value={props.searchInput} type="text" placeholder="Search">
            </InputBase>
            <IconButton onClick={() => {(props.searchInput!== "") && props.setIsSearching(true)}} className="float-end">
                <SearchIcon />
            </IconButton>
        </span>
    )
}

export default SearchBar