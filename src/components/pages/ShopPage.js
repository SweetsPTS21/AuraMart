import React, { useEffect, useState, useRef } from "react";
import {
    makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Card from "../UI/Card";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../layout/NavBar";
import Voucher from "../UI/Voucher";
import Footer from "../layout/Footer";
import ItemContainer from "../UI/ItemContainer";
import { newChat, addPerson, getChats } from "react-chat-engine";

import * as shopActions from "../../store/actions/shopActions";
import * as productAction from "../../store/actions/productActions";
import * as configActions from "../../store/actions/configActions";
import * as voucherActions from "../../store/actions/voucherActions";
import Banner from "../UI/Banner";
import { Typography } from "@material-ui/core";
const defaultBackground =
    "https://getwallpapers.com/wallpaper/full/7/1/6/464954.jpg";
const defaultAvatar =
    "https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg.webp";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },

    container: {
        width: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: "0.5em",
        borderRadius: "0.5em",
    },

    section: {
        width: "100%",
    },
    voucher__tittle: {
        marginLeft: "1.8em",
        marginBottom: "0.8em",
    },
    voucher__container: {
        display: "flex",
    },

    header: {
        height: "148px",
    },

    block: {
        display: "flex",
        marginBottom: "1em",
        padding: "0.5em",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5em",
    },

    shopInfo_info: {
        padding: "0.5em",
    },

    shopInfo__name: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        "& p": {
            fontSize: "1.5em",
            fontWeight: "bold",
            margin: "0",
        },
        "& span": {
            fontSize: "0.8em",
            color: "#9E9E9E",
        },
    },
    shopInfo__image: {},

    shopInfo__options: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    shopInfo__navbar: {
        display: "flex",
        padding: "0 0.5em",
    },

    shopInfo__button: {
        color: "#FFF",
        border: "1px solid #FFF",
        marginLeft: "0.5em",
    },

    avatar: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        border: "1px solid #E0E0E0",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #E0E0E0",
        borderRadius: "0.5em",
        padding: "0.5em",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5em",
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "none",
            color: "#F4F4F4",
        },
    },

    navLink: {
        textDecoration: "none",
        color: "#FFF",
        "&:visited": {
            color: "#FFF",
        },
    },
}));

//Shop header and info
const ShopInfo = (props) => {
    const classes = useStyle();
    const shop = props.shop ? props.shop : {};
    const decoration = props.decorationsInShop;
    const shopBackground = decoration[1] ? decoration[1] : defaultBackground;
    const shopAvatar =
        shop.avatar !== "no-photo.jpg" ? shop.avatar : defaultAvatar;

    const userData = useSelector((state) => state.auth.userData);
    const [chatID, setChatID] = useState(null);

    const chatEngineData = {
        projectID: "0c8bb7fc-8146-4063-99f5-77c2f518da58",
        userName: userData.email,
        userPassword: userData._id,
    };

    const createNewChat = () => {
        newChat(
            chatEngineData,
            {
                title: shop.name,
                admin_user: userData.email,
                access_key: userData._id,
            },
            function (data) {
                setChatID(data.id);
            }
        );
    };

    const handleChatClick = () => {
        getChats(chatEngineData, (data) => {
            const chat = data.find(
                (chat) =>
                    chat.admin.username === userData.email &&
                    chat.title === shop.name
            );
            if (chat) {
                setChatID(chat.id);
            } else {
                createNewChat();
            }
        });
    };
    useEffect(() => {
        if (chatID) {
            addPerson(chatEngineData, chatID, "seller01", function (data) {
                console.log(data);
            });
        }
    }, [chatID, chatEngineData]);

    return (
        <Grid
            item
            container
            xs={12}
            className={classes.block}
            style={{
                height: "148px",
                color: "white",
                borderRadius: "0.5em",
                backgroundImage: `url(${shopBackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <Grid item container xs={12} className={classes.shopInfo_info}>
                <Grid item container xs={4} className={classes.shopInfo__image}>
                    <Grid item xs={3}>
                        <div className={classes.avatar}>
                            <img src={shopAvatar} alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={9} className={classes.shopInfo__name}>
                        {shop ? (
                            <div>
                                <p>{shop.name}</p>
                                <span>{shop.description}</span>
                            </div>
                        ) : (
                            <>
                                <p>Shop name</p>
                                <span>Shop description</span>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={8} className={classes.shopInfo__options}>
                    <Button className={classes.shopInfo__button} size="medium">
                        Theo dõi
                    </Button>
                    <Button
                        className={classes.shopInfo__button}
                        size="medium"
                        onClick={handleChatClick}
                    >
                        Chat
                    </Button>
                </Grid>
            </Grid>
            <Grid item container xs={12} className={classes.shopInfo__navbar}>
                <Grid item xs={2}>
                    <Link
                        to="shopInfo"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={classes.navLink}
                        style={{ fontWeight: "bold" }}
                    >
                        <div className={classes.navItem}>Cửa hàng</div>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link
                        to="shopProducts"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={classes.navLink}
                    >
                        <div className={classes.navItem}>Tất cả sản phẩm</div>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link
                        to="shopVoucher"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={classes.navLink}
                    >
                        <div className={classes.navItem}>Mã giảm giá</div>
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <Link
                        to="shopDeal"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className={classes.navLink}
                    >
                        <div className={classes.navItem}>Giá sốc hôm nay</div>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.searchBox}>
                        <SearchIcon color="primary" />
                        <TextField
                            placeholder={"Find in this shop"}
                            size="small"
                        ></TextField>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

//All products of a shop
const ShopProducts = (props) => {
    const classes = useStyle();
    const products = props.productsInShop ? props.productsInShop : [];
    const [seeMoreDiscountedProd, setSeeMoreDiscountedProd] = useState(10);
    const [loadingDisProd, setLoadingDisProd] = useState(false);

    const renderShopProducts = () => {
        return products && products.length > 0 ? (
            products.map((prod, index) => (
                <Card
                    key={index}
                    type={"default"}
                    id={prod.id}
                    slug={prod.slug}
                    price={prod.price}
                    discount={prod.discount}
                    title={prod.name}
                    image={
                        prod.photo === "no-photo.jpg"
                            ? BottleWarmer
                            : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                    }
                    link={true}
                    style={{ height: "330px", width: "184px" }}
                />
            ))
        ) : (
            <div>Shop không có sản phẩm nào</div>
        );
    };

    return (
        <ItemContainer
            length={products.length}
            type={"container"}
            title={"All products you might like"}
            seeMore={() => {
                seeMoreDiscountedProd((val) => val + 10);
                setLoadingDisProd(true);
                setTimeout(() => setLoadingDisProd(false), 500);
            }}
            loading={loadingDisProd}
            itemWidth={"184px"}
        >
            {renderShopProducts()}
        </ItemContainer>
    );
};

//Deal products of day
const DealProducts = (props) => {
    const classes = useStyle();
    const products = props.productsInShop ? props.productsInShop : [];
    const [seeMoreProd, setSeeMoreProd] = useState(20);
    const [loadingProd, setLoadingProd] = useState(false);

    const renderDealProducts = () => {
        return products && products.length > 0 ? (
            products.map((prod, index) => (
                <Card
                    key={index}
                    type={"deal"}
                    id={prod.id}
                    slug={prod.slug}
                    price={prod.price}
                    discount={prod.discount}
                    title={prod.name}
                    image={
                        prod.photo === "no-photo.jpg"
                            ? BottleWarmer
                            : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                    }
                    sold={Math.floor(Math.random() * 50) + 50} // picking random num since this feature isn't implemented yet
                    hot={true}
                    timeInMilliSec={
                        (Math.floor(Math.random() * 10) + 2) * 100000
                    } // 50 seconds
                    link={true}
                    style={{ height: "330px", width: "170px" }}
                />
            ))
        ) : (
            <div>Shop không có sản phẩm nào</div>
        );
    };

    return (
        <ItemContainer
            length={products.length}
            type={"slider"}
            title={"All products you might like"}
            seeMore={() => {
                setSeeMoreProd((val) => val + 10);
                setLoadingProd(true);
                setTimeout(() => setLoadingProd(false), 500);
            }}
            loading={loadingProd}
        >
            {renderDealProducts()}
        </ItemContainer>
    );
};

//Shop vouchers
const ShopVoucher = (props) => {
    const [scrollX, setScrollX] = useState(0);
    const listRef = useRef(null);
    const classes = useStyle();
    const vouchers = props.vouchersInShop ? props.vouchersInShop : [];

    const handleScroll = (direction) => {
        const scrollAmount = direction === "left" ? -110 : 110;
        setScrollX(scrollX + scrollAmount);
        listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };
    const canScrollLeft = scrollX > 0;
    const canScrollRight = scrollX < (vouchers.length - 2) * 110 - 32;
    return (
        <Grid
            item
            xs={12}
            className={classes.block}
            style={{ display: "flex", flexDirection: "column", padding: "1em" }}
        >
            <Typography variant="h5" className={classes.voucher__tittle}>
                Shop vouchers
            </Typography>
            {vouchers && vouchers.length > 0 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        onClick={() => handleScroll("left")}
                        disabled={!canScrollLeft}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div
                        style={{
                            width: "1205px",
                            overflow: "hidden",
                        }}
                    >
                        <List
                            ref={listRef}
                            style={{
                                display: "flex",
                                padding: 0,
                                margin: 0,
                                transform: `translateX(${-scrollX}px)`,
                            }}
                        >
                            {vouchers &&
                                vouchers.map((item, index) => (
                                    <div className={classes.voucher__container}>
                                        <Voucher
                                            key={index}
                                            voucher={item}
                                            type={"shop"}
                                            // description={voucher.description}
                                            // expiredDate={voucher.expiredDate}
                                            style={{ height: "110px" }}
                                        />
                                    </div>
                                ))}
                        </List>
                    </div>
                    <IconButton
                        onClick={() => handleScroll("right")}
                        disabled={!canScrollRight}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
            ) : (
                <div>Shop không có voucher nào</div>
            )}
        </Grid>
    );
};

const ShopBanner = (props) => {
    const classes = useStyle();
    const listImage = props.bannersInShop;
    return (
        <Grid item xs={12} className={classes.block}>
            <div>
                {listImage && listImage.length > 0 ? (
                    <Banner listImage={listImage} />
                ) : (
                    <div>Shop không có banner nào</div>
                )}
            </div>
        </Grid>
    );
};

const ShopPage = (props) => {
    const { shopId } = useParams();
    const classes = useStyle();
    const dispatch = useDispatch();
    const shop = useSelector((state) => state.shops.currentShop);
    const productsInShop = useSelector(
        (state) => state.products.productsInShop
    );
    const configsInShop = useSelector((state) => state.configs.configsInShop);
    const currentConfig = configsInShop
        ? configsInShop.filter((item) => item.using === true)
        : [];
    const decorationsInShop = currentConfig
        ? currentConfig.flatMap((item) => item.decoration)
        : [];
    const vouchersInShop = useSelector((state) => state.vouchers.shopVouchers);
    const bannersInShop = currentConfig
        ? currentConfig.flatMap((item) => item.banner)
        : [];

    useEffect(() => {
        dispatch(shopActions.getShopById(shopId));
        dispatch(productAction.getProductsByShopId(shopId));
    }, [shopId]);

    useEffect(() => {
        dispatch(configActions.getConfigsByShopId(shopId));
    }, [shopId]);

    useEffect(() => {
        dispatch(voucherActions.getVouchersByShopId(shopId));
    }, [shopId]);

    return (
        <div
            style={{
                width: "100%",
                minWidth: "1200px",
                height: "100%",
                backgroundColor: "#F4F4F4",
                overflowX: "visible",
            }}
        >
            <NavBar {...props} />
            <div className={classes.root}>
                <div className={classes.container}>
                    <Grid container>
                        <Element name="shopInfo" className={classes.section}>
                            <ShopInfo
                                shop={shop}
                                decorationsInShop={decorationsInShop}
                            />
                        </Element>
                        <Element name="shopVoucher" className={classes.section}>
                            <ShopVoucher vouchersInShop={vouchersInShop} />
                        </Element>
                        <Element name="shopDeal" className={classes.section}>
                            <DealProducts productsInShop={productsInShop} />
                        </Element>
                        <ShopBanner bannersInShop={bannersInShop} />
                        <Element
                            name="shopProducts"
                            className={classes.section}
                        >
                            <Grid container style={{padding: 0, margin: 0}}>
                                <Grid item xs={2}>
                                    <p>This is filter</p>
                                </Grid>
                                <Grid item xs={10}>
                                    <ShopProducts
                                        productsInShop={productsInShop}
                                    />
                                </Grid>
                            </Grid>
                        </Element>
                    </Grid>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ShopPage;
