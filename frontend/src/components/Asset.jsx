import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom';

function Asset(props) {

    const navigate = useNavigate()

    function addItem() {
        if (props.loggedIn.state) {
            props.addItemToCart(
                // if number of items is not 0
                (props.cartItems.length !== 0) ?
                    // check whether the item is yet in the cart and add if that is false
                    (props.cartItems.every(item => item.itemId !== props.assetTokenId) ?
                        [...props.cartItems, {
                            itemId: props.assetTokenId,
                            itemName: props.assetName,
                            itemOwner: props.assetOwner,
                            itemImg: props.assetUrl,
                            itemPrice: props.assetPrice
                        }]
                        // if it is true, update the array to the old one
                        : [...props.cartItems])
                    // else if the number of items is 0, add it directly
                    : [{
                        itemId: props.assetTokenId,
                        itemName: props.assetName,
                        itemOwner: props.assetOwner,
                        itemImg: props.assetUrl,
                        itemPrice: props.assetPrice
                    }]
            );
        } else {
            props.setNotif("Please sign-in before buying assets!")
            navigate("/user-dashboard")
        }
    }


    // enable filtering
    return (
        <div className="card m-2">
            <div className="card-body">
                <img src={props.assetUrl} className="card-img-top" alt="Not Available" />
                <h5 className="card-title"><i>{props.assetName}</i></h5>
                <h6 className="card-subtitle">Token ID: {props.assetTokenId}</h6>
                <div className="card-text"><PersonIcon />{props.assetOwner}</div>
                <div>Current Price: {props.assetPrice} WEI</div>
                <div className="badge text-bg-dark rounded-pill">{props.assetCategory}</div>
                <IconButton onClick={() => { addItem() }}>
                    <AddShoppingCartIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Asset;