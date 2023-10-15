// import React, { useState } from 'react';

// // not used in assignment 2
// function CheckoutButton(props) {
//     const [checkoutSuccess, setCheckoutSuccess] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [buttonText, setButtonText] = useState('Checkout');

//     const handleCheckout = () => {
//         // Simulate a loading state
//         setIsLoading(true);
//         // Delete all the cart items
//         props.checkout();
//         // Simulate a successful checkout
//         const success = true;
//         setTimeout(() => {
//             setIsLoading(false);
//             if (success) {
//                 setButtonText('Success!');
//                 setCheckoutSuccess(true);
//                 // Optionally, you can add a delay and revert back to the original state
//                 setTimeout(() => {
//                     setButtonText('Checkout');
//                     setCheckoutSuccess(false);
//                 }, 2000); // Revert after 2 seconds (adjust as needed)
//             } else {
//                 // Handle a failed checkout here
//             }
//         }, 2000);
//     };

//     return (
//         <button
//             className={(checkoutSuccess) ? 'btn btn-success ' : 'btn btn-primary checkout_btn'}
//             onClick={handleCheckout}
//             disabled={isLoading}>
//             {isLoading ? 'Loading...' : buttonText}
//         </button>
//     );
// };

// export default CheckoutButton;
