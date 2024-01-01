import React, { useState } from "react";
import userStyles from "../../styles/ProductNavigationStyles";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import TvIcon from "@material-ui/icons/Tv";
import HeadsetIcon from "@material-ui/icons/Headset";
import LaptopIcon from "@material-ui/icons/Laptop";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LanguageIcon from "@material-ui/icons/Language";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import OvenIcon from "../../image/oven.png";
import FryingPanIcon from "../../image/fryingPan.png";
import CleanerIcon from "../../image/cleaner.png";
import LipStickIcon from "../../image/lipstick.png";

const ProductNavigation = () => {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(1);
    const options = [
        "Điện thoại - Laptop",
        "Điện tử - Điện lạnh",
        "Phụ kiện - Thiết bị số",
        "Laptop",
        "Camera",
        "Điện gia dụng",
        "Nhà cửa đời sống",
        "Hàng tiêu dùng - Thực phẩm",
        "Mẹ và bé",
        "Làm đẹp",
        "Thời trang",
        "Thể thao - Dã ngoại",
        "Xe máy, ô tô, xe đạp",
        "Hàng quốc tế",
        "Sách, VPP & Quà tặng",
        "Giảm giá, khuyến mãi",
    ];
    const optionsPath = [
        "/phone-tablet",
        "/electronics",
        "/accessories",
        "/laptop",
        "/camera",
        "/e-appliances",
        "/house-item",
        "/consumer-goods",
        "/for-baby",
        "/beauty",
        "/fashion",
        "/sport",
        "/motorcycles",
        "/international-goods",
        "/books-vpp-gifts",
        "/voucher",
    ];
    const optionsIcon = [
        <PhoneAndroidIcon className={classes.item} />,
        <TvIcon className={classes.item} />,
        <HeadsetIcon className={classes.item} />,
        <Badge
            overlap="rectangular"
            color="secondary"
            badgeContent={
                <span style={{ fontSize: "0.8em", padding: "0.2em" }}>new</span>
            }
        >
            <LaptopIcon className={classes.item} />
        </Badge>,
        <CameraAltIcon className={classes.item} />,
        <img src={OvenIcon} style={{ width: "1.5em" }} alt={"oven"} />,
        <img src={FryingPanIcon} style={{ width: "1.5em" }} alt={"oven"} />,
        <img src={CleanerIcon} style={{ width: "1.5em" }} alt={"oven"} />,
        <Icon className="fas fa-prescription-bottle" />,
        <img src={LipStickIcon} style={{ width: "1.5em" }} alt={"oven"} />,
        <Icon
            className="fas fa-tshirt"
            style={{ marginLeft: "-.2em", paddingRight: "1em" }}
        />,
        <SportsSoccerIcon className={classes.item} />,
        <Badge
            overlap="rectangular"
            color="secondary"
            badgeContent={<WhatshotIcon style={{ width: "0.6em" }} />}
        >
            <MotorcycleIcon className={classes.item} />,
        </Badge>,
        <LanguageIcon className={classes.item} />,
        <MenuBookIcon className={classes.item} />,
        <CreditCardIcon className={classes.item} />,
    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classNames(classes.root, classes.sectionDesktop3)}>
            <Grid container>
                <Grid item xs={12} style={{ margin: 0, padding: "3%" }}>
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        style={{ margin: 0, padding: 0 }}
                    >
                        {options.map((option, index) => (
                            <Link
                                to={`/product${optionsPath[index]}`}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 0,
                                        paddingTop: "4%",
                                        paddingBottom: "4%",
                                        alignItems: "center",
                                        borderRadius: "0.5em",
                                    }}
                                    key={option}
                                    button
                                    selected={index === selectedIndex}
                                    onClick={(event) =>
                                        handleMenuItemClick(event, index)
                                    }
                                    // onMouseEnter={(event) =>
                                    //     handleMenuItemClick(event, index)
                                    // }
                                >
                                    <ListItemIcon
                                        style={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            paddingTop: "3%",
                                            paddingBottom: "3%",
                                            minWidth: "40px",
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
                                            marginTop: "1%",
                                            marginBottom: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            color: "#000",
                                        }}
                                        className={classes.item2}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Grid>
                {/*  */}
            </Grid>
        </div>
    );
};

export default ProductNavigation;
