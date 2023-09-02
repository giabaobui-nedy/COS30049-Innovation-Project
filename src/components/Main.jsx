import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import Asset from "./Asset";
import axios from 'axios';
import Footer from "./Footer";


function Main() {
    //categories for assets
    const categories = ["Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]

    const [chosenCategory, setChosenCategory] = useState("All")

    const [apiData, setApiData] = useState([]);

    try {
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

        return (
            <div className="container">
                <Header/>
                <NavBar chosenCategory={chosenCategory} setChosenCategory={setChosenCategory}></NavBar>
                {apiData.map((nft, index) => {
                    return <Asset isChosen={(chosenCategory === categories[index % categories.length]) || (chosenCategory === "All")} key={index} id={"#00" + index} nftInfo={nft} category={categories[index % categories.length]} />
                })}
                <Footer/>
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