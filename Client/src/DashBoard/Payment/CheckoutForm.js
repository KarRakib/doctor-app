import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const { price, email, client, _id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctor-server-zeta.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: client,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log('paymentIntent',paymentIntent);
        if(paymentIntent.status === "succeeded"){
            setSuccess('Congregation Your Payment SuccessFull')
            setTransactionId(paymentIntent.id)
        }
        setProcessing(false)
        // if (paymentIntent.status === "succeeded") {
        //     console.log('card info', card);
        //     // store payment info in the database
        //     const payment = {
        //         price,
        //         transactionId: paymentIntent.id,
        //         email,
        //         bookingId: _id
        //     }
        //     fetch('https://doctor-server-zeta.vercel.app/payments', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json',
        //             authorization: `bearer ${localStorage.getItem('accessToken')}`
        //         },
        //         body: JSON.stringify(payment)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data);
        //             if (data.insertedId) {
        //                 setSuccess('Congrats! your payment completed');
        //                 setTransactionId(paymentIntent.id);
        //             }
        //         })
        // }
        // setProcessing(false);


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
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || processing }>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
               <> 
               <p className="text-blue-500">{success} </p>
               <p className="text-blue-300">{transactionId} </p>
               </>
            }
        </>
    );
};

export default CheckoutForm;

//|| !clientSecret || processing