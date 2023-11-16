import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../layout/NavBar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#F4F4F4",
        height: "100%",
    },
    container: {
        maxWidth: "1333px",
        margin: "auto",
        padding: "0 10px",
        height: "100%",
    },
}));

const OrderResultPage = (props) => {
    const [searchParams] = useSearchParams();
    const { search } = useLocation();
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const [success, setSuccess] = useState(false);

    const sendResult = () => {
        const query = searchParams.toString();
        const api_url = process.env.REACT_APP_API;

        axios
            .get(`${api_url}/api/v1/payment/vnpay/vnpay_ipn?` + query)
            .then((res) => {
                console.log(res);
                if (res.data.RspCode === "00") {
                    setSuccess(true);
                }
            });
    };

    useEffect(() => {
        if (vnp_ResponseCode && vnp_ResponseCode === "00")
            sendResult();
    }, []);

    const classes = useStyles();
    return (
        <div
            style={{
                width: "100%",
                minWidth: "1333px",
                height: "100%",
                backgroundColor: "#F4F4F4",
                overflowX: "visible",
            }}
        >
            <NavBar {...props} />
            <div className={classes.root}>
                <div className={classes.container}>
                    <Grid container>
                        <Grid item xs={12}>
                            {vnp_ResponseCode === "00" && success ? (
                                <>
                                    <h2>Thành Công</h2>
                                    <p>{JSON.stringify("query" + search)}</p>
                                </>
                            ) : (
                                <h2>Thất Bại</h2>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default OrderResultPage;
