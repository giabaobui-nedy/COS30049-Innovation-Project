import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Asset from "./Asset";
import axios from 'axios';
import Footer from "./Footer";
import randomPrices from "../res/randomPrice";
import shortenHexadecimal from "../res/shortenHexadecimal";

function Main(props) {
    //categories for assets
    const categories = ["Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]

    //chosen category can be modified
    const [chosenCategory, setChosenCategory] = useState("All")

    const [apiData, setApiData] = useState([])

    //search input  (initial value = "")
    const [searchInput, setSearchInput] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const fetchApiData = () => {
        //fetch data from alchemy
        const options = {
            method: 'GET',
            url: 'https://eth-mainnet.g.alchemy.com/nft/v2/4FqEYbTNdy1Q26cPt48ybNLFZ1FgK3Sv/getNFTsForCollection',
            params: {
                collectionSlug: 'boredapeyachtclub',
                withMetadata: 'true'
            },
            headers: { accept: 'application/json' }
        }

        axios
            .request(options)
            .then(function (response) {
                setApiData(response.data.nfts)
            })
            .catch(function (error) {
                console.error(error)
            });
    }

    try {

        //render the API data once
        useEffect(() => {
            fetchApiData();
        }, [])

        return (
            <div className="container-fluid">
                <Header isSearching={isSearching} setIsSearching={setIsSearching} searchInput={searchInput} setSearchInput={setSearchInput} numberOfItems={props.cartItems.length} />
                <NavBar chosenCategory={chosenCategory} setChosenCategory={setChosenCategory} />
                <div className="container assets_area">
                    {
                        (!isSearching) ?
                            apiData.map((nft) => {
                                return <Asset
                                    price={randomPrices[shortenHexadecimal(nft.id.tokenId)]}
                                    cartItems={props.cartItems}
                                    addItemToCart={props.addItemToCart}
                                    isChosen={(chosenCategory === categories[shortenHexadecimal(nft.id.tokenId) % categories.length]) || (chosenCategory === "All")}
                                    key={shortenHexadecimal(nft.id.tokenId)}
                                    id={shortenHexadecimal(nft.id.tokenId)}
                                    nftInfo={nft}
                                    category={categories[shortenHexadecimal(nft.id.tokenId) % categories.length]} />
                            }) :
                            (!isNaN(parseInt(searchInput))) &&
                            apiData.map((nft) => {
                                return <Asset
                                    price={randomPrices[shortenHexadecimal(nft.id.tokenId)]}
                                    cartItems={props.cartItems}
                                    addItemToCart={props.addItemToCart}
                                    isChosen={((chosenCategory === categories[shortenHexadecimal(nft.id.tokenId) % categories.length]) || (chosenCategory === "All")) && (shortenHexadecimal(nft.id.tokenId) === parseInt(searchInput))}
                                    key={shortenHexadecimal(nft.id.tokenId)}
                                    id={shortenHexadecimal(nft.id.tokenId)}
                                    nftInfo={nft}
                                    category={categories[shortenHexadecimal(nft.id.tokenId) % categories.length]} />
                            })
                    }
                </div>
                <Footer />
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