import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Asset(props) {
    if (createBy != null) {
        return (
            <a href="#" className="container mt-3 col-3">
                <div className="card">
                    <div className="card-body">
                        <img className="card-img-top" src={imgsrc} alt="Not Available" />
                        <h3 className="card-title">{name}</h3>
                        <h5 className="card-text font-italic font-weight-light">#{ID}</h5>
                        <span className="card-text"><PersonIcon /> Created by {Creator}</span>
                        <span className="card-text"><BookmarkIcon /> {cate}</span>
                        <h4 className="card-text">AU${price}</h4>
                        <AddShoppingCartIcon onClick="#" />
                    </div>
                </div>
            </a>
        )
    } else {
        return (
            <a href="#" className="container mt-3 col-3">
                <div className="card">
                    <div className="card-body">
                        <img className="card-img-top" src={imgsrc} alt="Not Available"  />
                        <h3 className="card-title">{name}</h3>
                        <h5 className="card-text font-italic font-weight-light">#{ID}</h5>
                        <span className="card-text"><BookmarkIcon /> {cate}</span>
                        <h4 className="card-text">AU${price}</h4>
                        <AddShoppingCartIcon onClick="#" />
                    </div>
                </div>
            </a>
        )
    }
}

export default Asset;