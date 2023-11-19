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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CommentIcon from "@material-ui/icons/Comment";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import tikiNow from "../../image/tiki-now2.png";
import tikixu from "../../image/tikixu.svg";
import bookcare from "../../image/bookcare.svg";
import avatar from "../../image/avatar.png";

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

const chatPublicKey = "0c8bb7fc-8146-4063-99f5-77c2f518da58";

const DashboardPageHeader = (props) => {
    const { user } = props;
    const classes = navbarStyles();
    const [openChat, setOpenChat] = useState(false);

    const handleOpenChatPopup = () => {
        setOpenChat(!openChat);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                height: "64px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 0 0 rgba(0,0,0,.1)",
                zIndex: 9999,
            }}
        >
            <Grid container style={{ display: "flex", padding: "1em" }}>
                <Grid
                    item
                    container
                    xs={10}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", alignItems: "Center" }}
                    >
                        <img
                            src={tikiNow}
                            style={{ width: "32px", height: "32px" }}
                            alt={"oven"}
                        />
                        <Typography
                            style={{
                                fontSize: "1.3em",
                                fontWeight: 400,
                                textAlign: "center",
                                marginLeft: "0.5em",
                                fontFamily: "inherit",
                            }}
                        >
                            Kênh người bán
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "0.5em",
                        }}
                    >
                        <IconButton
                            size="small"
                            style={{
                                padding: "0 0.5em",
                                borderRadius: "1.3em",
                                margin: 0,
                                "&:hover": {
                                    backgroundColor: "#BBB",
                                },
                            }}
                        >
                            <img
                                src={tikixu}
                                style={{ width: "32px", height: "32px" }}
                                alt={"oven"}
                            />
                            <Typography
                                style={{
                                    fontSize: "0.8em",
                                    textAlign: "center",
                                    marginLeft: "0.5em",
                                }}
                            >
                                {user.name}
                            </Typography>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={2}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <IconButton
                        size="small"
                        style={{
                            padding: "0 0.5em",
                            borderRadius: "1.3em",
                            margin: 0,
                            marginLeft: "1em",
                        }}
                    >
                        <NotificationsOutlined />
                    </IconButton>

                    <Link to="/">
                        <IconButton
                            size="small"
                            style={{
                                padding: "0.2em 0.5em",
                                border: "1px solid #ccc",
                                borderRadius: "1.3em",
                                margin: 0,
                                marginLeft: "1em",
                                "&:hover": {
                                    backgroundColor: "#BBB",
                                },
                            }}
                        >
                            <ArrowBackOutlined />
                            Trang chủ
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
            <Fab
                aria-label="up"
                size={"large"}
                style={{
                    top: "90%",
                    right: "2%",
                    position: "fixed",
                    zIndex: 99999,
                    backgroundColor: "#0a68ff",
                }}
                onClick={() => handleOpenChatPopup()}
            >
                <ChatBubbleOutline fontSize="large" htmlColor="#fff" />
            </Fab>
            {openChat && (
                <div className={classes.chatPopup}>
                    <Grid container className={classes.chatPopupInner}>
                        <Grid item xs={12} className={classes.chatPopupHeader}>
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    fontFamily: "inherit",
                                }}
                            >
                                Chat
                            </Typography>
                            <IconButton onClick={() => setOpenChat(!openChat)}>
                                <CloseRounded />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} className={classes.chatPopupContent}>
                            <ChatEngine
                                publicKey={chatPublicKey}
                                userName={user.email}
                                userPassword={user._id}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

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
            <DashboardPageHeader user={user} />
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
