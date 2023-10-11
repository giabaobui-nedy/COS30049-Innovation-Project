import { IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

    return (
        <form className="d-inline-flex container-fluid rounded-pill bg-white p-2 col-10">
            
                <input
                    className="form-control me-2 border-0"
                    onChange={(e) => {
                        props.setSearchInput(e.target.value);
                        (e.target.value === "") && props.setIsSearching(false);
                    }}
                    value={props.searchInput}
                    type="text"
                    placeholder="Search by Token ID..."
                />
                <IconButton className="rounded-pill bg-danger text-white" onClick={() => { (props.searchInput !== "") && props.setIsSearching(true) }}>
                    <SearchIcon/>
                </IconButton>
            
        </form>

    )
}

export default SearchBar