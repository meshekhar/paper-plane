import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H9u3WGK35e2OwlWeWCfe3esLVoJw2VOGZx5TZ1Qtc2jIuH3tEgwTjzjOqKX7XMtBVGoCtWG8GO2P4dZs29bZ0QR005h5qpROO'

    const onToken = totken => {
        console.log(totken)
        alert('Payment was successful ;)')
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='Cloud9 Clothing Inc.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};



export default StripeCheckoutButton;
