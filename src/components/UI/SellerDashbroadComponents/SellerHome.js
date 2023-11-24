import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OrderStats from "../AdminDashboardComponents/Stats/OrderStats";
import { getAllOrdersOfAShop } from "../../../store/actions/orderActions";
import { getProductsByShopId } from "../../../store/actions/productActions";
import ProductStats from "../AdminDashboardComponents/Stats/ProductStats";
import Card from "../AdminDashboardComponents/Card/Card";
import CardHeader from "../AdminDashboardComponents/Card/CardHeader";
import CardIcon from "../AdminDashboardComponents/Card/CardIcon";
import CardFooter from "../AdminDashboardComponents/Card/CardFooter";
import Moment from "react-moment";
import {
    Accessibility,
    Money,
    Report,
    Store,
    Update,
} from "@material-ui/icons";
import ReviewStats from "../AdminDashboardComponents/Stats/ReviewStats";
const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        // marginTop: "20px",
    },

    container: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: "0.5em",
        borderRadius: "0.5em",
    },
    block: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1em",
        padding: "0.5em",
        color: "#000000",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5em",
    },
    cardTitle: {
        color: "#3C4858",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
    cardCategory: {
        color: "#999",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0",
    },
}));

const HomeConfig = (props) => {
    const classes = useStyles();
    const [ordersLastUpdated] = useState(Date.now());
    const products = props.products ? props.products : [];
    return (
        <>
            <Grid item xs={3}>
                <Card>
                    <CardHeader color="tiki" stats icon>
                        <CardIcon color="tiki">
                            <Report />
                        </CardIcon>
                        <p className={classes.cardCategory}>Total Orders</p>
                        <h3 className={classes.cardTitle}>{12}</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                            <Moment
                                fromNow
                                style={{ textTransform: "capitalize" }}
                            >
                                {ordersLastUpdated}
                            </Moment>
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store />
                        </CardIcon>
                        <p className={classes.cardCategory}>Total Products</p>
                        <h3 className={classes.cardTitle}>{products.length}</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                            <Moment
                                fromNow
                                style={{ textTransform: "capitalize" }}
                            >
                                {ordersLastUpdated}
                            </Moment>
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                            <Money />
                        </CardIcon>
                        <p className={classes.cardCategory}>Today Revenue</p>
                        <h3 className={classes.cardTitle}>{"+250000"}</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                            <Moment
                                fromNow
                                style={{ textTransform: "capitalize" }}
                            >
                                {ordersLastUpdated}
                            </Moment>
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardHeader color="primary" stats icon>
                        <CardIcon color="primary">
                            <Accessibility />
                        </CardIcon>
                        <p className={classes.cardCategory}>Follower</p>
                        <h3 className={classes.cardTitle}>{"+25"}</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                            <Moment
                                fromNow
                                style={{ textTransform: "capitalize" }}
                            >
                                {ordersLastUpdated}
                            </Moment>
                        </div>
                    </CardFooter>
                </Card>
            </Grid>
        </>
    );
};
const ShopStatistic = (props) => {
    const orders = props.orders ? props.orders : [];
    const reviews = props.reviews ? props.reviews : [];
    const products = props.products ? props.products : [];
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} className={classes.block}>
                <OrderStats orders={orders} />
            </Grid>
            <Grid
                item
                container
                xs={12}
                className={classes.block}
                style={{ flexDirection: "row", justifyContent: "center" }}
            >
                <Grid item xs={4} style={{ marginRight: "1.5em" }}>
                    <ProductStats products={products} />
                </Grid>
                <Grid item xs={7}>
                    <ReviewStats reviews={reviews} />
                </Grid>
            </Grid>
        </>
    );
};

const SellerHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const shop = useSelector((state) => state.shops.userShop);
    const orders = useSelector((state) => state.orders.allShopOrders);
    const products = useSelector((state) => state.products.productsInShop);
    const reviews = useSelector((state) => state.reviews.allReviews);

    useEffect(() => {
        if (shop) {
            dispatch(getAllOrdersOfAShop(shop.id));
            dispatch(getProductsByShopId(shop.id));
        }
    }, [shop, dispatch]);

    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={3}>
                <HomeConfig products={products} />
                <ShopStatistic
                    products={products}
                    orders={orders}
                    reviews={reviews}
                />
            </Grid>
        </div>
    );
};

export default SellerHome;
