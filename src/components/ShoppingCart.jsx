import Logo from "./Logo"

function ShoppingCart(props){
    return(
        <div className="container">
            <Logo/>
            <div>Shopping Cart:</div>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item description</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShoppingCart
