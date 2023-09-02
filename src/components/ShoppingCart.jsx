import Logo from "./Logo"
import ShoppingItem from "./ShoppingItem"

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
                    {
                        props.cartItems.map((item) => {
                            return <ShoppingItem key={item.itemId} item={item} price={item.itemPrice}
                            deleteItem={() => 
                                {
                                    props.setCartItems(props.cartItems.length === 1 ?
                                    []:
                                    props.cartItems.filter((eachItem) => { return eachItem.itemId !== item.itemId}))
                                }}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShoppingCart
