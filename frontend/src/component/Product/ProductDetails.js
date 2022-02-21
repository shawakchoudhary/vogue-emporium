import React, {Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview} from '../../actions/productAction.js';
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent,DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstant.js';


// Gives Product details( )
const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product ,loading, error} = useSelector((state)=>state.productDetails);
    const {success, error: reviewError} = useSelector(state => state.newReview)

       const [quantity, setQuantity] = useState(1);
       const [open, setOpen] = useState(false);
       const [rating, setRating] = useState(0);
       const [comment, setComment] = useState("");

       //To increase quantity
       const increaseQuantity = () => {
         if(product.stock <= quantity) return;

        const qty = quantity+1;
        setQuantity(qty);     
       };

        // to decrease quantity
       const decreaseQuantity = ()=>{ 
        if(1 >= quantity) return;
        const qty = quantity-1;
        setQuantity(qty);  
       };  
       
       // execute addItemToCart Function when clicked on Add to cart
       const addToCartHandler = ()=>{
         dispatch(addItemToCart(match.params.id, quantity ));
         alert.success("Item Added Successfully to cart");
       }

       const submitReviewToggle = ()=>{
         open ? setOpen(false) : setOpen(true);
       }

       const reviewSubmitHandler=()=>{
         const myForm = new FormData();

         myForm.set("rating", rating);
         myForm.set("comment",comment);
         myForm.set("productId", match.params.id);

         dispatch(newReview(myForm));
            setOpen(false);
       
       }

    useEffect(() => {
      if(error){
       alert.error(error);
       dispatch(clearErrors());
      }
      if(reviewError){
        alert.error(reviewError);
        dispatch(clearErrors());
       }

       if(success){
        alert.success("review Submitted Successfully");
        dispatch({type: NEW_REVIEW_RESET});
       }
       dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id, error, alert,success, reviewError]);

    const options = {
        size: "medium",
        value: product.ratings,
        readOnly: true,
        precision:  0.5 }
    return (
       <Fragment>
         {loading ? <Loader />  :(
            <Fragment>
           <MetaData  title ={`${product.name}  -- VE`} />

            <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

             <div>
                 <div className="detailsBlock-1">
                     <h2>{product.name}</h2>
                     <p>Product # {product._id} </p>
                 </div>

                 <div className="detailsBlock-2">
                     <Rating {...options}/>
                     <span>({product.numberOfReviews} Reviews)</span>
                 </div>

                 <div className="detailsBlock-3">
                     <h1>{`₹${product.price}`}</h1>
                     <div className="detailsBlock-3-1">
                     <div className="detailsBlock-3-1-1">
                        <button onClick = {decreaseQuantity}>-</button>
                        <input readOnly type="number" value ={quantity} />
                        <button onClick = {increaseQuantity} >+</button>
                     </div>
                     <button disabled = { product.stock < 1 ? true : false} onClick = { addToCartHandler }>Add To Cart</button>
                    </div>
                    <p>
                        Status: 
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                         {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                 </div>
                 <div className="detailsBlock-4">
                 Description : <p>{product.description}</p>
                 </div>
                 <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
             </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

             <Dialog
               aria-labelledby="simple-dialog-title"
               open={open}
               onClose={submitReviewToggle}
             >
              <DialogTitle>
                Submit Review
              </DialogTitle>
              <DialogContent className ="submitDialog">
                   <Rating 
                   onChange={(e)=>setRating(e.target.value)}
                   value = {rating}
                   size="large"
                  />

                  <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
              </DialogContent>
               <DialogActions>
                 <Button onClick={submitReviewToggle} color = "secondary">Cancel</Button>
                 <Button onClick = {reviewSubmitHandler} color = "primary">Submit</Button>
               </DialogActions>
             </Dialog>

            { product.reviews && product.reviews[0] ? (
                  <div className="reviews">
                    {product.reviews && product.reviews.map((review) => <ReviewCard review = {review}/>)}
                  </div>
            ): (
              <p className="noReviews">No review yet</p>
            )}
        </Fragment>
         )}
       </Fragment>
    );
};

export default ProductDetails;
