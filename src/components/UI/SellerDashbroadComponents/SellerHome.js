import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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

const RevenueStatistic = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.block}>
            <div className={classes.config__header}>Revenue Statistic</div>
        </Grid>
    );
};

const SellerHome = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={3}>
                <HomeConfig />
                <ShopStatistic />
                <RevenueStatistic />
            </Grid>
        </div>
    );
};

export default SellerHome;
