import React , {Fragment } from 'react';
import { Link } from "react-router-dom";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import { Typography } from  "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MetaData from "../layout/MetaData";

const Cart = ({ history }) => {
     
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);  
    
    const increasedQuantity = (id, quantity, stock)=>{
        const newQty = quantity+1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }

    const decreasedQuantity = (id, quantity)=>{
        const newQty = quantity-1;
        if(1 >= quantity){
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }

    const deleteCartItem = (id)=>{
        dispatch(removeItemFromCart(id));
    }

    const checkoutHandler = ()=>{
        history.push("/login?redirect=shipping");
    }
    return (
        <Fragment>
             <MetaData title = "Cart Details -- VE" />
            {cartItems.length === 0? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in your Cart</Typography>
                    <Link to = "/products">View Products </Link>
                </div>
            ):(
                <Fragment>
                    <MetaData title = "Cart Details -- VE" />
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>SubTotal</p>
            </div>

          { cartItems && cartItems.map((item)=>(
               <div className="cartContainer" key = {item.product}>
               <CartItemCard item = { item } deleteCartItem = { deleteCartItem } />
               <div className="cartInput">
                   <button onClick = { () => decreasedQuantity(item.product, item.quantity)} >-</button>
                   <input type="number" readOnly value= {item.quantity} />
                   <button onClick = { () => increasedQuantity(item.product, item.quantity, item.stock)}>+</button>
               </div>
               <p className="cartSubtotal">
                   {`₹${item.price * item.quantity}`}
               </p>
               </div>
          ))}
          <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                  <p>Gross Total</p>
                  { cartItems.reduce((acc,item)=> acc + item.quantity * item.price, 0)}
              </div>
              <div></div>
              <div className="checkoutBtn">
                  <button onClick = {checkoutHandler}>Check Out</button>
              </div>
          </div>
        </div>
    </Fragment>
            )}
        </Fragment>
    )
}

export default Cart;
