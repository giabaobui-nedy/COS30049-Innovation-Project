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

    const [chosenCategory, setChosenCategory] = useState("All")

    const [apiData, setApiData] = useState([])

    const [searchInput, setSearchInput] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const [sortByPrice, setSortByPrice] = useState(true);

    //const [assets, setAssets] = useState([]);
    
    /*useEffect(() => {
        axios.get('http://127.0.0.1:8000/assets')
            .then(response => {
                setAssets(response.data);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
            });
    }, []);

    return (
        <div>
            <h2>All Assets</h2>
            <ul>
                {assets.map(asset => (
                    <li key={asset.tokenID}>
                        <p>Name: {asset.name}</p>
                        <p>Category: {asset.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
    */
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

        useEffect(() => {
            fetchApiData();
        }, [])

        const sortedData = [...apiData].sort((a, b) => {
            const priceA = randomPrices[shortenHexadecimal(a.id.tokenId)];
            const priceB = randomPrices[shortenHexadecimal(b.id.tokenId)];

            return sortByPrice ? priceA - priceB : priceB - priceA;
        });

        const changeSortOrder = () => {
            setSortByPrice(!sortByPrice);
        };

        return (
            <div className="container-fluid">
                <Header className="container-fluid" isSearching={isSearching} setIsSearching={setIsSearching} searchInput={searchInput} setSearchInput={setSearchInput} numberOfItems={props.cartItems.length} />
                <NavBar className="container" chosenCategory={chosenCategory} setChosenCategory={setChosenCategory} changeSortOrder={changeSortOrder} sortByPrice={sortByPrice} cartItems={props.cartItems} />
                <div className="assets_area container">
                    {
                        (!isSearching) ?
                            sortedData.map((nft) => {
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
                            sortedData.map((nft) => {
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