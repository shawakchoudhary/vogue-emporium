import { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
// import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "drons Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
    <Switch>
    <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/order/confirm" component={ ConfirmOrder  } />
      <ProtectedRoute exact path = "/order/:id" component={OrderDetails} /> 
       <ProtectedRoute exact path = "/success" component={OrderSuccess} />

     <ProtectedRoute exact path = "/orders" component={MyOrders} />  
    <ProtectedRoute isAdmin = {true} exact path = "/admin/dashboard" component={Dashboard} />
     
     <ProtectedRoute isAdmin={true} exact path = "/admin/products" component = {ProductList} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/product" component = {NewProduct} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/product/:id" component = {UpdateProduct} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/orders" component = {OrderList} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/order/:id" component = {ProcessOrder} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/users" component = {UsersList} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/user/:id" component = {UpdateUser} />

     <ProtectedRoute isAdmin={true} exact path = "/admin/reviews" component = {ProductReviews} />

     <ProtectedRoute
          exact
          path="/process/payment"
          component={Payment}
        />


     <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

  
    
    </Switch>

  
      <Footer />
    </Router>
  );
}

export default App;
