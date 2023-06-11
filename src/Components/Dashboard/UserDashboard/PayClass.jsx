
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from './../../Hooks/useCart';
import CheckOutForm from './CheckForm';

// TODO:  add pk link
const stripePromise = loadStripe(import.meta.env.VITE_payment_pk)
const PayClass = () => {
    const [isLoading, isError, cart, error] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = Math.round(total);
    console.log(total)

    if (isLoading) {
        return <div className='w-full  h-screen  flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (isError) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='w-full'>
        <div>You are paying {price}</div>
            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={price}></CheckOutForm>
            </Elements>

        </div>
    );
};

export default PayClass;