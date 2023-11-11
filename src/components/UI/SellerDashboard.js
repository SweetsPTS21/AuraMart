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
import { useSelector } from "react-redux";
import SellerHome from "./SellerDashbroadComponents/SellerHome";
import OrdersManagement from "./SellerDashbroadComponents/OrdersManagement";
import ProductsManagement from "./SellerDashbroadComponents/ProductsManagement";
import ShopManagement from "./SellerDashbroadComponents/ShopManagement";
import Stocks from "./SellerDashbroadComponents/Stocks";
import BillingInformation from "./SellerDashbroadComponents/BillingInfomation";
import CustomerService from "./SellerDashbroadComponents/CustomerService";
import HelpCenter from "./SellerDashbroadComponents/HelpCenter";
import SellerRegister from "./SellerDashbroadComponents/SellerRegister";

const SellerDashbroad = (props) => {
    const index = parseInt(props.index);
    const classes = userStyles();
    const user = useSelector((state) => state.auth.userData);
    const shop = useSelector((state) => state.shops.userShop);
    const [selectedIndex, setSelectedIndex] = useState(shop ? index : 9);

    // useEffect(() => {
    //     setSelectedIndex(shop ? index: 9);
    // }, [index]);

    const options = shop
        ? [
              "Home page",
              "Orders Management",
              "Products Management",
              "Shop Management",
              "Stocks",
              "Billing Information",
              "Customer Service",
              "Help Center",
          ]
        : ["Register as a seller"];
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
        setSelectedIndex(options.length == 1 ? 9 : index);
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
            case 9:
                return <SellerRegister />;
            default:
                return <p>default</p>;
        }
    };
    return (
        <div style={{ width: "100%", marginBottom: "2em", zIndex: "0" }}>
            <Grid
                container
                style={{
                    margin: "0 auto",
                    maxWidth: "1600px",
                    minWidth: "1333px",
                }}
                spacing={5}
            >
                <Grid item xs={2} style={{ margin: 0 }}>
                    <section
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            marginLeft: "0.5em",
                        }}
                    >
                        <img
                            src={avatar}
                            style={{
                                width: "3em",
                                display: "inline-block",
                                marginRight: "1em",
                                borderRadius: "50%",
                            }}
                            alt={"oven"}
                        />
                        <p
                            style={{
                                display: "inline-block",
                                fontSize: "0.8em",
                                marginBottom: 0,
                                paddingTop: "1em",
                            }}
                        >
                            <span>Account of</span> <br />{" "}
                            <span
                                style={{ fontWeight: 600, fontSize: "1.2em" }}
                            >
                                {user.name}
                            </span>{" "}
                        </p>
                    </section>

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
                                    (event) => handleMenuItemClick(event, index)
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
                </Grid>
                <Grid item xs={10}>
                    <Grid container>{renderMenuItemComponent()}</Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SellerDashbroad;
