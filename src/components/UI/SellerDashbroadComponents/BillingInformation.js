import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import tikiNotFound from "../../../image/tiki-not-found-pgae.png";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "3em",
        color: "#fff",
        fontSize: "1.2em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },

        margin: 0,
        marginLeft: "1em",
        marginRight: "0.5em",
        marginTop: "2em",
        marginBottom: "1em",
    },
    input: {
        height: "1em !important",
    },
    title: {
        fontSize: "1.1em",
        fontWeight: 400,
        marginBottom: "0.3em",
        color: "rgba(0,0,0,0.8)",
    },
    grid: {
        padding: "0",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    grid2: {
        padding: "2em",
        marginTop: "0.6em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
        textDecoration: "none !important",
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded":
        {
            top: "45% !important",
            left: "70% !important",
        },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)",
    },
}));

const BillingInformation = () => {
    const classes = userStyles();

    return (
        <div style={{ width: "80%" }}>
            <div className={classes.title}>Billing Information</div>
            <div className={classes.grid}>
                <section
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexDirection: "column",
                    }}
                >
                    <img src={tikiNotFound} alt="" />
                    <br />
                    <p>
                        Saving payment information helps you order more quickly
                        and easily
                    </p>
                    <Button variant="contained" className={classes.button}>
                        Continue shopping
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default BillingInformation;
