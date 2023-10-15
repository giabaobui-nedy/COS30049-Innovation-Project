import { useEffect, useState } from "react";
import NavigationalBar from "./NavigationalBar";
import FilterComponent from "./FilterComponent";
import Asset from "./Asset";
import axios from 'axios';
import Footer from "./Footer";

function Main(props) {
    const [chosenCategory, setChosenCategory] = useState("All")
    const [apiData, setApiData] = useState([])

    // get all assets
    const getAllAssets = async () => {
        console.log("Get All Assets From Main()")

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

    useEffect(() => {
        getAllAssets();
    }, []);

    return (
        <div className="container-fluid">
            <NavigationalBar className="container-fluid" getAllAssets={getAllAssets} setApiData={setApiData} numberOfItems={props.cartItems.length} />
            <FilterComponent className="container" getAllAssets={getAllAssets} apiData={apiData} setApiData={setApiData}/>
            <div className="assets_area container">
                {
                    apiData.map((asset) => {
                        return <Asset
                            cartItems={props.cartItems}
                            addItemToCart={props.addItemToCart}
                            isChosen={(chosenCategory === asset.category) || (chosenCategory === "All")}
                            key={asset.tokenID}
                            assetTokenId={asset.tokenID}
                            assetName={asset.name}
                            assetCategory={asset.category}
                            assetPrice={asset.price}
                            assetDescription={asset.description}
                            assetOwner={asset.currentOwner}
                            assetAddress={asset.contractAddress}
                            assetUrl={asset.imgUrl}
                            loggedIn={props.loggedIn}
                            setNotif={props.setNotif}
                        />
                    })
                }
            </div>
            <Footer className="container-fluid" />
        </div>
    )

}

export default Main;