import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'

function Asset(props) {
    

    function addItem() {
        props.addItemToCart(
            //if number of items is not 0
            (props.cartItems.length !== 0) ? 
            //check whether the item is yet in the cart and add if that is false
            ((props.cartItems.every(item => { return item.itemId !== props.id }))?
            [...props.cartItems, { 
                itemId: props.assetTokenId, 
                itemDes: props.assetDescription, 
                itemImg: props.assetUrl,
                itemPrice: props.assetPrice
             }]
            //if it is true, update the array to the old one
            : [...props.cartItems])
            //else if the number of items is 0, add it directly
            : [{ 
                itemId: props.assetTokenId, 
                itemDes: props.assetDescription, 
                itemImg: props.assetUrl,
                itemPrice: props.assetPrice
             }]
        )  
    }

    //enable filtering
    return (props.isChosen &&
        <div className="card m-2">
            <div className="card-body">
                <img src={props.assetUrl} className="card-img-top" alt="Not Available" />
                <h5 className="card-title"><i>{props.assetName + props.assetTokenId}</i></h5>
                <div className="card-text"><PersonIcon />{props.assetOwner}</div>
                <div>{props.assetPrice} Wei</div>
                <div className="badge text-bg-dark rounded-pill">{props.assetCategory}</div>
                <IconButton onClick={addItem}>
                    <AddShoppingCartIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Asset;