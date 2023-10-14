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

    const [sortByPrice, setSortByPrice] = useState(true)

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
                setApiData(response.data)
            })
            .catch(error => {
                console.error(error)
            });

    }


    const getAllAssets = () => {fetchApiData()}
    
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
            getAllAssets();
        }, [])

        const sortedData = [...apiData].sort((a, b) => {
            return sortByPrice ? a.price - b.price : b.price - a.price
        });

        const changeSortOrder = () => {
            setSortByPrice(!sortByPrice);
        };

        return (
            <div className="container-fluid">
                <Header isLoggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} className="container-fluid" getAssetsBySearch={getAssetsBySearch} getAllAssets={getAllAssets} searchInput={searchInput} setSearchInput={setSearchInput} numberOfItems={props.cartItems.length} />
                <NavBar className="container" chosenCategory={chosenCategory} setChosenCategory={setChosenCategory} changeSortOrder={changeSortOrder} sortByPrice={sortByPrice} cartItems={props.cartItems} />
                <div className="assets_area container">
                    {
                        apiData.map((asset) => {
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