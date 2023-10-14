import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Asset from "./Asset";
import axios from 'axios';
import Footer from "./Footer";

function Main(props) {

    const [chosenCategory, setChosenCategory] = useState("All")

    const [apiData, setApiData] = useState([])

    const [searchInput, setSearchInput] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const [sortByPrice, setSortByPrice] = useState(true);


    const[loggedIn, setLoggedIn] = useState({
        state: false,
        currentLoggedIn: ""
    })
    
    const fetchApiData = () => {
        // fetch data from the local server
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8000/getAllAssets',
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(response => {
                // console.log(response.data)
                setApiData(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }

    try {
        useEffect(() => {
            fetchApiData();
        }, [])

        const sortedData = [...apiData].sort((a, b) => {
            return sortByPrice ? a.price - b.price : b.price - a.price
        });

        const changeSortOrder = () => {
            setSortByPrice(!sortByPrice);
        };

        return (
            <div className="container-fluid">
                <Header className="container-fluid" loggedIn = {loggedIn} setLoggedIn={setLoggedIn} isSearching={isSearching} setIsSearching={setIsSearching} searchInput={searchInput} setSearchInput={setSearchInput} numberOfItems={props.cartItems.length} />
                <NavBar className="container" loggedIn = {loggedIn} setLoggedIn={setLoggedIn} chosenCategory={chosenCategory} setChosenCategory={setChosenCategory} changeSortOrder={changeSortOrder} sortByPrice={sortByPrice} cartItems={props.cartItems} />
                <div className="assets_area container">
                    {
                        sortedData.map((asset) => {
                            return <Asset
                                cartItems={props.cartItems}
                                addItemToCart={props.addItemToCart}
                                isChosen={(chosenCategory === asset.category) || (chosenCategory === "All")}
                                key={asset.tokenId}
                                assetTokenId={asset.tokenID}
                                assetName={asset.name}
                                assetCategory={asset.category}
                                assetPrice={asset.price}
                                assetDescription={asset.description}
                                assetOwner={asset.currentOwner}
                                assetAddress={asset.contractAddress}
                                assetUrl={asset.imgUrl} />
                        })
                    }
                </div>
                <Footer className="container-fluid" />
            </div>
        )
    } catch {
        return (
            <div className="container">
                No data available!
            </div>
        )
    }
}

export default Main;