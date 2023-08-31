import DeleteIcon from '@mui/icons-material/Delete';


export default function ShoppingItem(imgsrc, id, name, price){
    return(
        <div className="container col-10" style="display:flex; justify-content: space-between; vertical-align: middle">
            <div className="col-5" style="height: 150px; display: inline-block; vertical-align: middle">
                <img src={imgsrc} alt="Not available" style="height: inherit; display: inline"/>
                <span>{name}</span>
                <span><i>#{id}</i></span>
            </div>
            <span className="col-2"><b>{price}</b></span>
            <div className="display:flex; justify-content: flex-end">
                <DeleteIcon onClick="#"/>
            </div>
        </div>
    )
}