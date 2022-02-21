import React from 'react';
import "./sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from  "@material-ui/icons/PostAdd";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from '@material-ui/icons/Dashboard';
import RateReviewIcon from "@material-ui/icons/RateReview";




const Sidebar = () => {
    return (
       <div className="sidebar"> 
           <Link to = "/admin/dashboard">
               <p>
                   <DashboardIcon/> Dashboard
               </p>
           </Link>     
            <Link to="/admin/products">
                    <p>
                    <PostAddIcon /> All Products
                    </p>
             </Link>
                          
                         {/* <Link to="/admin/product">
                             <TreeItem nodeId = "3" label = "Create" icon={<AddIcon />}></TreeItem>
                         </Link> */}

           <Link to = "/admin/orders">
               <p>
                   <ListAltIcon/>
                   Orders
               </p>
           </Link>
           <Link to ="/admin/users">
               <p>
                   <PeopleIcon/>
                   Users 
               </p>
           </Link>
           <Link to ="/admin/reviews">
                <p> 
                <RateReviewIcon/>
                 Reviews
                 </p>
           </Link>
       </div>
    )
}

export default Sidebar;
