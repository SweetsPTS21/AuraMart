import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";
import CardFooter from "../Card/CardFooter";
import { AccessTime, Accessibility, Update } from "@material-ui/icons";
import UserStats from "../Stats/UserStats";
import ManagementPage from "../ManagementPage";

const AllUsers = () => {
    const classes = userStyles();

    const allUsers = useSelector((state) => state.users.users); // all users
    const [users_, setUsers_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const sellers =
        allUsers !== null
            ? allUsers.filter((user) => user.role === "seller")
            : [];
    const admins =
        allUsers !== null
            ? allUsers.filter((user) => user.role === "admin")
            : [];
    const usersOnly =
        allUsers !== null
            ? allUsers.filter((user) => user.role === "user")
            : []; // all user with user role
    const [setIsLoading] = useState(false);

    const [showUserCard] = useState(false);

    const [usersLastUpdated, setUsersLastUpdated] = useState(Date.now());
    const [sellersLastUpdated, setSellersLastUpdated] = useState(Date.now());
    const [adminsLastUpdated, setAdminsLastUpdated] = useState(Date.now());
    const [usersOnlyLastUpdated, setUsersOnlyLastUpdated] = useState(
        Date.now()
    );

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allUsers !== null &&
            setTimeout(() => {
                setUsers_(allUsers);
                setFirstLoad(false);
            }, 750);
    }
    const handleFilter = (filter) => {
        setIsLoading(true);
        switch (filter) {
            case "totalUsers":
                setUsers_(allUsers.length > 0 ? allUsers : []);
                setUsersLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "users":
                setUsers_(usersOnly.length > 0 ? usersOnly : []);
                setUsersOnlyLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "sellers":
                setUsers_(sellers.length > 0 ? sellers : []);
                setSellersLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "admins":
                setUsers_(admins.length > 0 ? admins : []);
                setAdminsLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            default:
                return null;
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Grid
                container
                style={{ marginTop: "0.7em", marginLeft: "0.5em" }}
                spacing={3}
            >
                <Grid item xs={10} md={12}>
                    <UserStats />
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    className={classes.card}
                    onClick={() => handleFilter("totalUsers")}
                >
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Users</p>
                            <h3 className={classes.cardTitle}>
                                {allUsers !== null && allUsers.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {usersLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    className={classes.card}
                    onClick={() => handleFilter("users")}
                >
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <PersonIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>Users</p>
                            <h3 className={classes.cardTitle}>
                                {usersOnly.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {usersOnlyLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    className={classes.card}
                    onClick={() => handleFilter("sellers")}
                >
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <PersonIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>Sellers</p>
                            <h3 className={classes.cardTitle}>
                                {sellers.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <AccessTime />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {sellersLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    className={classes.card}
                    onClick={() => handleFilter("admins")}
                >
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <LockIcon />
                            </CardIcon>
                            <p className={classes.cardCategory}>Admins</p>
                            <h3 className={classes.cardTitle}>
                                {admins.length}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                <Moment
                                    fromNow
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {adminsLastUpdated}
                                </Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    {users_ !== null && users_.length > 0 && !showUserCard ? (
                        <ManagementPage data={users_} dataType={"users"} />
                    ) : null}
                </Grid>
            </Grid>
        </div>
    );
};

export default AllUsers;
