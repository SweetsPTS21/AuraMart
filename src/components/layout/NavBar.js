import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Icon from "@material-ui/core/Icon";
import { Grid } from "@material-ui/core";

import aumartLogo from "../../image/logo.png";
import userStyles from "../../styles/NavbarStyles";
import { loadCSS } from "fg-loadcss";
import ProductNavigation from "../UI/ProductNavigation";
import TransitionsModal from "../user/UserModal";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { message } from "antd";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { ChatBubbleOutline } from "@material-ui/icons";
import { ChatEngine } from "react-chat-engine";

const chatPublicKey = "0c8bb7fc-8146-4063-99f5-77c2f518da58";

const NavBar = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // function to open and close modal
    const [open, setOpen] = useState(false);
    const [index] = useState(0);
    const [search, setSearch] = useState("");
    const [position, setPosition] = useState(false);

    const [openChat, setOpenChat] = useState(false);

    const cartQuantity = useSelector((state) =>
        Object.keys(state.cart).length !== 0
            ? Object.keys(state.cart.items).length
            : null
    );
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const allProducts = useSelector((state) => state.products.products);
    const user = useSelector((state) => state.auth.userData);

    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleOpenChatPopup = () => {
        setOpenChat(!openChat);
    };

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                setPosition(true);
            } else {
                setPosition(false);
            }
        });
        window.scrollTo(0, 0);
        loadCSS(
            "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
            document.querySelector("#font-awesome-css")
        );
        setOpen(!!props.showForm);
        !!props.showForm && message.info("You need to be logged in!");
        props.checkIsAdmin !== undefined &&
            props.checkIsAdmin &&
            message.error(
                "you need to be logged in as an admin to access this route"
            );
        props.checkIsSeller !== undefined &&
            props.checkIsSeller &&
            message.error(
                "you need to be logged in as an seller to access this route"
            );
    }, []);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [productModal, setProductModal] = useState(false);
    const [isLoginTip, isShowMenu] = useState(false);
    const [productNavigation, setProductNavigation] = useState(false);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link
                    to={"/orders"}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(
                            props.showForm !== undefined
                                ? props.showForm
                                : false
                        );
                    }}
                    className={classes.removeDefaultLink}
                >
                    <IconButton
                        aria-label="track orders"
                        color="inherit"
                        className={classes.iconNav}
                    >
                        <Icon
                            className={"fas fa-shipping-fast"}
                            style={{
                                fontSize: 20,
                                paddingTop: "0.05em",
                                width: "1.5em",
                            }}
                        />
                    </IconButton>
                </Link>
                <p>Đơn hàng</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="Notification"
                    color="inherit"
                    className={classes.iconNav}
                >
                    <Icon
                        className={"fas fa-bell"}
                        style={{
                            fontSize: 20,
                            paddingTop: "0.05em",
                            width: "1.5em",
                        }}
                    />
                </IconButton>
                <p>Thông báo</p>
            </MenuItem>
            <MenuItem onClick={handleOpenModal}>
                <IconButton
                    aria-label="Log In"
                    color="inherit"
                    className={classes.iconNav}
                >
                    <Icon
                        className={"fas fa-user"}
                        style={{ paddingTop: "0.05em" }}
                    />
                </IconButton>
                <p>Đăng nhập</p>
            </MenuItem>
        </Menu>
    );

    const authLinks = isLoggedIn ? (
        // if user is logged in, show user menu
        <section
            className={classNames({ [classes.loginToolTip]: isLoginTip })}
            onMouseLeave={() => {
                isShowMenu(false);
            }}
            style={{
                width: "20em",
                height: "8em",
                textAlign: "left",
                padding: "0.5em",
                backgroundColor: "#FFF",
                margin: 0,
                zIndex: "999999",
                display: "None",
            }}
        >
            <Button
                size={"medium"}
                className={classes.button}
                onClick={() => dispatch(authActions.logoutUser())}
            >
                Đăng xuất
            </Button>
            <Link
                to={"/dashboard/0"}
                onClick={(e) => e.stopPropagation()}
                className={classes.removeDefaultLink}
            >
                <Button size={"medium"} className={classes.button}>
                    Tài khoản
                </Button>
            </Link>
            {user && user.role != "user" ? (
                <Link
                    to={"/seller/0"}
                    onClick={(e) => e.stopPropagation()}
                    className={classes.removeDefaultLink}
                >
                    <Button size={"medium"} className={classes.button}>
                        Cửa hàng của tôi {user.role ? `(${user.role})` : "null"}
                    </Button>
                </Link>
            ) : (
                <Link
                    to={"/seller/register"}
                    onClick={(e) => e.stopPropagation()}
                    className={classes.removeDefaultLink}
                >
                    <Button size={"medium"} className={classes.button}>
                        Bán hàng cùng Aumart
                    </Button>
                </Link>
            )}
        </section>
    ) : (
        <div></div>
    );

    const NavSection2 = (
        <Toolbar
            className={classNames(classes.toolbar, classes.sectionDesktop)}
            style={{
                padding: "0 10%",
                backgroundColor: "#FFFFFF",
                minHeight: "1.6em",
                height: "1.6em",
                marginTop: "-0.1em",
                marginBottom: "0.5em",
                justifyContent: "space-around",
            }}
        >
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Hot deal giảm đến 90%
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Túi Đeo Chéo Nam
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    IPhone 14 Pro Max
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Bitis Hunter
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Túi Xách Nam
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Mì Ăn Liền
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Loa Philips
                </Link>
            </Typography>
            <Typography
                className={classes.title}
                variant="subtitle2"
                noWrap
                component={"p"}
            >
                <Link to={"#"} className={classes.removeDefaultLink}>
                    Túi Đeo Chéo Xiaomi
                </Link>
                <IconButton
                    aria-label="where do you want to shop to?"
                    color="inherit"
                    style={{ padding: 0 }}
                >
                    <Icon
                        className={"fas fa-angle-down"}
                        style={{ fontSize: 14, width: "1.5em" }}
                    />
                </IconButton>
            </Typography>
        </Toolbar>
    );

    const NavSection3 = (
        <Toolbar
            className={classes.toolbar}
            style={{ backgroundColor: "#FFFFFF", padding: "0 8%" }}
            onMouseEnter={() => {
                setProductModal(false);
                setProductNavigation(false);
            }}
        >
            {/* <Link to={"/"} className={classes.removeDefaultLink}>
                <Typography className={classes.title3} variant="h6" noWrap>
                    <IconButton
                        aria-label="where do you want to shop to?"
                        color="inherit"
                        style={{ padding: 0 }}
                    >
                        <i
                            style={{
                                backgroundImage: `url(${sprite}?v=100000000)`,
                                backgroundPosition: "-148px 0px",
                                width: "50px",
                                height: "33px",
                                filter: "opacity(0.5) drop-shadow(0 0 0 white) drop-shadow(0 0 0 white) drop-shadow(0 0 0 white)",
                            }}
                        />
                    </IconButton>

                    
                </Typography>
            </Link> */}
            <Link to={"/"} className={classes.removeDefaultLink}>
                <img
                    src={aumartLogo}
                    alt={"logo"}
                    className={classes.aumartLogo}
                />
            </Link>
            <div className={classes.search} id={"autocomContainer"}>
                <div
                    className={classes.searchIcon}
                    onClick={() =>
                        search.length > 0 && navigate(`/product/${search}`)
                    }
                >
                    <SearchIcon />
                </div>
                {allProducts !== null &&
                    allProducts !== undefined &&
                    allProducts.length > 0 && (
                        <Autocomplete
                            id="autocomInput"
                            freeSolo
                            options={allProducts}
                            classes={{
                                option: classes.option,
                            }}
                            style={{
                                width: "90%",
                                marginLeft: "4em",
                                paddingRight: "2em",
                            }}
                            getOptionLabel={(option) => {
                                return option.name;
                            }}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            onInputChange={(e) => {
                                e !== null && setSearch(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                e.charCode === 13 &&
                                    navigate(`/product/${search}`); // if enter key is pressed redirect to product category and search
                            }}
                            renderOption={(option) => (
                                <p
                                    style={{
                                        padding: "0 !important",
                                        margin: "0 !important",
                                        width: 1000,
                                        color: "#000",
                                    }}
                                    onClick={() =>
                                        navigate(`/product/${option.name}`)
                                    }
                                >
                                    {option.name}
                                </p>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={search}
                                    style={{ color: "white" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            )}
                        />
                    )}
            </div>
            <div className={classes.sectionDesktop2}>
                <IconButton
                    aria-label="track orders"
                    color="inherit"
                    className={classes.iconNav}
                >
                    <Icon
                        className={"fas fa-shipping-fast"}
                        style={{
                            fontSize: 20,
                            paddingTop: "0.05em",
                            width: "1.5em",
                            marginRight: "0.3em",
                        }}
                    />
                    <Link
                        to={"/orders"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(
                                props.showForm !== undefined
                                    ? props.showForm
                                    : false
                            );
                            props.showForm !== undefined &&
                                props.showForm &&
                                message.info("You need to be logged in!");
                        }}
                        className={classes.removeDefaultLink}
                    >
                        <span className={classes.navText}>Đơn hàng</span>
                    </Link>
                </IconButton>
                <IconButton
                    aria-label="Notification"
                    color="inherit"
                    className={classes.iconNav}
                >
                    <Icon
                        className={"fas fa-bell"}
                        style={{
                            fontSize: 20,
                            paddingTop: "0.05em",
                            width: "1.5em",
                            marginRight: "0.3em",
                        }}
                    />
                    <Link to={"#"} className={classes.removeDefaultLink}>
                        <span className={classes.navText}>Thông báo</span>
                    </Link>
                </IconButton>
                <IconButton
                    aria-label="Log In"
                    color="inherit"
                    className={classes.iconNav}
                    onClick={() => {
                        isLoggedIn ? isShowMenu(true) : handleOpenModal();
                    }}
                    name="0" // 0 is login, 1 is register
                >
                    <Icon
                        className={"fas fa-user"}
                        style={{
                            fontSize: 20,
                            paddingTop: "0.05em",
                            width: "1.5em",
                            marginRight: "0.3em",
                        }}
                    />
                    <Link
                        to={"#"}
                        onMouseEnter={() => {
                            isShowMenu(true);
                        }}
                        className={classes.removeDefaultLink}
                    >
                        <span className={classes.navText}>Tài khoản</span>
                    </Link>
                </IconButton>
                {/* number of products */}
                <Link
                    to={"/cart"}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(
                            props.showForm !== undefined
                                ? props.showForm
                                : false
                        );
                        props.showForm !== undefined &&
                            props.showForm &&
                            message.info("You need to be logged in!");
                    }}
                    className={classes.removeDefaultLink}
                >
                    <Typography className={classes.navText2}>
                        <Badge
                            overlap="rectangular"
                            badgeContent={cartQuantity}
                            color="error"
                            className={classes.iconNav2}
                        >
                            <ShoppingCartIcon
                                style={{
                                    marginBottom: "0.2em",
                                    color: "#0060ff",
                                }}
                            />
                        </Badge>
                    </Typography>
                </Link>
                <TransitionsModal
                    open={open}
                    onClose={handleCloseModal}
                    piority={index}
                    closeModal={handleCloseModal}
                    {...props}
                    type={"authModal"}
                    adminForm={!!props.adminForm}
                />
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
        </Toolbar>
    );

    return (
        <section>
            <div className={classes.grow}>
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: "none",
                        color: "#86868f",
                    }}
                >
                    {/* {NavSection1} */}

                    {NavSection3}
                    {NavSection2}
                    {/* {NavSection4} */}
                </AppBar>
                {renderMobileMenu}
            </div>
            {productNavigation && (
                <ProductNavigation
                    toggleDrawer={() => {
                        setProductNavigation(false);
                    }}
                />
            )}
            {authLinks}
            {/*modal*/}
            <div
                className={classNames(classes.customModal, {
                    [classes.productModal]: productModal,
                })}
                style={{ display: "none" }}
            >
                <div
                    className={classes.customSubModal}
                    onMouseLeave={() => {
                        setProductModal(false);
                    }}
                >
                    <br />
                    <br />
                    <br />
                    You have not viewed any products. <br /> keep exploring
                    aumart, the product you viewed will show up here!
                </div>
            </div>
            {/*Fav Nav*/}
            {position && !openChat && (
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
                    // onClick={() => scrollToTop(50, 8.66)}
                    onClick={() => handleOpenChatPopup()}
                >
                    <ChatBubbleOutline fontSize="large" htmlColor="#fff" />
                </Fab>
            )}
            {openChat &&
                (isLoggedIn ? (
                    <div className={classes.chatPopup}>
                        <Grid container className={classes.chatPopupInner}>
                            <Grid
                                item
                                xs={12}
                                className={classes.chatPopupHeader}
                            >
                                <Typography style={{ fontSize: "20px" }}>
                                    Chat
                                </Typography>
                                <IconButton
                                    onClick={() => setOpenChat(!openChat)}
                                >
                                    <Icon className={"fas fa-times"} />
                                </IconButton>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.chatPopupContent}
                            >
                                {isLoggedIn && (
                                    <ChatEngine
                                        publicKey={chatPublicKey}
                                        userName={user.email}
                                        userPassword={user._id}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div className={classes.chatPopupNotLogin}>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    style={{
                                        fontSize: "20px",
                                        marginRight: "1em",
                                    }}
                                >
                                    Please login to chat
                                </Typography>
                                <IconButton
                                    onClick={() => setOpenChat(!openChat)}
                                >
                                    <Icon className={"fas fa-times"} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                ))}
        </section>
    );
};

export default NavBar;
