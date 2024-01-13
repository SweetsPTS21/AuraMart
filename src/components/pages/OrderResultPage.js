import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ArrowBackRounded } from "@material-ui/icons";
import { ClearRounded, DoneAllRounded } from "@material-ui/icons";

import * as paymentActions from "../../store/actions/paymentActions";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    container: {
        maxWidth: "1200px",
        margin: "auto",
        padding: "0 10px",
        height: "100%",
    },
    result: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5em",
        margin: "2em 0",
        borderRadius: "0.5em",
    },
    grid: {
        width: "550px",
        margin: "0 auto",
    },
}));

const renderResult = (code, message, success) => {
    if (success) {
        return (
            <>
                <h2 style={{ marginBottom: "1em" }}>
                    Thành Công{" "}
                    <DoneAllRounded color="action" fontSize="inherit" />{" "}
                </h2>
                <h4>Kiểm tra tình trạng đơn hàng của bạn</h4>
                <Link to="/">
                    <Button variant="outlined" color="primary">
                        Quay về trang chủ
                    </Button>
                </Link>
            </>
        );
    } else {
        return (
            <>
                <h2 style={{ marginBottom: "1em" }}>
                    Thất Bại{" "}
                    <ClearRounded color="secondary" fontSize="inherit" />
                </h2>
                <p>Mã lỗi: {code || 78}</p>
                <p>
                    Lời nhắn:{" "}
                    {message || "Giao dịch bị hủy hoặc lỗi không xác định"}
                </p>
                <Link to="/">
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{ padding: "0.5em" }}
                    >
                        <ArrowBackRounded />
                        Quay về trang chủ
                    </Button>
                </Link>
            </>
        );
    }
};

const OrderResultPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const resultCode = searchParams.get("resultCode");
    const [success, setSuccess] = useState(false);
    const vnpayStatus = useSelector((state) => state.payments.vnpayStatus);
    const momoStatus = useSelector((state) => state.payments.momoStatus);

    const sendResult = () => {
        const query = searchParams.toString();
        if (vnp_ResponseCode) {
            dispatch(paymentActions.checkVnpayPayment(query));
        }
        if (resultCode === "0") {
            dispatch(paymentActions.checkMomoPayment(query));
        }
    };

    const checkResult = () => {
        if (vnpayStatus?.rspcode === "00" || momoStatus?.rspcode === "00") {
            setSuccess(true);
        }
    };

    useEffect(() => {
        if (vnp_ResponseCode || resultCode) sendResult();

        if (vnpayStatus || momoStatus) checkResult();
    }, [vnpayStatus, momoStatus]);

    const classes = useStyles();
    return (
        <div
            style={{
                width: "100%",
                minWidth: "1200px",
                height: "100%",
                backgroundColor: "#F4F4F4",
                overflowX: "visible",
            }}
        >
            <div className={classes.root}>
                <div className={classes.container}>
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} className={classes.result}>
                            {vnpayStatus &&
                                vnp_ResponseCode &&
                                vnpayStatus.rspcode !== "00" &&
                                renderResult(
                                    vnpayStatus.rspcode,
                                    vnpayStatus.message,
                                    success
                                )}

                            {momoStatus &&
                                resultCode &&
                                renderResult(
                                    momoStatus.rspcode,
                                    momoStatus.message,
                                    success
                                )}
                            {!resultCode && !vnp_ResponseCode && (
                                <>
                                    <h2 style={{ marginBottom: "1em" }}>
                                        Trang không tồn tại{" "}
                                        <ClearRounded
                                            color="secondary"
                                            fontSize="inherit"
                                        />
                                    </h2>
                                    <Link to="/">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            style={{ padding: "0.5em" }}
                                        >
                                            <ArrowBackRounded />
                                            Quay về trang chủ
                                        </Button>
                                    </Link>
                                </>
                            )}
                            {!vnpayStatus && !momoStatus && (
                                <>
                                    <h2 style={{ marginBottom: "1em" }}>
                                        Thất Bại{" "}
                                        <ClearRounded
                                            color="secondary"
                                            fontSize="inherit"
                                        />
                                    </h2>
                                    <p>Mã lỗi: {78}</p>
                                    <p>
                                        Lời nhắn:{" "}
                                        {
                                            "Giao dịch bị hủy hoặc lỗi không xác định"
                                        }
                                    </p>
                                    <Link to="/">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            style={{ padding: "0.5em" }}
                                        >
                                            <ArrowBackRounded />
                                            Quay về trang chủ
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default OrderResultPage;
