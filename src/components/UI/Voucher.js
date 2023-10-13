import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";

const userStyles = makeStyles(() => ({
    container: {
        width: "328px",
        height: "110px",
        marginRight: "0.5em",
    },
    voucher: {
        width: "100%",
        height: "100%",
        margin: "0",
        //backgroundColor: "#017fff",
        padding: "0.5em",
        border: "1px solid #017fff",
        borderRadius: "0.5em",
    },
    voucher__content: {},
    voucher__button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));
const Voucher = (props) => {
    const classes = userStyles();
    return (
        <div className={classes.container}>
            <Grid container className={classes.voucher}>
                <Grid item xs={9} className={classes.voucher__content}>
                    <Typography>{props.code}</Typography>
                    <Typography>Get 10% off on your first order</Typography>
                    <Typography>HSD: 30/10/2023</Typography>
                </Grid>
                <Grid item xs={3} className={classes.voucher__button}>
                    <Button size="medium" color="primary" variant="outlined">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Voucher;
