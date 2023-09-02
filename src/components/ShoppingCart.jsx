import { useState } from 'react';
import CheckoutButton from './CheckoutButton';
import Logo from './Logo';
import ShoppingItem from './ShoppingItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function ShoppingCart(props) {
  const [ascending, setAscending] = useState(true);

  // Change the sort order
  const sortedCartItems = [...props.cartItems].sort((a, b) => {
    if (ascending) {
      return a.itemPrice - b.itemPrice;
    } else {
      return b.itemPrice - a.itemPrice;
    }
  });

  return (
    <div className="container-fluid">
      <div className="logo_cont"><Logo size="50px"/></div>
      <div className="container">
        {sortedCartItems.length === 0 ? (
          <center className="h1">No Item in your cart!</center>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="h4">Item description</th>
                <th className="h4">
                  <button
                    className="btn btn-outline-dark"
                    value={ascending}
                    onClick={() => setAscending(!ascending)}
                  >
                    Price{' '}
                    {ascending ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedCartItems.map((item) => (
                <ShoppingItem
                  key={item.itemId}
                  item={item}
                  price={item.itemPrice}
                  deleteItem={() => {
                    props.setCartItems(
                      sortedCartItems.length === 1
                        ? []
                        : sortedCartItems.filter(
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