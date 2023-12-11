import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import chartup from "../../../image/chartup.svg";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "20px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: "1.2em",
        fontWeight: 400,
        lineHeight: "150%",
        margin: "0px 0px 14px 12px",
        color: "rgb(39, 39, 42)",
    },
    grid: {
        padding: "1em",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    button3: {
        margin: "0.5em",
        fontFamily: "inherit",
        textTransform: "none",
        backgroundColor: "#0a68ff",
        color: "#fff",
        textAlign: "center",
        gridArea: "auto",
        padding: "3px 12px",
        borderRadius: "4px",
        lineHeight: "2.5em",
        "&:hover": {
            backgroundColor: "#0a68ff",
        },
    },
}));

const Reports = () => {
    const classes = useStyles();

    return (
        <div style={{ width: "100%" }}>
            <div style={{ margin: "0 auto", width: "70%" }}>
                <Grid container className={classes.grid}>
                    <Grid item xs={1}>
                        <img
                            src={chartup}
                            alt="chartup"
                            style={{ height: "80px", width: "90px" }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "0 1em",
                        }}
                    >
                        <div
                            className={classes.title}
                            style={{ marginLeft: 0 }}
                        >
                            Ban đang tìm kiếm cách để tăng doanh số? Hãy thử
                            dùng Quảng cáo Shopee!
                        </div>
                        <Typography
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#666",
                            }}
                        >
                            Trung bình, Quảng cáo Shopee đang giúp những người
                            bán sử dụng quảng cáo thu về 65% về số đơn đặt hàng.
                            Bắt đầu ngay hôm nay để tăng mức độ tiếp xúc và bán
                            hàng, và giúp Shop của bạn phát triển hơn nữa!
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Button className={classes.button3}>
                            Tạo quảng cáo
                        </Button>
                    </Grid>
                </Grid>
                <div>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={8}>
                                <div className={classes.grid}>
                                    Báo cáo tổng quan
                                </div>
                                <div className={classes.grid}>
                                    Báo cáo tổng quan
                                </div>
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: "1em" }}>
                                <div className={classes.grid}>
                                    Báo cáo sản phẩm
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Reports;
