import { useState } from "react";
import Asset from "./Asset";
import axios from 'axios';


function Main() {
    const categories = ["Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]
    try {
        
        const [apiData, setApiData] = useState([]);
        const options = {
            method: 'GET',
            url: 'https://eth-mainnet.g.alchemy.com/nft/v2/4FqEYbTNdy1Q26cPt48ybNLFZ1FgK3Sv/getNFTsForCollection',
            params: {
                collectionSlug: 'boredapeyachtclub',
                withMetadata: 'true'
            },
            headers: { accept: 'application/json' }
        };

        axios
            .request(options)
            .then(function (response) {
                setApiData(response.data.nfts)
            })
            .catch(function (error) {
                console.error(error);
            });

        return (
            <div className="container">
                {apiData.map((nft, index) => {
                    return <Asset key={index} id={"#00" + index} nftInfo={nft} category={categories[index % categories.length]} />
                })}
            </div>
        )
    } catch {
        return (
            <div className="container">
                Data not available
            </div>
        )
    }
}

export default Main;