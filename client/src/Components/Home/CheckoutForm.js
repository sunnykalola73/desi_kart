import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';


const CheckoutForm = (props) => {
    // const successPayment = data => {
    //     alert('Payment Successful');
    // };

    // const errorPayment = data => {
    //     alert('Payment Error');
    // };
    const navigate = useNavigate();
    const onToken = (amt) => token => {

        let cartData = []
        props.cart.forEach(item => {
            cartData.push({ productID: item._id, quantity: item.count, price: item.price })
        });
        let userData = JSON.parse(localStorage.getItem("userData"));
        let req = {
            products: cartData,
            totalamount: amt,
            card_tok_id: token.id
        }
        let config = {
            headers: {
                Authorization: "Bearer " + userData.token,
            },
        };
        axios
            .post("http://localhost:3001/order/place-order", req, config)
            .then((response) => {

                if (response.status === 201) {
                    NotificationManager.success("Your order has been placed!");
                    localStorage.removeItem("CartData");
                    navigate("/")
                }
            })
            .catch((emsg) => {
                console.log("Error in placing your order");
            });
    }

    const handleLoginButton = () => {
        localStorage.setItem("fromCart", true)
    }

    return (<>{
        localStorage.getItem("userData") ? <StripeCheckout
            token={onToken(props.amount)}
            stripeKey="pk_test_51MovUaFfBNsel5oD2T1lZvoisrG26ZPTFgbUPqSdvaWEJTNfJEuCoaHxPh8YRvoT5maHX5fo36xVpoW1LeTuRByF00y8ohV6zC"
            amount={props.amount * 100}
            currency={"CAD"}
        /> : <Link to="/login" className='btn btn-primary' onClick={handleLoginButton}>Login to Checkout</Link>}</>)
}

export default CheckoutForm;