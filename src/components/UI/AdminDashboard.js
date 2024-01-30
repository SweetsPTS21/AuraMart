import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import userStyles from "../../styles/AdminDashboardStyles";

import PersonIcon from "@material-ui/icons/Person";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HeadsetIcon from "@material-ui/icons/Headset";
import StorefrontIcon from "@material-ui/icons/Storefront";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ChatIcon from "@material-ui/icons/Chat";
import uuid from "react-uuid";

import AllUsers from "./AdminDashboardComponents/User/AllUsers";
import AllProducts from "./AdminDashboardComponents/Products/AllProducts";
import AllShops from "./AdminDashboardComponents/Shops/AllShops";
import AllOrders from "./AdminDashboardComponents/Orders/AllOrders";
import AllReviews from "./AdminDashboardComponents/reviews/AllReviews";
import Stats from "./AdminDashboardComponents/Stats/Stats";
import SystemSettings from "./AdminDashboardComponents/Settings/SystemSettings";
import DashboardHeader from "./DashboardHeader";
import { useSelector } from "react-redux";
import { SettingsRounded } from "@material-ui/icons";
import PropTypes from "prop-types";

const AdminDashBoard = (props) => {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(
        props.index !== undefined ? props.index : 0
    );
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setSelectedIndex(props.index);
    }, [props.index]);
    const options = [
        "Thống kê",
        "Tài khoản",
        "Sản phẩm",
        "Cửa hàng",
        "Đơn hàng",
        "Đánh giá",
        "Cấu hình chung",
    ];
    const optionsIcon = [
        <EqualizerIcon key={1} className={classes.item} />,
        <PersonIcon key={2} className={classes.item} />,
        <HeadsetIcon key={3} className={classes.item} />,
        <StorefrontIcon key={4} className={classes.item} />,
        <LocalShippingIcon key={5} className={classes.item} />,
        <ChatIcon key={6} className={classes.item} />,
        <SettingsRounded key={7} className={classes.item} />,
    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const renderMenuItems = () => {
        let counter = 0;
        return options.map((option, index) => {
            counter++;
            let temp = counter;
            return (
                <ListItem
                    style={{
                        marginTop: 0,
                        marginBottom: 0,
                        paddingTop: "1.51%",
                        paddingBottom: "1.51%",
                        alignItems: "center",
                    }}
                    key={uuid()}
                    button
                    selected={temp === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, temp)}
                >
                    <ListItemIcon
                        style={{
                            marginTop: 0,
                            marginBottom: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}
                    >
                        {optionsIcon[index]}
                    </ListItemIcon>
                    <ListItemText
                        primary={option}
                        primaryTypographyProps={{ variant: "inherit" }}
                        style={{
                            marginTop: 0,
                            marginBottom: 0,
                            paddingTop: "0.5em",
                            paddingBottom: "0.5em",
                        }}
                        className={classes.item2}
                    />
                </ListItem>
            );
        });
    };
    const renderMenuItemComponent = () => {
        switch (selectedIndex) {
            case 1:
                return <Stats />;
            case 2:
                return <AllUsers />;
            case 3:
                return <AllProducts />;
            case 4:
                return <AllShops role={"admin"} />;
            case 5:
                return <AllOrders />;
            case 6:
                return <AllReviews />;
            case 7:
                return <SystemSettings/>;
            default:
                return <p>default</p>;
        }
    };
    return (
        <div style={{ zIndex: "-1", minWidth: "1422px" }}>
            <DashboardHeader user={user} />
            <Grid container style={{marginTop: "64px"}}>
                <Grid item xs={2} className={classes.sideBar}>
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        style={{ margin: 0 }}
                    >
                        {renderMenuItems()}
                    </List>
                </Grid>
                <Grid item xs={10} style={{ padding: 0, height: "calc(100vh - 64px)", overflowY: "scroll"}}>
                    <Grid container  style={{ marginBottom: "1em"}}>
                        {renderMenuItemComponent()}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

AdminDashBoard.propTypes = {
    index: PropTypes.number,
};
export default AdminDashBoard;
