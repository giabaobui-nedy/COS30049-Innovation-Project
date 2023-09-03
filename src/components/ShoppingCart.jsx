import { useState } from 'react';
import CheckoutButton from './CheckoutButton';
import Logo from './Logo';
import ShoppingItem from './ShoppingItem';

function ShoppingCart(props) {

  return (
    <div className="container-fluid">
      <div className="logo_cont"><Logo size="50px"/></div>
      <div className="container">
        {props.cartItems.length === 0 ? (
          <center className="h1">No Item in your cart!</center>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="h4">Item description</th>
                <th className="h4">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.cartItems.map((item) => (
                <ShoppingItem
                  key={item.itemId}
                  item={item}
                  price={item.itemPrice}
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
        )}
        <center><CheckoutButton checkout={() => { props.setCartItems([]) }} /></center>
      </div>
    </div>
  );
}

export default ShoppingCart;