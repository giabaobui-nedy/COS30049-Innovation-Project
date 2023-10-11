
function Footer() {
    return (
        <div className="p-4 bg-dark m-1 rounded-3">
            <h4 className="text-center bg-light p-2 rounded fw-bold">Our group members</h4>
            <div className="row mt-3 text-center">
                <ul className="nav">
                    <li className="nav-item col-lg-4 col-md-6 col-sm-12">
                        <a className="nav-link fst-italic link_hover" href="mailto:103809077@student.swin.edu.au">Khanh Linh Nhi Ta</a>
                    </li>
                    <li className="nav-item col-lg-4 col-md-6 col-sm-12">
                        <a className="nav-link fst-italic link_hover" href="mailto:103533680@student.swin.edu.au">Gia Bao Bui</a>
                    </li>
                    <li className="nav-item col-lg-4 col-md-6 col-sm-12">
                        <a className="nav-link fst-italic link_hover" href="mailto:103843994@student.swin.edu.au">Khanh Duy Nguyen</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;