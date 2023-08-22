import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Home page Component
import Home from "./Components/Home/Home";

// importing product details page components
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";

// importing User Components
import LoginSignUp from "./Components/User/LoginSignUp";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";

// importing Layouts Components
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import UserOptions from "./Components/Layouts/Header/UserOptions";
import Contact from "./Components/Layouts/Contact/Contact";
import NotFound from "./Components/Layouts/Not Found/NotFound";

// importing cart page components
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping.js";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.js";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import Payment from "./Components/Cart/Payment/Payment";

// importing Orders Page Components
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";

// importing Admin page Components
import Dashboard from "./Components/Admin/Dashboard.js";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import OrderList from "./Components/Admin/OrderList";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UsersList from "./Components/Admin/UsersList";
import UpdateUser from "./Components/Admin/UpdateUser";
import ProductReviews from "./Components/Admin/ProductReviews";
// importing Protected Route Component
import ProtectedRoute from "./Components/Route/ProtectedRoute";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // console.log("App.js user: ", user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    // console.log("data", data);
    setStripeApiKey(data.stripeApiKey);
  }
  // testing stripe card number: 4000 0027 6000 3184
  useEffect(() => {
    // console.log("useeffect called");
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  // getting  the stripe api key
  useEffect(() => {
    getStripeApiKey();
    // console.log("stripeApiKey>>>>", stripeApiKey);
  }, [stripeApiKey]);

  // to block user from right clicking on the page
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />

        <ProtectedRoute exact path="/account" component={Profile} />
        <Route exact path="/contact" component={Contact} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />

        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
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
