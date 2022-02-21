import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/all";
import Product from  "./ProductCard.js"; 
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';


const Home = () => {
    const alert = useAlert()

    const dispatch = useDispatch();
   const { loading, error,  products} = useSelector((state)=>state.products);

    useEffect(() => {
         if(error){
              alert.error(error);
             dispatch(clearErrors());
         }
        dispatch(getProduct());
    }, [dispatch,error,alert]);

    return (
       <Fragment>
           {loading ? (<Loader/>) :(
               <Fragment>

               <MetaData title ={"Vogue-Emporium"}/>
        
                <div className="banner">
                        <h2>Welcome To</h2>
                        <h3>Vogue-Emporium</h3>
                    <h1>Where fashion meets people</h1>
                    <a href="#container">
                        <button>
                            Scroll<CgMouse />
        
                        </button>
                    </a>
                </div>
        
                <h4 className="homeHeading">Trending Products</h4>
        
                <div className="container" id="container">
                 {products && products.map((product)=><Product product={ product } />)}
                </div>
        
               </Fragment>
           ) }
       </Fragment>
    );
};

export default Home;
