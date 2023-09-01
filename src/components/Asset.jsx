import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Asset(props) {
    return (
        <a href="#" className="container mt-3">
            <div className="card">
                <div className="card-body">
                    <img className="card-img-top" alt="Not Available" />
                    <h3 className="card-title">Lorem</h3>
                    <h5 className="card-text font-italic font-weight-light">Lorem</h5>
                    <span className="card-text"><PersonIcon />Lorem ipsum</span>
                    <span className="card-text"><BookmarkIcon />Lorem ipsum</span>
                    <h4 className="card-text">Lorem, ipsum</h4>
                    <AddShoppingCartIcon onClick="#" />
                </div>
            </div>
        </a>
    )
}

export default Asset;