import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardIcon from "../../../layout/Card/CardIcon";

import {Accessibility, Update} from "@material-ui/icons";

import Fab from "@material-ui/core/Fab";
import CardFooter from "../../../layout/Card/CardFooter";
import Button from "../../../layout/CustomButtons/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import OrderStats from "../Stats/OrderStats";
import ManagementPage from "../ManagementPage";

const AllOrders = () => {
    const classes = userStyles();
    const allOrders = useSelector((state) => state.orders.allOrders); // all users
    const [orders, setOrders] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);

    const ordersLastUpdated = React.useMemo(() => Date.now(), []);
    const [toggleList, setToggleList] = useState(false);
    const [toggleSortOrder, setToggleSortOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [filterOptions, setFilterOptions] = useState("createdAt");

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allOrders !== null &&
            setTimeout(() => {
                setOrders(allOrders);
                setFirstLoad(false);
            }, 1000);
    }

    const sortOrderState = (orders, reverse, value) => {
        const mapper = [
            {
                key: 6,
                state: "Ordered Successfully",
            },
            {
                key: 5,
                state: "Tiki Received",
            },
            {
                key: 4,
                state: "Getting Product",
            },
            {
                key: 3,
                state: "Packing",
            },
            {
                key: 2,
                state: "Shipping",
            },
            {
                key: 1,
                state: "Delivered",
            },
        ]

        const orders_ = orders.map((order) => {
            const state = mapper.find((item) => item.state === order.state);
            return { ...order, key: state.key };
        })
        if (reverse) {
            orders_.sort((a, b) => (a.value > b.value ? -1 : 1));
            return orders_;
        }
        orders_.sort((a, b) => (a.value > b.value ? 1 : -1));
        return orders_;
    }

    const handleFilter = (sortDescending, filterOptions) => {
        setIsLoading(true);
        let orders_ = sortOrderState(orders, sortDescending, filterOptions);

        setOrders(orders_);
        setIsLoading(false);
    };

    return (
        <div style={{ position: "relative" ,width: "100%" }}>
            <Grid
                container
                style={{ marginTop: "0.7em", marginLeft: "0.5em" }}
                spacing={3}
            >
                <Grid item xs={3} md={3} lg={3} className={classes.card}>
                    <Card onClick={() => handleFilter(false)}>
                        <CardHeader color="aumart" stats icon>
                            <CardIcon color="aumart">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Orders</p>
                            <h3 className={classes.cardTitle}>
                                {allOrders?.length}
                            </h3>
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
                    <section style={{ display: "flex", alignItems: "center" }}>
                        <div
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                    setToggleList(false);
                                }
                            }}
                        >
                            <Button
                                color="white"
                                className={classes.title}
                                onClick={() => setToggleList((val) => !val)}
                                style={{
                                    marginLeft: "0 !important",
                                    width: "100%",
                                }}
                            >
                                Sort by {filterOptions}{" "}
                                {toggleList ? (
                                    <ExpandLess
                                        style={{ marginLeft: "0.5em" }}
                                    />
                                ) : (
                                    <ExpandMore
                                        style={{ marginLeft: "0.5em" }}
                                    />
                                )}
                            </Button>
                            <List
                                component="nav"
                                aria-label="filter options"
                                className={classNames(classes.listStyle, {
                                    [classes.showList]: toggleList,
                                })}
                                style={{ marginTop: "1em" }}
                            >
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("createdAt");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "createdAt");
                                    }}
                                    selected={"createdAt" === filterOptions}
                                >
                                    <ListItemText primary="Time created" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("currentState");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "currentState");
                                    }}
                                    selected={"currentState" === filterOptions}
                                >
                                    <ListItemText primary="Current Order State" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("price");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "price");
                                    }}
                                    selected={"price" === filterOptions}
                                >
                                    <ListItemText primary="Price" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("quantity");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "quantity");
                                    }}
                                    selected={"quantity" === filterOptions}
                                >
                                    <ListItemText primary="Order quantity" />
                                </ListItem>
                            </List>
                        </div>
                    </section>
                    <Fab
                        aria-label="add"
                        color={"secondary"}
                        style={{ marginTop: "1.5em", marginLeft: "5.5em" }}
                        onClick={() => {
                            setToggleSortOrder((val) => {
                                handleFilter(val, filterOptions);
                                return !val;
                            });
                        }}
                    >
                        {toggleSortOrder ? (
                            <ArrowDownwardIcon />
                        ) : (
                            <ArrowUpwardIcon />
                        )}
                    </Fab>
                </Grid>
                <Grid
                    item
                    xs={9}
                    md={9}
                    lg={9}
                    className={classes.card}
                    style={{ marginTop: "2em" }}
                >
                    <OrderStats orders={allOrders} />
                </Grid>
            </Grid>
            <Grid container spacing={1} style={{ marginLeft: "0.5em" }}>
                {orders !== null && orders.length > 0 ? (
                    <ManagementPage data={orders} dataType={"orders"} />
                ) : null}
                {(orders === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default AllOrders;
