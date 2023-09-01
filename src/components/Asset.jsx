import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'


function Asset(props) {
    return (
        <div className="card m-2">
            <div className="card-body">
                <img src={props.nftInfo.media[0].thumbnail} className="card-img-top" alt="Not Available" />
                <h5 className="card-title"><i>{props.nftInfo.title + props.id}</i></h5>
                <div className="card-text"><PersonIcon />{props.nftInfo.contractMetadata.name}</div>
                <div class="badge text-bg-dark">{props.category}</div>
                <IconButton>
                    <AddShoppingCartIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Asset;