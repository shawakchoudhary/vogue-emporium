import React, {Fragment, useEffect, useRef} from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
// import axios from 'axios';
import "./Payment.css";
import AddCardIcon from '@material-ui/icons/CardMembership';
import KeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import { clearErrors, createOrder } from '../../actions/orderAction';

const Payment = ({ history }) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const alert = useAlert();
    // const stripe = useStripe();
    // const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems  } = useSelector((state)=> state.cart);
    // const { user } = useSelector((state)=>state.user);
    const { error } =  useSelector((state)=> state.newOrder);

    // const [cardNumber, setName ] = useState(0);
    // const [expriyDate, setdate] = useState("");
    // const [cvv, setCVV] = useState(0);
    

    // const paymentData = {
    //     amount : Math.round(orderInfo.totalPrice * 100),
    // };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

     
    

    const submitHandler = async(e)=>{
        e.preventDefault();
        payBtn.current.disabled = true;
            //  const { data } = await axios.post("/api/v1/payment/process", paymentData,config);
            order.paymentInfo = {
                status: "succeeded",
              };
                     dispatch(createOrder(order));
                     history.push("/success");
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
       
    }, [dispatch, error, alert]);

    
    return (
        <Fragment>
            <MetaData title= "Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit = {(e)=> submitHandler(e)}>
                    <Typography>Card Details</Typography>
                    
                    <div>
              <AddCardIcon />
              <input    
               type="number" name="card-num" placeholder="0000 0000 0000 0000" minlength="16" maxlength="16"
                required 
              />
            </div>

            <div>
              < EventIcon />
              <input
               type="month" id="start" name="start"
              min="2018-03" value="2018-05"
                placeholder="Expiry Date"
                required
              />
            </div>

            <div>
              <KeyIcon />
              <input
                type="number"
                placeholder="CVV" minlength="3" maxlength="3"
                required
              />
            </div>
                    <input
                    type="submit"
                    value={`Pay -  ₹${orderInfo && orderInfo.totalPrice}`}
                    ref = {payBtn} 
                    className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment
