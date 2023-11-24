import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";

import DashboardPage from "./components/pages/DashboardPage";
import HomePage from "./components/pages/HomePage";
import ProductCategoryPage from "./components/pages/ProductCategoryPage";
import ShopPage from "./components/pages/ShopPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import PrivateRoute from "./components/common/PrivateRoute";
import Checkout from "./components/pages/Checkout";
import OrderResultPage from "./components/pages/OrderResultPage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./store/actions/authActions";
import { getAllProducts } from "./store/actions/productActions";
import { getCart } from "./store/actions/cartActions";
import { getAllShops } from "./store/actions/shopActions";
import { getAllReviews } from "./store/actions/reviewActions";
import { getAllAddress } from "./store/actions/addressActions";
import { getAllConfigs } from "./store/actions/configActions";
import AdminPage from "./components/pages/AdminPage";
import { getAllOrders } from "./store/actions/orderActions";
import UnderDevelopmentPage from "./components/pages/UnderDevelopmentPage";
import SellerDashbroad from "./components/UI/SellerDashboard";
import SellerPage from "./components/pages/SellerPage";

const actionsOnPageLoad = () => {
    store.dispatch(getAllProducts("?limit=100"));
    store.dispatch(getCart());
    store.dispatch(getAllShops());
    store.dispatch(getAllOrders());
    store.dispatch(getAllReviews());
    store.dispatch(getAllAddress());
    store.dispatch(getAllConfigs());
    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and expiration
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        // Check for expired token
        //const currentTime = Date.now() / 1000;
        // if (decoded.exp < currentTime) {
        //     // Logout user
        //     store.dispatch(logoutUser());
        //     window.location.href = "/login";
        // }
    }
};
actionsOnPageLoad();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route
                            exact
                            path={"/"}
                            element={
                                <HomePage
                                    howForm={false}
                                    checkIsAdmin={false}
                                    checkIsSeller={false}
                                />
                            }
                        />
                        <Route
                            exact
                            path={"/product/:type"}
                            element={<ProductCategoryPage />}
                        />
                        <Route
                            path={"/dashboard/:type"}
                            element={
                                <PrivateRoute
                                    component={DashboardPage}
                                ></PrivateRoute>
                            }
                        />

                        <Route
                            exact
                            path={"/admin"}
                            element={
                                <PrivateRoute
                                    component={AdminPage}
                                    checkIsAdmin
                                />
                            }
                        />
                        <Route
                            exact
                            path={"/seller/:type"}
                            element={
                                <PrivateRoute
                                    component={SellerDashbroad}
                                    checkIsSeller
                                />
                            }
                        />
                        <Route
                            exact
                            path={"/seller/register"}
                            element={<SellerPage/>}
                        />
                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path={"/admin/register"}*/}
                        {/*    render={(routeProps) => <HomePage {...routeProps} showForm={true} adminForm={true} mustBeLoggedOut={true}/>}*/}
                        {/*/>*/}

                        <Route
                            exact
                            path={"/:productName/:productId"}
                            element={<ProductDetailPage />}
                        />
                        <Route
                            exact
                            path={"/tiki/shops/:shopId"}
                            element={<ShopPage />}
                        />
                        <Route
                            exact
                            path={"/underDevelopment"}
                            element={
                                <UnderDevelopmentPage
                                    status={"underDevelopment"}
                                />
                            }
                        />
                        <Route
                            exact
                            path={"/notFound"}
                            element={
                                <UnderDevelopmentPage status={"notFound"} />
                            }
                        />
                        <Route
                            exact
                            path={"/cart"}
                            element={<PrivateRoute component={CartPage} />}
                        />
                        <Route
                            exact
                            path={"/orders"}
                            element={<PrivateRoute component={OrdersPage} />}
                        />
                        <Route
                            exact
                            path={"/checkout"}
                            element={<PrivateRoute component={Checkout} />}
                        />
                        <Route
                            exact
                            path={"/result"}
                            element={<OrderResultPage />}
                        />
                        <Route
                            element={<UnderDevelopmentPage status={"404"} />}
                        />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
