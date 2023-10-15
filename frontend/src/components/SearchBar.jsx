import { IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useState } from "react";

function SearchBar(props) {
    const [searchInput, setSearchInput] = useState("")

    // get all assets by search
    const getAssetsBySearch = () => {
        const options = {
            method: 'GET',
            url: `http://127.0.0.1:8000/getAllAssets/search/${searchInput}`,
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                // console.log(response.data)
                props.setApiData(response.data)
            })
            .catch(error => {
                console.error(error)
            });

    }

    return (
        <form className="d-inline-flex container-fluid rounded-pill bg-white p-2 col-10">
            <input
                className="form-control me-2 border-0"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                    (e.target.value === "") && props.getAllAssets();
                }}
                value={searchInput}
                type="text"
                placeholder="Search by name..."
            />
            <IconButton type="button" className="rounded-pill bg-danger text-white"
                onClick={() => { (searchInput !== "") && getAssetsBySearch() }}>
                <SearchIcon />
            </IconButton>
        </form>
    )
}

export default SearchBar