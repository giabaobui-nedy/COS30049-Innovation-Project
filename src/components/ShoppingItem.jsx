import DeleteIcon from '@mui/icons-material/Delete';


function ShoppingItem(props) {
    return (
        <div>
            <div className="container col-10">
                <div className="col-5">
                    <img src={imgsrc} alt="Not available"/>
                    <span>{name}</span>
                    <span><i>#{id}</i></span>
                </div>
                <span className="col-2"><b>{price}</b></span>
                <div>
                    <DeleteIcon onClick="#" />
                </div>
            </div>
        </div>
    );
}

export default ShoppingItem;