import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';


function ShoppingItem(props) {
    return (
            <tr>
                <td>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                </td>
                <td>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <img src={props.item.itemImg} alt={"Image for nft " + props.item.itemId}/>
                            </div>
                            <div className="col-5">
                                <span><h4>NFT #00{props.item.itemId}</h4>from<h5>{props.item.itemDes}</h5></span>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div>rand</div>
                </td>
                <td>
                    <IconButton onClick={props.deleteItem}>
                        <DeleteIcon/>
                    </IconButton>
                </td>
            </tr>
    )
}

export default ShoppingItem;