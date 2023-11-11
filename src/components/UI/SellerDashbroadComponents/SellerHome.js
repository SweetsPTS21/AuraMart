import React from "react";
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
    Update,
    Store,
    Money,
    Report,
} from "@material-ui/icons";
import ReviewStats from "../AdminDashboardComponents/Stats/ReviewStats";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
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
        marginBottom: "1em",
        padding: "0.5em",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5em",
    },
}));

const HomeConfig = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.block}>
            <div className={classes.config__header}>Home Config</div>
        </Grid>
    );
};

const ShopStatistic = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.block}>
            <div className={classes.config__header}>Shop Statistic</div>
        </Grid>
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
