import React, { useState } from "react";
import userStyles from "../styles/FindAUserStyles";
import ChartistGraph from "react-chartist";
import Chartist from "chartist";

import Grid from "@material-ui/core/Grid";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardBody from "../../../layout/Card/CardBody";
import CardFooter from "../../../layout/Card/CardFooter";
import "./material-dashboard-react.css";
import Moment2 from "moment";
import { AccessTime, ArrowUpward } from "@material-ui/icons";
import Moment from "react-moment";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const OrderStats = (props) => {
    const classes = userStyles();
    const allOrders = props.orders;

    const [orderChart, setOrderChart] = useState(null);
    const [orderChartStatus, setOrderChartStatus] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [orderLastUpdated] = useState(Date.now());

    const convertDateToDay = () => {
        // Get last 6 days + today and put it in an array
        const Last7days = [];
        const NUM_OF_DAYS = 6; // get last 6 days + today array.
        for (let i = NUM_OF_DAYS; i > -1; i--) {
            let date = Moment2().subtract(i, "d").format("ddd");
            Last7days.push(date);
        }

        let Last7daysOrdersCount = [0, 0, 0, 0, 0, 0, 0];
        const dateFrom = Moment2().subtract(8, "d").format("YYYY-MM-DD"); // get time 7 days ago
        allOrders !== null &&
            allOrders !== undefined &&
            allOrders.forEach((order) => {
                if (
                    Moment2(order.createdAt) // if order is from the last 7 days
                        .isAfter(dateFrom, "day")
                ) {
                    const day = Moment2(order.createdAt).format("ddd"); // the day the review was created
                    switch (day) {
                        case "Mon":
                            // if day is "mon" then increase the count of reviews on mon, but we don't know wha index mon is going to be since
                            // we got the last seven days and push it to an array, so we find the index
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Mon")
                            ]++;
                            return;
                        case "Tue":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Tue")
                            ]++;
                            return;
                        case "Wed":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Wed")
                            ]++;
                            return;
                        case "Thu":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Thu")
                            ]++;
                            return;
                        case "Fri":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Fri")
                            ]++;
                            return;
                        case "Sat":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Sat")
                            ]++;
                            return;
                        case "Sun":
                            Last7daysOrdersCount[
                                Last7days.findIndex((val) => val === "Sun")
                            ]++;
                            return;
                    }
                }
            });

        const delays = 80,
            durations = 500;
        const orderChart_ = {
            data: {
                labels: Last7days,
                series: [Last7daysOrdersCount],
            },
            options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0,
                }),
                low: 0,
                high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            // for animation
            animation: {
                draw: function (data) {
                    if (data.type === "line" || data.type === "area") {
                        data.element.animate({
                            d: {
                                begin: 600,
                                dur: 700,
                                from: data.path
                                    .clone()
                                    .scale(1, 0)
                                    .translate(0, data.chartRect.height())
                                    .stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint,
                            },
                        });
                    } else if (data.type === "point") {
                        data.element.animate({
                            opacity: {
                                begin: (data.index + 1) * delays,
                                dur: durations,
                                from: 0,
                                to: 1,
                                easing: "ease",
                            },
                        });
                    }
                },
            },
        };
        setOrderChart(orderChart_);
    };

    const calculateCurrentStatusData = () => {
        let Last7daysOrderStatusLabel = [
            "Ordered Successfully",
            "Tiki Received",
            "Getting Product",
            "Packing",
            "Shipping",
            "Delivered",
        ];
        let Last7daysOrderStatus = [5, 2, 11, 7, 1, 3];
        const dateFrom = Moment2().subtract(8, "d").format("YYYY-MM-DD"); // get time 7 days ago
        allOrders !== null &&
            allOrders.forEach((order) => {
                if (
                    Moment2(order.createdAt) // if reviews is from the last 7 days
                        .isAfter(dateFrom, "day")
                ) {
                    const OrderState = order.currentState;
                    switch (OrderState) {
                        case "Ordered Successfully":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Ordered Successfully"
                                )
                            ]++;
                            return;
                        case "Tiki Received":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Tiki Received"
                                )
                            ]++;
                            return;
                        case "Getting Product":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Getting Product"
                                )
                            ]++;
                            return;
                        case "Packing":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Packing"
                                )
                            ]++;
                            return;
                        case "Shipping":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Shipping"
                                )
                            ]++;
                            return;
                        case "Delivered":
                            Last7daysOrderStatus[
                                Last7daysOrderStatusLabel.findIndex(
                                    (val) => val === "Delivered"
                                )
                            ]++;
                            return;
                    }
                }
            });

        const orderChart_ = {
            data: [
                {
                    value: Last7daysOrderStatus[0],
                    label: "Ordered Successfully",
                    className: "one",
                    meta: "Meta One",
                },
                {
                    value: Last7daysOrderStatus[1],
                    label: "Tiki Received",
                    className: "two",
                    meta: "Meta",
                },
                {
                    value: Last7daysOrderStatus[2],
                    label: "Getting Product",
                    className: "three",
                    meta: "Meta",
                },
                {
                    value: Last7daysOrderStatus[3],
                    label: "Packing",
                    className: "four",
                    meta: "Meta",
                },
                {
                    value: Last7daysOrderStatus[4],
                    label: "Shipping",
                    className: "five",
                    meta: "Meta",
                },
                {
                    value: Last7daysOrderStatus[5],
                    label: "Delivered",
                    className: "six",
                    meta: "Meta",
                },
            ],
        };

        setOrderChartStatus(orderChart_);
    };

    if (firstLoad) {
        allOrders !== null &&
            setTimeout(() => {
                convertDateToDay();
                calculateCurrentStatusData();
                setFirstLoad(false);
            }, 1500);
    }

    const size = {
        width: 500,
        height: 200,
    };

    return (
        <div style={{ width: "100%" }}>
            <Grid container spacing={3}>
                {orderChart === null && (
                    <LoadingSpinner
                        width={"5%"}
                        height={"5%"}
                        className={classes.loading2}
                    />
                )}
                <Grid item xs={5} className={classes.card}>
                    {orderChart !== null && (
                        <Card chart onClick={convertDateToDay}>
                            <CardHeader color="success">
                                <ChartistGraph
                                    className="ct-chart"
                                    data={orderChart.data}
                                    type="Line"
                                    options={orderChart.options}
                                    listener={orderChart.animation}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>
                                    Daily Orders
                                </h4>
                                <p className={classes.cardCategory}>
                                    <span className={classes.successText}>
                                        <ArrowUpward
                                            className={
                                                classes.upArrowCardCategory
                                            }
                                        />{" "}
                                        {orderChart.data.series[0].slice(-1)[0]}
                                    </span>{" "}
                                    increase in today's orders.
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {orderLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </Grid>
                <Grid item xs={7} className={classes.card}>
                    {orderChartStatus !== null && (
                        <Card chart onClick={calculateCurrentStatusData}>
                            <CardHeader color="aumart">
                                <PieChart
                                    series={[
                                        {
                                            data: orderChartStatus.data,
                                            highlightScope: {
                                                faded: "global",
                                                highlighted: "item",
                                            },
                                            faded: {
                                                innerRadius: 30,
                                                additionalRadius: -30,
                                                color: "gray",
                                            },
                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: "white",
                                            fontWeight: "bold",
                                        },
                                    }}
                                    {...size}
                                />
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardTitle}>
                                    Current Status
                                </h4>
                                <p className={classes.cardCategory}>
                                    Orders current status in the last 7 days
                                </p>
                            </CardBody>
                            <CardFooter chart>
                                <div className={classes.stats}>
                                    <AccessTime />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {orderLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderStats;
