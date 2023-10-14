
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react"
import { IconButton } from '@mui/material';


function ShoppingItem(props) {
    const [bidAmount, setBidAmount] = useState(0); // State to store the bid amount

    const handleBidAmountChange = (event) => {
        setBidAmount(event.target.value);
    };

    const handleBidConfirmation = () => {
        // You can perform an action here when the user confirms the bid.
        // For example, you can call a function that handles the bidding process.
        // Pass the `bidAmount` and `props.item.itemId` to your bidding function.
    };

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
                <div>{props.price}</div>
            </td>
            {/* bidding item */}
            <td>
                <input
                    type="number"
                    value={bidAmount}
                    onChange={handleBidAmountChange}
                    placeholder="Enter Bid Amount (ETH)"
                    min="0"
                />
            </td>
            {/* buy item */}
            <td>
                <button onClick={handleBidConfirmation}>
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