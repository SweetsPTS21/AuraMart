import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import DefaultAvatar from "../../image/avatar.png";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountInformation from "./AccountDashboardComponents/AccountInformation";
import MyNotice from "./AccountDashboardComponents/MyNotice";
import OrderManagement from "./AccountDashboardComponents/OrderManagement";
import Address from "./AccountDashboardComponents/Address";
import BillingInformation from "./AccountDashboardComponents/BillingInformation";
import ReviewProductPurchased from "./AccountDashboardComponents/ReviewProductPurchased";
import ProductsViewed from "./AccountDashboardComponents/ProductsViewed";
import FavoriteProducts from "./AccountDashboardComponents/FavoriteProducts";
import ProductsToBuyLater from "./AccountDashboardComponents/ProductsToBuyLater";
import MyComment from "./AccountDashboardComponents/MyComment";
import HelpCenter from "./AccountDashboardComponents/HelpCenter";
import { useSelector } from "react-redux";
import MyVoucher from "./AccountDashboardComponents/MyVoucher";
import { getUserAddress } from "../../store/actions/addressActions";
import { getOrdersByUserId } from "../../store/actions/orderActions";
import { getAllUserReviews } from "../../store/actions/reviewActions";

const AccountDashBoard = (props) => {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(
        props.index ? props.index : 0
    );
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setSelectedIndex(props.index);
    }, [props.index]);

    useEffect(() => {
        dispatch(getUserAddress(user.id));
        dispatch(getOrdersByUserId(user.id));
        dispatch(getAllUserReviews(user.id));
    }, [dispatch, user.id]);

    const options = [
        "Thông tin tài khoản",
        "Thông báo của tôi",
        "Đơn mua",
        "Địa chỉ của tôi",
        "Voucher của tôi",
        "Thông tin thanh toán",
        "Đánh giá sản phẩm đã mua",
        "Sản phẩm đã xem",
        "Sản phẩm yêu thích",
        "Sản phẩm mua sau",
        "Đánh giá của tôi",
        "Trung tâm hỗ trợ",
    ];
    const optionsIcon = [
        <PersonIcon className={classes.item} />,
        <NotificationsIcon className={classes.item} />,
        <MenuBookIcon className={classes.item} />,
        <RoomIcon className={classes.item} />,
        <CreditCardIcon className={classes.item} />,
        <CreditCardIcon className={classes.item} />,
        <EventNoteIcon className={classes.item} />,
        <VisibilityIcon className={classes.item} />,
        <FavoriteIcon className={classes.item} />,
        <ShoppingCartIcon className={classes.item} />,
        <CommentIcon className={classes.item} />,
        <QuestionAnswerIcon className={classes.item} />,
    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        // setToggleDrawer(true)
    };
    const renderMenuItemComponent = () => {
        switch (selectedIndex) {
            case 0:
                return <AccountInformation />;
            case 1:
                return <MyNotice />;
            case 2:
                return <OrderManagement />;
            case 3:
                return <Address />;
            case 4: //voucher
                return <MyVoucher type={"user"} />;
            case 5:
                return <BillingInformation />;
            case 6:
                return <ReviewProductPurchased />;
            case 7:
                return <ProductsViewed />;
            case 8:
                return <FavoriteProducts />;
            case 9:
                return <ProductsToBuyLater />;
            case 10:
                return <MyComment />;
            case 11:
                return <HelpCenter />;
            default:
                return <p>default</p>;
        }
    };
    return (
        <div style={{ width: "100%", marginBottom: "2em", zIndex: "0" }}>
            <Grid
                container
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    marginTop: "1.5em",
                }}
            >
                <Grid item xs={3} style={{ margin: 0 }}>
                    <section
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            marginLeft: "0.5em",
                        }}
                    >
                        <img
                            src={
                                userData.avatar !== "no-photo.jpg"
                                    ? userData.avatar
                                    : DefaultAvatar
                            }
                            style={{
                                width: "64px",
                                height: "64px",
                                display: "inline-block",
                                marginRight: "1em",
                                borderRadius: "50%",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
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
                            <span>Tài khoản của</span> <br />{" "}
                            <span
                                style={{ fontWeight: 600, fontSize: "1.2em" }}
                            >
                                {userData.name}
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
                <Grid item xs={9}>
                    <Grid container>{renderMenuItemComponent()}</Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default AccountDashBoard;
