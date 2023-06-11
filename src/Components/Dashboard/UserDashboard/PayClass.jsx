
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../Hooks/UseCart';
import CheckOutForm from './CheckForm';

// TODO:  add pk link
const stripePromise = loadStripe(import.meta.env.VITE_payment_pk)
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    return (
        <div className='w-full'>
            <SectionTitle subTitle={"Proceed to payment"} sectionTitle={"payment"}></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={price}></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;