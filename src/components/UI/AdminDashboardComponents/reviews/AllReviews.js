import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardIcon from "../../../layout/Card/CardIcon";

import { Update } from "@material-ui/icons";
import CardFooter from "../../../layout/Card/CardFooter";
import Button from "../../../layout/CustomButtons/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ReviewStats from "../Stats/ReviewStats";
import ChatIcon from "@material-ui/icons/Chat";
import Fab from "@material-ui/core/Fab";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import ManagementPage from "../ManagementPage";

const AllReviews = () => {
    const classes = userStyles();
    const allReviews = useSelector((state) => state.reviews.allReviews);

    const [reviews, setReviews] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);

    const [reviewLastUpdated] = useState(Date.now());
    const [toggleList, setToggleList] = useState(false);
    const [toggleSortOrder, setToggleSortOrder] = useState(false);
    const [filterOptions, setFilterOptions] = useState("createdAt");
    const [isLoading, setIsLoading] = useState(false);

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allReviews !== null &&
            setTimeout(() => {
                setReviews(allReviews);
                setFirstLoad(false);
            }, 1000);
    }

    // const getReviewOwner = (userId) => {
    //     return allUsers.find((user) => user._id === userId);
    // };

    const handleFilter = (sortDescending) => {
        setIsLoading(true);
        if (sortDescending) {
            switch (filterOptions) {
                case "createdAt":
                    setReviews(
                        reviews.sort((a, b) =>
                            a.createdAt > b.createdAt ? -1 : 1
                        )
                    );
                    setIsLoading(false);
                    return;

                case "rating":
                    setReviews(
                        reviews.sort((a, b) => (a.rating > b.rating ? -1 : 1))
                    );
                    setIsLoading(false);
                    return;
                default:
                    return reviews;
            }
        } else {
            switch (filterOptions) {
                case "createdAt":
                    setReviews(
                        reviews.sort((a, b) =>
                            a.createdAt > b.createdAt ? 1 : -1
                        )
                    );
                    setIsLoading(false);
                    return;

                case "rating":
                    setReviews(
                        reviews.sort((a, b) => (a.rating > b.rating ? 1 : -1))
                    );
                    setIsLoading(false);
                    return;
                default:
                    return reviews;
            }
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Grid
                container
                style={{ marginTop: "0.7em", marginLeft: "0.5em" }}
                spacing={3}
            >
                <Grid item xs={3} md={3} lg={3} className={classes.card}>
                    <Card onClick={() => handleFilter(false)}>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <ChatIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>
                                Total Reviews
                            </p>
                            <h3 className={classes.cardTitle}>
                                {allReviews !== null && allReviews.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {reviewLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                    <section style={{ display: "flex", alignItems: "center" }}>
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
                                <ExpandLess style={{ marginLeft: "0.5em" }} />
                            ) : (
                                <ExpandMore style={{ marginLeft: "0.5em" }} />
                            )}
                        </Button>

                        <List
                            component="nav"
                            aria-label="filter options"
                            className={classNames(classes.listStyle, {
                                [classes.showList]: toggleList,
                            })}
                            style={{ marginTop: "6.5em" }}
                        >
                            <ListItem
                                button
                                onClick={() => {
                                    setFilterOptions("createdAt");
                                    setToggleList((val) => !val);
                                }}
                                selected={"createdAt" === filterOptions}
                            >
                                <ListItemText primary="Time created" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => {
                                    setFilterOptions("rating");
                                    setToggleList((val) => !val);
                                }}
                                selected={"rating" === filterOptions}
                            >
                                <ListItemText primary="Rating" />
                            </ListItem>
                        </List>
                    </section>
                    <Fab
                        aria-label="add"
                        color={"primary"}
                        style={{ marginTop: "1.5em", marginLeft: "5.5em" }}
                        onClick={() => {
                            setToggleSortOrder((val) => {
                                handleFilter(val);
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
                <Grid item xs={9} md={9} lg={9} className={classes.card}>
                    <ReviewStats reviews={allReviews} />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ position: "relative" ,marginLeft: "0.5em" }}>
                {reviews !== null && reviews.length > 0 ? (
                    <ManagementPage data={reviews} dataType={"reviews"} />
                ) : null}
                {(reviews === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default AllReviews;
