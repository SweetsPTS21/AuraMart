import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import ProductCard from "../../Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";

import { Accessibility, Update } from "@material-ui/icons";

import CardFooter from "../Card/CardFooter";
import Button from "../CustomButtons/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NoPhoto from "../../../../image/nophoto.png";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ShopCard } from "./ShopCard2";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import ShopStats from "../Stats/ShopStats";
import ManagementPage from "../ManagementPage";

const AllShops = (props) => {
    const classes = userStyles();
    const allShops = useSelector((state) => state.shops.shops); // all users
    const [shops, setShops] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const [toggleShop, setToggleShop] = useState(false);
    const [currentShop, setCurrentShop] = useState(null);

    const [toggleSortOrder, setToggleSortOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [shopsLastUpdated, setShopsLastUpdated] = useState(Date.now());
    const [toggleList, setToggleList] = useState(false);
    const [filterOptions, setFilterOptions] = useState("createdAt");

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allShops !== null &&
            setTimeout(() => {
                setShops(allShops);
                setFirstLoad(false);
            }, 1000);
    }

    const handleFilter = (sortDescending, filterOptions) => {
        setIsLoading(true);
        if (sortDescending) {
            switch (filterOptions) {
                case "createdAt":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.createdAt > b.createdAt ? -1 : 1
                        );
                    setIsLoading(false);
                    return shops;
                case "noOfProducts":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.products.length > b.products.length ? -1 : 1
                        );
                    setIsLoading(false);
                    return shops;
                default:
                    return shops;
            }
        } else {
            switch (filterOptions) {
                case "createdAt":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.createdAt > b.createdAt ? 1 : -1
                        );
                    setIsLoading(false);
                    return shops;
                case "noOfProducts":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.products.length > b.products.length ? 1 : -1
                        );
                    setIsLoading(false);
                    return shops;
                default:
                    return allShops;
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
                    <Card onClick={() => handleFilter(false, "totalShops")}>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Shops</p>
                            <h3 className={classes.cardTitle}>
                                {allShops !== null && allShops.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {shopsLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                    <section>
                        <div
                            tabIndex={0}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                            onBlur={(event) => {
                                !event.currentTarget.contains(
                                    event.relatedTarget
                                ) && setToggleList(false);
                            }}
                        >
                            <Button
                                color="white"
                                className={classes.title}
                                onClick={() => setToggleList((val) => !val)}
                                style={{
                                    marginLeft: "2em !important",
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
                                        setFilterOptions("noOfProducts");
                                        setToggleList((val) => !val);
                                        handleFilter(false, "noOfProducts");
                                    }}
                                    selected={"oOfProducts" === filterOptions}
                                >
                                    <ListItemText primary="No of products in shop" />
                                </ListItem>
                            </List>
                        </div>
                        <Fab
                            aria-label="add"
                            color={"default"}
                            className={classes.fabGreen}
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
                    <ShopStats />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginLeft: "1em" }}>
                {shops !== null && shops.length > 0 && !toggleShop
                    ? shops.map((shop, index) => (
                          <Grid
                              item
                              xs={6}
                              md={5}
                              lg={4}
                              style={{ margin: 0 }}
                              key={index}
                          >
                              <ShopCard
                                  shop={shop}
                                  setCurrentShop={setCurrentShop}
                                  toggleShop={setToggleShop}
                              />
                          </Grid>
                      ))
                    : null}
                {toggleShop && (
                    <Fab
                        aria-label="add"
                        style={{ marginTop: "3em", marginLeft: "3em" }}
                        onClick={() => setToggleShop((val) => !val)}
                    >
                        <ArrowBackIcon />
                    </Fab>
                )}
                {currentShop !== null && toggleShop ? (
                    <ManagementPage
                        data={currentShop.products}
                        dataType={"products"}
                    />
                ) : null}
                {(shops === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default AllShops;
