import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import userStyles from "../../styles/AccountDashboardStyles";

import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RoomIcon from "@material-ui/icons/Room";
import EventNoteIcon from "@material-ui/icons/EventNote";
import VisibilityIcon from "@material-ui/icons/Visibility";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import tikiNow from "../../image/tiki-now2.png";
import tikixu from "../../image/tikixu.svg";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import navbarStyles from "../../styles/NavbarStyles";
import { useSelector } from "react-redux";
import SellerHome from "./SellerDashbroadComponents/SellerHome";
import OrdersManagement from "./SellerDashbroadComponents/OrdersManagement";
import ProductsManagement from "./SellerDashbroadComponents/ProductsManagement";
import ShopManagement from "./SellerDashbroadComponents/ShopManagement";
import Stocks from "./SellerDashbroadComponents/Stocks";
import BillingInformation from "./SellerDashbroadComponents/BillingInfomation";
import CustomerService from "./SellerDashbroadComponents/CustomerService";
import HelpCenter from "./SellerDashbroadComponents/HelpCenter";
import { Typography } from "antd";
import { IconButton, Fab } from "@material-ui/core";
import { ChatEngine } from "react-chat-engine";
import {
    NotificationsOutlined,
    ArrowBackOutlined,
    ChatBubbleOutline,
    CloseRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const chatPublicKey = "0c8bb7fc-8146-4063-99f5-77c2f518da58";

const SellerDashbroad = (props) => {
    const index = 0;
    const classes = userStyles();
    const user = useSelector((state) => state.auth.userData);
    const [selectedIndex, setSelectedIndex] = useState(index);

    const options = [
        "Home page",
        "Orders Management",
        "Products Management",
        "Shop Management",
        "Stocks",
        "Billing Information",
        "Customer Service",
        "Help Center",
    ];
    const optionsIcon = [
        <PersonIcon className={classes.item} />,
        <NotificationsIcon className={classes.item} />,
        <MenuBookIcon className={classes.item} />,
        <RoomIcon className={classes.item} />,
        <CreditCardIcon className={classes.item} />,
        <EventNoteIcon className={classes.item} />,
        <VisibilityIcon className={classes.item} />,
        <QuestionAnswerIcon className={classes.item} />,
    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        // setToggleDrawer(true)
    };
    const renderMenuItemComponent = () => {
        switch (selectedIndex) {
            case 0:
                return <SellerHome />;
            case 1:
                return <OrdersManagement />;
            case 2:
                return <ProductsManagement />;
            case 3:
                return <ShopManagement />;
            case 4:
                return <Stocks />;
            case 5:
                return <BillingInformation />;
            case 6:
                return <CustomerService />;
            case 7:
                return <HelpCenter />;
            default:
                return <p>default</p>;
        }
    };
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                marginBottom: "2em",
                zIndex: "0",
            }}
        >
            <DashboardHeader user={user} />
            <div style={{ height: "64px" }}></div>
            <Grid
                container
                style={{
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    minWidth: "1200px",
                }}
                spacing={5}
            >
                <Grid
                    item
                    xs={2}
                    style={{ margin: 0, backgroundColor: "#fff" }}
                >
                    <section style={{ position: "fixed" }}>
                        <List
                            component="nav"
                            aria-label="main mailbox folders"
                            style={{ margin: 0 }}
                        >
                            {options.map((option, index) => (
                                <ListItem
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        paddingTop: "1.51%",
                                        paddingBottom: "1.51%",
                                        alignItems: "center",
                                    }}
                                    key={option}
                                    button
                                    selected={index === selectedIndex}
                                    onClick={
                                        (event) =>
                                            handleMenuItemClick(event, index)
                                        // onMouseEnter={event => handleMenuItemClick(event, index)
                                    }
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
                                        primaryTypographyProps={{
                                            variant: "inherit",
                                        }}
                                        style={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        }}
                                        className={classes.item2}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </section>
                </Grid>
                <Grid item xs={10}>
                    <Grid container>{renderMenuItemComponent()}</Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SellerDashbroad;
