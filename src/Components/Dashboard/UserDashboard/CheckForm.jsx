/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import { useState } from "react";
import useAxiosSecured from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Authorization/AuthProvider";


const CheckOutForm = ({ cart, price }) => {
    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecured()
    const [clientSecret, setClientSecret] = useState()
    const [processing, setProcessing] = useState(false)
    const [transcationId, setTranscationId] = useState('')

    useEffect(() => {
       if(price > 0){
        axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [price, axiosSecure])

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

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
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

          if(confirmError){
            console.log(confirmError)
          }
          setProcessing(false)
          if(paymentIntent.status === "succeeded"){
            const transcationId = paymentIntent.id
            setTranscationId(transcationId)
            const payment = {
                email: user?.email,
                transcationId,
                quantity: cart.length,
                data: new Date(),
                price,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemId),
                orderStatus: "service pending",
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payment', payment)
            .then(res =>{
                console.log(res)
                if(res.data.result.insertedId){
                    // display confirmation
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
                <Button className="mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </Button>
            </form>
            <p className="text-rose-700 p-4">{error.message}</p>
            {transcationId &&
                <p className="text-green-700 p-3">Transaction Complite: ID - {transcationId}</p>

            }
        </>
    );
};

export default CheckOutForm;