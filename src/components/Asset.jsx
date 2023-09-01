import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton'


function Asset(props) {
    console.log(props);
    return (
        <div>
            <a href="/" className="container mt-3">
                <div className="card">
                    <div className="card-body">
                        <img src={props.nftInfo.media[0].thumbnail} className="card-img-top" alt="Not Available" />
                        <h3 className="card-title">props.nftInfo.title</h3>
                        {/* <h5 className="card-text font-italic font-weight-light">Lorem</h5> */}
                        <span className="card-text"><PersonIcon />props.nftInfo.contractMetadata.name</span>
                        <span className="card-text"><BookmarkIcon /></span>
                        <h4 className="card-text">Lorem, ipsum</h4>
                        <IconButton>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Asset;