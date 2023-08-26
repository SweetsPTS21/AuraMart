import React, { useEffect, useState } from "react";
import { UserCard } from "react-ui-cards";
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";

import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "../CustomButtons/Button";
import CustomInput from "../CustomInput/CustomInput";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Search } from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import UpdateUserForm from "./UpdateUserForm";
import ReactLoading from "react-loading";

const UpdateUser = (props) => {
    const classes = userStyles();

    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showUserCard, setShowUserCard] = useState(false);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const allUsers = useSelector((state) => state.users.users); // all users
    const [users_, setUsers_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        setTimeout(() => {
            setUsers_(allUsers);
            setFirstLoad(false);
        }, 750);
    }
    useEffect(() => {
        setTimeout(() => setUsers_(allUsers), 1000);
    }, [allUsers]);

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
        setIsLoading(true);
        if (inputText.length > 0) {
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
                        Find User to Update
                    </Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{ margin: 0 }}>
                    <section
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Autocomplete
                            id="cwoeinfemo"
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
                {users_ !== null && users_.length > 0 && !showUserCard
                    ? users_.map((user, index) => (
                          <Grid
                              item
                              xs={6}
                              md={4}
                              lg={3}
                              style={{ margin: 0 }}
                              key={index}
                          >
                              <UserCard
                                  onClick={() => {
                                      setShowUserCard((val) => !val);
                                      setCurrentUserProfile(user);
                                  }}
                                  style={{ paddingBottom: "1em" }}
                                  float
                                  avatar={pickRandBackground()}
                                  name={user.name}
                                  positionName={user.email}
                                  stats={[
                                      {
                                          name: "Gender",
                                          value:
                                              user.gender
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              user.gender.slice(1),
                                      },
                                      {
                                          name: "Role",
                                          value:
                                              user.role
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              user.role.slice(1),
                                      },
                                      {
                                          name: "Age",
                                          value: user.age,
                                      },
                                  ]}
                              />
                          </Grid>
                      ))
                    : null}
                {showUserCard && (
                    <Fab
                        aria-label="add"
                        style={{ marginTop: "3em", marginLeft: "5em" }}
                        onClick={() => setShowUserCard((val) => !val)}
                    >
                        <ArrowBackIcon />
                    </Fab>
                )}

                {users_ !== null && users_.length > 0 && showUserCard ? (
                    <Grid item xs={10} md={8} lg={8} style={{ margin: "2em" }}>
                        <UpdateUserForm
                            user={currentUserProfile}
                            setUsers={setUsers_}
                            setShowUserCard={setShowUserCard}
                        />
                    </Grid>
                ) : null}
                {(users_ === null || isLoading) && (
                    <ReactLoading
                        type={"balls"}
                        color={"#189EFF"}
                        width={"10%"}
                        height={"10%"}
                        className={classes.loading3}
                    />
                )}
            </Grid>
        </div>
    );
};

export default UpdateUser;
