
// import CheckoutButton from './CheckoutButton';
import { useState } from 'react';
import Logo from './Logo';
import ShoppingItem from './ShoppingItem';

function ShoppingCart(props) {
  const [response, setResponse] = useState(["", ""])
  return (
    <div className="container-fluid">
      <div className="logo_cont"><Logo size="50px" /></div>
      <div className="container">
        {response[0] !== "" 
        ?
        <div className={"alert alert-" + response[1]} role="alert">{response[0]}</div> 
        : <div/> }
        {
          props.cartItems.length === 0
            ? (
              <center className="h1">No Item in your cart!</center>
            )
            : (

              <table className="table">
                <thead>
                  <tr>
                    <th className="h4">Item description</th>
                    <th className="h4">Item Price</th>
                    <th className='h4'>Bidding amount</th>
                    <th className='h4'></th>
                    <th className='h4'></th>
                  </tr>
                </thead>
                <tbody>
                  {props.cartItems.map((item) => (
                    <ShoppingItem
                      key={item.itemId}
                      item={item}
                      username={props.username}
                      setResponse={setResponse}
                      deleteItem={() => {
                        props.setCartItems(
                          props.cartItems.length === 1
                            ? []
                            : props.cartItems.filter(
                              (eachItem) => eachItem.itemId !== item.itemId
                            )
                        );
                      }}
                    />
                  ))}
                </tbody>
              </table>
            )
        }
      </div>
    </div>
  );
}

export default ShoppingCart;