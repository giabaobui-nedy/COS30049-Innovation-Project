import React, { useState } from 'react';

function CheckoutButton(props) {
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Checkout');

    const handleCheckout = () => {
        // Simulate a loading state
        setIsLoading(true);
        props.checkout();
        // Simulate a successful checkout
        // In a real scenario, you would replace this with your checkout logic
        const success = true; // Set to true for success, false for failure

        setTimeout(() => {
            setIsLoading(false);
            if (success) {
                setButtonText('Success!');
                setCheckoutSuccess(true);

                // Optionally, you can add a delay and revert back to the original state
                setTimeout(() => {
                    setButtonText('Checkout');
                    setCheckoutSuccess(false);
                }, 2000); // Revert after 2 seconds (adjust as needed)
            } else {
                // Handle a failed checkout here
            }
        }, 2000);
    };
    
    // Determine the button's class based on the checkout success state
    return (
        <button className={(checkoutSuccess) ? 'btn btn-success' : 'btn btn-primary'} onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Loading...' : buttonText}
        </button>
    );
};

export default CheckoutButton;
