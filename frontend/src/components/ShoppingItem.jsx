
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react"
import { IconButton } from '@mui/material';
import axios from 'axios';


function ShoppingItem(props) {
    const [bidAmount, setBidAmount] = useState(0); // State to store the bid amount

    const registerToBuy = () => {
        if (props.username !== props.item.itemOwner) {
            if (bidAmount > props.item.itemPrice) {
                const options = {
                    method: 'GET',
                    url: `http://127.0.0.1:8000/registerToBuy/${props.username}/${props.item.itemId}/${bidAmount}`,
                    headers: { accept: 'application/json' }
                }
    
                axios
                    .request(options)
                    .then(response => {
                        props.setResponse([response.data.result, "success"])
                        props.deleteItem()
                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                props.setResponse(["You cannot bid lower than the current price", "warning"])
            }
        } else {
            props.setResponse(["You cannot buy your own item", "danger"])
            props.deleteItem()
        }
    }

    return (
        <tr>
            {/* item description */}
            <td>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <img src={props.item.itemImg} alt={"Image for asset " + props.item.itemId} />
                        </div>
                        <div className="col-5">
                            <span>
                                <h4>{props.item.itemName}</h4> from <h5>{props.item.itemOwner}</h5>
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            {/* item price */}
            <td>
                <div>{props.item.itemPrice}</div>
            </td>
            {/* bidding item */}
            <td>
                <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter Bid Amount (WEI)"
                />
            </td>
            {/* buy item */}
            <td>
                <button className="btn btn-primary" onClick={registerToBuy}>
                    Request to buy this Item!
                </button>
            </td>
            {/* delete item from cart */}
            <td>
                <IconButton onClick={props.deleteItem}>
                    <DeleteIcon />
                </IconButton>
            </td>
        </tr>
    );
}


export default ShoppingItem;