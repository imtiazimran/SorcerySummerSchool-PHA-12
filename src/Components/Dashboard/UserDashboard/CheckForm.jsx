/* eslint-disable react/prop-types */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Authorization/AuthProvider"
import axios from "axios";
import Swal from "sweetalert2";


const CheckOutForm = ({ cart, price }) => {
    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { user, loading } = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState()
    const [processing, setProcessing] = useState(false)
    const [transcationId, setTranscationId] = useState('')
    const accessToken = localStorage.getItem("access-token");

    useEffect(() => {
        if (price > 0) {
            axios  
            .post("http://localhost:4214/create-payment-intent", { price }, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                }
              })
              .then((res) => {
                setClientSecret(res.data.clientSecret);
              })
              .catch((error) => {
                console.error(error);
              });
          }
    }, [price, accessToken])

    if (loading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            setError(error)
        }
        if (paymentMethod) {
            console.log(paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous user",
                        email: user?.email || "email not found"
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }
        setProcessing(false)
        if (paymentIntent.status) {
            const transcationId = paymentIntent.id
            setTranscationId(transcationId)
            const payment = {
                email: user?.email,
                transcationId,
                quantity: cart.length,
                data: new Date(),
                price,
                cartItems: cart.map(item => item.classId),
                itemNames: cart.map(item => item.name)
            }
            axios.post('http://localhost:4214/payment', payment, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                  }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.result.insertedId) {
                        // display confirmation
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Success!',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                    }
                })
        }
    }

    return (
        <>
            <form className="w-1/3 mx-auto md:pt-5 bg-slate-100 p-3" onSubmit={handleSubmit}>
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
                <button className="mt-4 btn btn-secondary btn-sm" type="submit" disabled={!stripe || !clientSecret || processing || cart.length === 0}>
                    Pay
                </button>
            </form>
            <p className="text-rose-700 p-4">{error.message}</p>
            {transcationId &&
                <p className="text-green-700 p-3">Transaction Complite: ID - {transcationId}</p>

            }
        </>
    );
};

export default CheckOutForm;