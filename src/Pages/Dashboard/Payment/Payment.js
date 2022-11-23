import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ChackOutForm from './ChackOutForm';


const stripePromise = loadStripe(process.env.REACT_APP__Stripe_Pk);

const Payment = () => {

    const data = useLoaderData();
    const { treatment, price, appointmentDate, slot } = data;
    
    return (
        <div>
            <h2 className='text-3xl'>Payment for {treatment}</h2>
            <p>Please pay ${price} for your apoinment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <ChackOutForm booking={data} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;