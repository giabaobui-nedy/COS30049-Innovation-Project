import DeleteIcon from '@mui/icons-material/Delete';


export default function ShoppingItem(imgsrc, id, name, price){
    return(
        <div className="container col-10">
            <div className="col-5">
                <img src={imgsrc} alt="Not available"/>
                <span>{name}</span>
                <span><i>#{id}</i></span>
            </div>
            <span className="col-2"><b>{price}</b></span>
            <div>
                <DeleteIcon onClick="#"/>
            </div>
        </div>
    )
}