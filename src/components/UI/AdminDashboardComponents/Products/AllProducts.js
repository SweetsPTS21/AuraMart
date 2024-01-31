import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardIcon from "../../../layout/Card/CardIcon";

import {Accessibility, Update} from "@material-ui/icons";
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
import Fab from "@material-ui/core/Fab";
import ProductStats from "../Stats/ProductStats";
import ManagementPage from "../ManagementPage";

const AllProducts = () => {
    const classes = userStyles();
    const reviews = useSelector((state) => state.reviews.allReviews);
    const allProducts = useSelector((state) => state.products.products);
    const [products, setProducts] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [toggleSortOrder, setToggleSortOrder] = useState(false);

    const productsLastUpdated = React.useMemo(() => Date.now(), []);
    const [toggleList, setToggleList] = useState(false);
    const [filterOptions, setFilterOptions] = useState("createdAt");

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allProducts !== null &&
            setTimeout(() => {
                setProducts(allProducts);
                setFirstLoad(false);
            }, 1000);
    }

    const getProductReviewLength = (id) => {
        let reviewsLength = 0;
        reviews !== null &&
            reviews.length > 0 &&
            reviews.filter((review) => {
                if (review.product.id === id) {
                    reviewsLength++;
                }
                return null;
            });
        return reviewsLength;
    };
    const handleFilter = (sortDescending, filterOptions) => {
        setIsLoading(true);
        let products_ = products;
        if (sortDescending) {
            switch (filterOptions) {
                case "createdAt":
                    products_?.sort((a, b) =>
                            a.createdAt > b.createdAt ? -1 : 1
                        );
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "rating":
                    products_?.sort((a, b) => {
                            let a_ =
                                a.averageRating === undefined
                                    ? 0
                                    : a.averageRating;
                            let b_ =
                                b.averageRating === undefined
                                    ? 0
                                    : b.averageRating;
                            return a_ > b_ ? -1 : 1;
                        });
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "price":
                    products_?.sort((a, b) => (a.price > b.price ? -1 : 1));
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "review":
                    products_?.sort((a, b) => {
                            return getProductReviewLength(a.id) >
                                getProductReviewLength(b.id)
                                ? -1
                                : 1;
                        });
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                default:
                    return products;
            }
        } else {
            switch (filterOptions) {
                case "createdAt":
                    products_?.sort((a, b) =>
                            a.createdAt > b.createdAt ? 1 : -1
                        );
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "rating":
                    products_?.sort((a, b) => {
                            let a_ =
                                a.averageRating === undefined
                                    ? 0
                                    : a.averageRating;
                            let b_ =
                                b.averageRating === undefined
                                    ? 0
                                    : b.averageRating;
                            return a_ > b_ ? 1 : -1;
                        });
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "price":
                    products_?.sort((a, b) => (a.price > b.price ? 1 : -1));
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                case "review":
                    products_?.sort((a, b) => {
                            return getProductReviewLength(a.id) >
                                getProductReviewLength(b.id)
                                ? 1
                                : -1;
                        });
                    setProducts(products_);
                    setIsLoading(false);
                    return;
                default:
                    return products;
            }
        }
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
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>
                                Total Products
                            </p>
                            <h3 className={classes.cardTitle}>
                                {allProducts?.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {productsLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                    <section
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <div
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                    setToggleList(false);
                                }
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                color="white"
                                className={classes.title}
                                onClick={() => setToggleList((val) => !val)}
                                style={{ width: "100%" }}
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
                                style={{ marginTop: "3em" }}
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
                                        setFilterOptions("rating");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "rating");
                                    }}
                                    selected={"rating" === filterOptions}
                                >
                                    <ListItemText primary="Average rating" />
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
                                        setFilterOptions("review");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "review");
                                    }}
                                    selected={"review" === filterOptions}
                                >
                                    <ListItemText primary="Reviews" />
                                </ListItem>
                            </List>
                        </div>
                        <Fab
                            aria-label="add"
                            color={"default"}
                            className={classes.fabGreen}
                            style={{ marginTop: "1.5em" }}
                            onClick={() => {
                                setToggleSortOrder((val) => {
                                    handleFilter(!val, filterOptions);
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
                    </section>
                </Grid>
                <Grid
                    item
                    xs={9}
                    md={9}
                    lg={9}
                    className={classes.card}
                    style={{ marginTop: "2em" }}
                >
                    <ProductStats products={allProducts} />
                </Grid>
            </Grid>
            <Grid container>
                {products !== null && products.length > 0 ? (
                    <ManagementPage data={products} dataType={"products"} />
                ) : null}

                {(products === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default AllProducts;
