import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import "./dashboard.css";
import Sidebar from "./Sidebar.js";   // used for options showen on left side
import {Doughnut, Line } from "react-chartjs-2"; // used for making  line chart and doughnut chart
import {useSelector, useDispatch} from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";


const Dashboard = () => {

 const dispatch = useDispatch();

  const { products }  = useSelector((state)=> state.products);
  const { orders } = useSelector((state)=> state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  
  let outOfStock = 0, totalProducts = 0;


  products && products.forEach((item) => {
         if(item.stock === 0){
           outOfStock += 1;
         }
         totalProducts += 1;
  });

  let inStock =  totalProducts - outOfStock;

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  

  const lineState = {
      labels : ["Initial Amount", "Earned Amount"],
      datasets:[{
        label:["TOTAL AMOUNT"],
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(107,72,69)"],
        data:[0,totalAmount],
      },
    ],
  };

  const DoughnutState = {
    labels: ["OutOfStock", "InStock"],
    datasets:[
     { 
      backgroundColor:["pink", "lightBlue"],
      hoverBackgroundColor:["lightpink", "skyblue"],
      data: [outOfStock, inStock],
    },
    ],
  }
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to = "/admin/products">
            <p>Products</p>
            <p>{ products && products.length }</p>
            </Link> 
            <Link to = "/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
            </Link>
            <Link to = "/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
            </Link>  
          </div>
        </div>
        <div className="lineChartHeading">
          Amount Details
        </div>
       <div className="lineChart">
       <Line data={lineState} />
       </div>
        
        <div className="doughnutHeading">
          Stock Details
        </div>

       <div className="doughnutChart">
         <Doughnut data = { DoughnutState }/>
       </div>
      </div>
    </div>
  );
};

export default Dashboard;
