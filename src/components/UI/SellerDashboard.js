import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SellerHome from "./SellerDashbroadComponents/SellerHome";
import OrdersManagement from "./SellerDashbroadComponents/OrdersManagement";
import ProductsManagement from "./SellerDashbroadComponents/ProductsManagement";
import ShopManagement from "./SellerDashbroadComponents/ShopManagement";
import Stocks from "./SellerDashbroadComponents/Stocks";
import BillingInformation from "./SellerDashbroadComponents/BillingInformation";
import Reports from "./SellerDashbroadComponents/Reports";
import HelpCenter from "./SellerDashbroadComponents/HelpCenter";
import DashboardHeader from "./DashboardHeader";

import * as shopActions from "../../store/actions/shopActions";
import { getConfigsByShopId } from "../../store/actions/configActions";
import { getAllStocksOfAShop } from "../../store/actions/stockActions";
import { Typography } from "antd";

const SellerDashbroad = () => {
    const index = 0;
    const classes = userStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);
    const shop = useSelector((state) => state.shops.userShop);
    const [selectedIndex, setSelectedIndex] = useState(index);

    useEffect(() => {
        if (user && (user.role === "seller" || user.role === "admin"))
            dispatch(shopActions.getShopByUserId(user._id));
    }, []);

    useEffect(() => {
        if (shop) {
            dispatch(getConfigsByShopId(shop.id));
            dispatch(getAllStocksOfAShop(shop.id));
        }
    }, []);

    const options = [
        "Trang chủ",
        "Đơn hàng",
        "Sản phẩm",
        "Cấu hình",
        "Kho hàng",
        "Thông tin thanh toán",
        "Báo cáo",
        "Trung tâm trợ giúp",
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
                return <Reports />;
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
                minWidth: "1422px",
                marginBottom: "2em",
                zIndex: "0",
            }}
        >
            <DashboardHeader user={user} />
            <div style={{ height: "64px" }}></div>
            {shop && shop.status === "active" && (
                <Grid
                    container
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: 0,
                        minWidth: "1200px",
                    }}
                    spacing={3}
                >
                    <Grid
                        item
                        xs={2}
                        style={{ margin: 0, backgroundColor: "#fff" }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <section
                                style={{ position: "sticky", top: "76px" }}
                            >
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
                                                    handleMenuItemClick(
                                                        event,
                                                        index
                                                    )
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
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container>{renderMenuItemComponent()}</Grid>
                    </Grid>
                </Grid>
            )}
            {shop && shop.status === "pending" && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ color: "#f44336" }}>
                        Cửa hàng của bạn đang chờ duyệt
                    </h1>
                    <Typography>
                        Vui lòng liên hệ trợ giúp nếu cửa hàng của bạn chưa được
                        duyệt trong vòng 48h
                    </Typography>
                </div>
            )}
            {shop && shop.status === "inactive" && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{ color: "#f44336" }}>
                        Cửa hàng của bạn đang bị dừng hoạt động
                    </h1>
                    <Typography>
                        Vui lòng liên hệ bộ phẩn chăm sóc khách hàng để biết
                        thêm thông tin
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default SellerDashbroad;
