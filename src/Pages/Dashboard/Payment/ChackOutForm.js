import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const ChackOutForm = ({ booking }) => {

    const [clientSecret, setClientSecret] = React.useState("");
    const { price, patient, email } = booking;
    const [cardError, setCardError] = React.useState(null);

    const stripe = useStripe();
    const element = useElements();

    React.useEffect(() => {

        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setClientSecret(data.clientSecret)
            });
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !element) {
            return;
        }

        const card = element.getElement(CardElement);

        if (card === null) {
            // return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError(null);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-primary mt-4'
                    type="submit" disabled={!stripe || !clientSecret} >
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
        </>
    );
};

export default ChackOutForm;