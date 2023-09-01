import Asset from "./Asset";
import axios from 'axios';



function Main() {
    var nfts = []
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
            nfts = response.data.nfts
            console.log(nfts);
        })
        .catch(function (error) {
            console.error(error);
        });

        
    return (
        <div className="container">
            {nfts.map(nft => {
                return <Asset nftInfo={nft} />
            })}
        </div>
    )
}

export default Main;