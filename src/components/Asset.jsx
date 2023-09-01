import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'


function Asset(props) {
    return (
        <div className="card m-2">
            <div className="card-body">
                <img src={props.nftInfo.media[0].thumbnail} className="card-img-top" alt="Not Available" />
                <h3 className="card-title">{props.nftInfo.title}</h3>
                <span className="card-text"><PersonIcon />{props.nftInfo.contractMetadata.name}</span>
                <div class="badge text-bg-dark">{props.category}</div>
                <IconButton>
                    <AddShoppingCartIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Asset;