import React, { useState } from "react";
import { UserCard } from "react-ui-cards";
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import Moment from "moment";

import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "../CustomButtons/Button";
import CustomInput from "../CustomInput/CustomInput";
import Card from "../Card/Card";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Search } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CardAvatar from "../Card/CardAvatar";
import CardBody from "../Card/CardBody";
import Fab from "@material-ui/core/Fab";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import ManagementPage from "../ManagementPage";

const FindAUser = (props) => {
    const classes = userStyles();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showUserCard, setShowUserCard] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const allUsers = useSelector((state) => state.users.users); // all users
    const [users_, setUsers_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allUsers !== null &&
            setTimeout(() => {
                setUsers_(allUsers);
                setFirstLoad(false);
            }, 750);
    }
    const pickRandBackground = () => {
        let bgs = [
            "https://i.imgur.com/w5tX1Pn.jpg",
            "https://i.imgur.com/uDYejhJ.jpg",
            "https://images.unsplash.com/photo-1505015390928-f9e55218544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
            "https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
            "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        ];
        return bgs[Math.floor(Math.random() * bgs.length)];
    };
    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            case "email":
                return option.email;
            default:
                return "";
        }
    };

    const handleSearch = () => {
        if (inputText.length > 0) {
            setIsLoading(true);
            switch (filterOptions) {
                case "id":
                    setUsers_(
                        allUsers.filter((user) => user._id === inputText)
                    );
                    setIsLoading(false);
                    return;
                case "name":
                    setUsers_(
                        allUsers.filter((user) => user.name === inputText)
                    );
                    setIsLoading(false);
                    return;
                case "email":
                    setUsers_(
                        allUsers.filter((user) => user.email === inputText)
                    );
                    setIsLoading(false);
                    return;
                default:
                    return "";
            }
        }
    };
    const UserCardFull = () => {
        allUsers !== null &&
            setCurrentUserProfile(
                allUsers.find((user) => user._id === currentUserId)
            );

        return (
            <Card
                profile
                style={{
                    height: "100%",
                    backgroundColor: "rgba(213, 213, 213, 0.1)",
                }}
            >
                <CardAvatar profile>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        <img src={pickRandBackground()} alt="..." />
                    </a>
                </CardAvatar>
                <CardBody profile>
                    <h6 className={classes.cardCategory}>
                        {currentUserProfile !== null && currentUserProfile.role}
                    </h6>
                    <h4 className={classes.cardTitle}>
                        {currentUserProfile !== null && currentUserProfile.name}
                    </h4>
                    <div style={{ textAlign: "left" }}>
                        <p className={classes.cardText}>
                            <b>Email</b>:{" "}
                            {currentUserProfile !== null &&
                                currentUserProfile.email}
                        </p>
                        <p className={classes.cardText}>
                            <b>Gender</b>:{" "}
                            {currentUserProfile !== null &&
                                currentUserProfile.gender}
                        </p>
                        <p className={classes.cardText}>
                            <b>Sold</b>: 0 products
                        </p>
                        <p className={classes.cardText}>
                            <b>Bought</b>: 0 products
                        </p>
                        <p className={classes.cardText}>
                            <b>Age</b>:{" "}
                            {currentUserProfile !== null &&
                                currentUserProfile.age}
                        </p>
                        <p style={{ marginTop: "1em" }}>
                            Account created on{" "}
                            {Moment(
                                currentUserProfile !== null &&
                                    currentUserProfile.createdAt
                            ).format("MMMM DD, YYYY")}
                        </p>
                    </div>
                </CardBody>
            </Card>
        );
    };
    return (
        <div style={{ width: "100%" }}>
            <Grid
                container
                style={{ marginTop: "0.7em", marginLeft: "0.5em" }}
                spacing={3}
                className={classes.appBar}
            >
                <Grid item xs={6} md={4} lg={3} style={{ margin: 0 }}>
                    <Button
                        color="transparent"
                        onClick={() => setUsers_(allUsers)}
                        className={classes.title}
                    >
                        Find A User
                    </Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{ margin: 0 }}>
                    <section
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Autocomplete
                            id="ejfreemo"
                            freeSolo
                            style={{ width: 300 }}
                            options={allUsers}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No user with that ${filterOptions}`}
                            getOptionLabel={(option) =>
                                handleFilter(filterOptions, option)
                            }
                            autoHighlight
                            renderOption={(option, state) => (
                                <p
                                    style={{
                                        padding: "0.5em",
                                        margin: "0",
                                        width: 300,
                                        height: "100% !important",
                                        color: "#000",
                                        overflowX: "hidden",
                                    }}
                                    onClick={(e) => {
                                        setInputText(e.target.textContent);
                                    }}
                                >
                                    {handleFilter(filterOptions, option)}
                                </p>
                            )}
                            renderInput={(params) => (
                                <CustomInput
                                    formControlProps={{
                                        className: classes.search,
                                    }}
                                    inputProps={{
                                        onChange: (e) => {
                                            setInputText(e.target.value);
                                        },
                                        ...params,
                                        placeholder: `Search user by ${filterOptions}`,
                                        inputProps: {
                                            ...params.inputProps,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Button
                            color="white"
                            aria-label="edit"
                            justIcon
                            round
                            style={{
                                marginBottom: 0,
                                marginLeft: "0.5em",
                                marginRight: "2em",
                            }}
                            onClick={handleSearch}
                        >
                            <Search />
                        </Button>
                        <div
                            tabIndex={0}
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
                            >
                                Filter by {filterOptions}{" "}
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
                                style={{ marginTop: "0.5em", left: "85%" }}
                            >
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("id");
                                        setToggleList((val) => !val);
                                    }}
                                    selected={"id" === filterOptions}
                                >
                                    <ListItemText primary="Id" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("name");
                                        setToggleList((val) => !val);
                                    }}
                                    selected={"name" === filterOptions}
                                >
                                    <ListItemText primary="Name" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setFilterOptions("email");
                                        setToggleList((val) => !val);
                                    }}
                                    selected={"email" === filterOptions}
                                >
                                    <ListItemText primary="Email" />
                                </ListItem>
                            </List>
                        </div>
                    </section>
                </Grid>
            </Grid>
            <Grid container>
                {users_ !== null && users_.length > 0 && !showUserCard ? (
                    <ManagementPage data={users_} />
                ) : null}
                {(users_ === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default FindAUser;
