import React, { Fragment } from 'react';
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({item, deleteCartItem }) => {
    return <Fragment>
         <div className="CartItemCard">
             <img src={ item.image } alt="product_img" />
             <div>
                 <Link to = { `product/${item.product}`}>{item.name}</Link>
                 <span>{`Price: ₹${item.price}`}</span>
                 <p onClick = {() => deleteCartItem(item.product) }>Remove</p>
             </div>
         </div>
    </Fragment>;
}

export default CartItemCard;
