import React, { useEffect, useState, useRef } from "react";
import {
    makeStyles,
    createTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Card from "../UI/Card";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../layout/NavBar";
import Voucher from "../UI/Voucher";
import * as shopActions from "../../store/actions/shopActions";
import * as productAction from "../../store/actions/productActions";
import * as configActions from "../../store/actions/configActions";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },
    container: {
        width: "1333px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: "0.5em",
        borderRadius: "0.5em",
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
    },
    avatar: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
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
        borderRight: "1px solid #E0E0E0",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#F4F4F4",
        },
    },
    navLink: {
        textDecoration: "none",
        color: "#86868f",
    },
}));

//All products of a shop
const ShopProducts = (props) => {
    const classes = useStyle();
    const products = props.products;
    return products.map((prod, index) => (
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
            // sold={Math.floor(Math.random() * 50) + 50} // picking random num since this feature isn't implemented yet
            // hot={true}
            // timeInMilliSec={(Math.floor(Math.random() * 10) + 2) * 100000} // 50 seconds
            link={true}
            style={{ height: "330px" }}
        />
    ));
};

//Deal products of day
const DealProducts = (props) => {
    const classes = useStyle();
    const products = props.products;
    return products.map((prod, index) => (
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
            timeInMilliSec={(Math.floor(Math.random() * 10) + 2) * 100000} // 50 seconds
            link={true}
            style={{ height: "330px" }}
        />
    ));
};

//Shop voucher
const ShopVoucher = (props) => {
    const vouchers = props.vouchersInShop;
    return (
        <ListVoucher
            vouchers={vouchers}
            style={{ height: "110px" }}
        />
    );
};
const ListVoucher = (props) => {
    const [scrollX, setScrollX] = useState(0);
    const listRef = useRef(null);
    const classes = useStyle();

    const handleScroll = (direction) => {
        const scrollAmount = direction === "left" ? -110 : 110;
        setScrollX(scrollX + scrollAmount);
        listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };
    const canScrollLeft = scrollX > 0;
    const canScrollRight = scrollX < (props.vouchers.length-2) * 110 - 32;
    return (
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
                    {props.vouchers && props.vouchers.map((item, index) => (
                        <div className={classes.voucher__container}>
                            <Voucher
                                key={index}
                                code={item}
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
    const vouchersInShop = configsInShop.flatMap((item) => item.vouchers);
    useEffect(() => {
        dispatch(shopActions.getShopById(shopId));
        dispatch(productAction.getProductsByShopId(shopId));
    }, []);

    useEffect(() => {
        dispatch(configActions.getConfigsByShopId(shopId));
    }, []);

    return (
        <div
            style={{
                width: "100%",
                minWidth: "1333px",
                height: "100%",
                backgroundColor: "#F4F4F4",
                overflowX: "visible",
            }}
        >
            <NavBar {...props} />
            <div
                className={classes.root}
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className={classes.container}>
                    <Grid container>
                        <Grid
                            item
                            container
                            xs={12}
                            className={classes.block}
                            style={{ height: "148px" }}
                        >
                            <Grid item container xs={12}>
                                <Grid item container xs={4}>
                                    <Grid item xs={3}>
                                        <div
                                            className={classes.avatar}
                                            style={{
                                                backgroundColor: "yellow",
                                            }}
                                        >
                                            <img src="" alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={9}>
                                        {shop ? (
                                            <div>
                                                <p>{shop.name}</p>
                                                <span>Shop description</span>
                                            </div>
                                        ) : (
                                            <p>Shop name</p>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Button
                                        color="primary"
                                        size="medium"
                                        variant="outlined"
                                    >
                                        Theo dõi
                                    </Button>
                                    <Button
                                        color="secondary"
                                        size="medium"
                                        variant="outlined"
                                    >
                                        Chat
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={2}>
                                    <Link to={`#`} className={classes.navLink}>
                                        <div className={classes.navItem}>
                                            Cửa hàng
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to={`#`} className={classes.navLink}>
                                        <div className={classes.navItem}>
                                            Tất cả sản phẩm
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to={`#`} className={classes.navLink}>
                                        <div className={classes.navItem}>
                                            Mã giảm giá
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    <Link to={`#`} className={classes.navLink}>
                                        <div className={classes.navItem}>
                                            Giá sốc hôm nay
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className={classes.searchBox}>
                                        <SearchIcon />
                                        <TextField
                                            placeholder={"Find in this shop"}
                                            size="small"
                                        ></TextField>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.block}>
                            <div>
                                {configsInShop && configsInShop.length > 0 ? (
                                    <ShopVoucher
                                        vouchersInShop={vouchersInShop}
                                    />
                                ) : (
                                    <div>Shop không có voucher nào</div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.block}>
                            <div>
                                {productsInShop && productsInShop.length > 0 ? (
                                    <DealProducts products={productsInShop} />
                                ) : (
                                    <div>Shop không có sản phẩm nào</div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.block}>
                            <div>
                                <h2>Shop banner</h2>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.block}>
                            <div>
                                {productsInShop && productsInShop.length > 0 ? (
                                    <ShopProducts products={productsInShop} />
                                ) : (
                                    <div>Shop không có sản phẩm nào</div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
