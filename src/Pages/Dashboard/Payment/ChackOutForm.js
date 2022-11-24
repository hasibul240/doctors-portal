import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import React from 'react';
import toast from 'react-hot-toast';

const ChackOutForm = ({ booking }) => {

    const [clientSecret, setClientSecret] = React.useState("");
    const { price, patient, email, _id } = booking;

    const [cardError, setCardError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    const [transectionId, setTransectionId] = React.useState(null);

    const stripe = useStripe();
    const element = useElements();

    React.useEffect(() => {

        fetch("https://doctors-portal-server-two-phi.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
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
            // console.log(error);
            setCardError(error.message);
        } else {
            setCardError(null);
        }
        setSuccess(null);
        setProcessing(true);

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

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const payment = {
                price, transectionId: paymentIntent.id, email, bookingId: _id
            }

            fetch("https://doctors-portal-server-two-phi.vercel.app/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess("Payment Successful");
                        setTransectionId(paymentIntent.id)
                        toast.success("Payment Successful");
                    }
                })
        }
        setProcessing(false);
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
                    type="submit" disabled={!stripe || !clientSecret || processing} >
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transection id is: <span className='font-bold'>{transectionId}</span></p>
                </div>

            }
        </>
    );
};

export default ChackOutForm;