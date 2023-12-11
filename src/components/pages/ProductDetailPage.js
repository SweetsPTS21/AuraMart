import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import Grid from "@material-ui/core/Grid";
import {
    ThemeProvider,
    createTheme,
    makeStyles,
} from "@material-ui/core/styles";
import LoadingSpinner from "../layout/LoadingSpinner";
import TikiNow from "../../image/tiki-now.png";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Progress } from "reactstrap";
import Countdown from "react-countdown-now";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TikiTimerIcon from "../../image/tiki_timer.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CartIcon from "../../image/ic-cart@2x.png";
import ZoomIcon from "../../image/zoom-in.png";
// table
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import WarningIcon from "../../image/icon-warning.svg";
import ResIcon from "../../image/response-icon.png";
import StarIcon from "@material-ui/icons/Star";
// select
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// list divider
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { SideBySideMagnifier } from "react-image-magnifiers";
import { Link, useNavigate, useParams } from "react-router-dom";
import Moment from "moment";

import { QuestionAnswerRounded, StoreRounded } from "@mui/icons-material";
import noPhoto from "../../image/nophoto.png";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cartActions";
import * as productActions from "../../store/actions/productActions";
import * as reviewActions from "../../store/actions/reviewActions";
import * as addressActions from "../../store/actions/addressActions";
import ToggleButton from "@material-ui/lab/ToggleButton";
import TransitionsModal from "../user/UserModal";
import { message } from "antd";
import RecommendProduct from "../layout/RecommendProduct";
import TopProducts from "../layout/TopProducts";
import ReviewCard from "../layout/ReviewCard";

const defaultAvatar =
    "https://vcdn.tikicdn.com/cache/w100/ts/seller/21/ce/5c/b52d0b8576680dc3666474ae31b091ec.jpg.webp";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F4F4F4",
    },
    block: {
        marginBottom: "1.5em",
        borderRadius: "0.5em",
        backgroundColor: "#FFFFFF",
        padding: "16px",
    },
    loading: {
        position: "fixed",
        left: "55%",
        top: "65%",
    },
    container: {
        width: "100%",
        maxWidth: "1200px",
        justifyContent: "center",
    },
    discount: {
        color: "rgba(36, 36, 36, 0.6)",
        border: "1px solid #FFFFFF",
        padding: "3px 8px",
        fontSize: "0.75em",
        marginLeft: "0.5em",
        borderRadius: "0.5em",
        backgroundColor: "#f5f5fa",
    },
    removeDefaultLink: {
        textDecoration: "none",
        color: "inherit !important",
    },
    presentImage: {
        display: "block",
        width: "100%",
        pointerEvents: "none",
    },
    image: {
        borderRadius: "0.5em",
    },
    title: { fontSize: "1.5em", color: "#858585" },

    shopInfo__avatar: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        boxShadow: "0 0 0 1px #e5e5e5",
        overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },

    shopInfo__name: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "1em",
        "& p": {
            fontSize: "1.5em",
            fontWeight: "bold",
            margin: "0",
        },
        "& span": {
            fontSize: "0.8em",
        },
    },
    shop__info__rating: {
        display: "flex",
        flexDirection: "column",
    },
    info__details: {
        display: "flex",
        justifyContent: "space-between",
    },
    figure: {
        width: "100%",
        backgroundRepeat: "no-repeat",
        "&:hover img": {
            opacity: 0,
        },
    },
    tikiStoreIcon: {
        backgroundImage: "url(../../image/sprite.png)",
        backgroundPosition: "0 -409px",
        width: "24px",
        height: " 24px",
    },
    tikiRefund2: {
        backgroundImage: "url(../../image/sprite.png)",
        backgroundPosition: "-362px -281px",
        width: "24px",
        height: " 24px",
    },
    table: {
        width: "50%",
    },
    firstCell: {
        fontWeight: 500,
    },
    rating: {
        padding: "0.5em 0",
    },
    responseIcon: {
        // display: 'inline-block',
        width: "13px",
        height: "11px",
        backgroundPosition: "0 0",
    },
    question: {
        fontSize: "1em",
        fontWeight: 600,
    },
    imageContainer: {
        //minWidth: "408px",
        maxWidth: "408px",
        // paddingLeft: "1em",
        // paddingRight: "1em",
        borderRadius: "0.5em",
        flexDirection: "column",
        flexWrap: "nowrap",
    },
    answer: {
        fontSize: "0.9em",
        color: "grey",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        border: "1px solid #ccc",
        borderRadius: "0.5em",
    },
    grid: {
        padding: "0",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        borderRadius: "0.5em",
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    "@global .progress-bar": {
        backgroundColor: "#FF3B27 !important",
    },
    "@global span span .progress .progress-bar": {
        backgroundColor: "#007BFF !important",
    },
    "@global .MuiOutlinedInput-inputMarginDense": {
        // padding: 0,
        padding: "0.3em 0",
        borderRadius: 0,
        textAlign: "center",
        width: "2em",
    },
    "@global .MuiOutlinedInput-input": {
        textAlign: "center",
    },
    "@global .MuiOutlinedInput-root": {
        borderRadius: "0 !important",
    },
    "@global .MuiRating-label ": {
        display: "block !important",
        color: "inherit",
        fontSize: "inherit",
    },
    "@global .MuiOutlinedInput-notchedOutline": {
        marginTop: "0.025em !important",
        height: "2.005em !important",
        borderColor: "#3F51B5 !important",
    },
}));

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return (
            <span>
                <b>Offer is over!</b>
            </span>
        );
    } else {
        if (days !== 0) {
            return (
                <span>
                    <b>
                        {days} days {hours}:{minutes}:{seconds}
                    </b>
                </span>
            );
        }
        // Render a countdown
        return (
            <span>
                <b>
                    {hours}:{minutes}:{seconds}
                </b>
            </span>
        );
    }
};

const ImageList = ({ product, setCurrentImg }) => {
    const classes = useStyles();

    const src = "https://images.unsplash.com/photo-1444065381814-865dc9da92c0";
    const src2 =
        "https://images.unsplash.com/photo-1518843025960-d60217f226f5?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60";
    return (
        <div className={classes.image}>
            <List
                component="nav"
                aria-label="product image list"
                style={{ display: "flex" }}
            >
                <ListItem
                    button
                    onClick={() =>
                        product.photo !== "no-photo.jpg"
                            ? setCurrentImg(product.photo)
                            : setCurrentImg(noPhoto)
                    }
                    style={{ padding: "0, 2em", justifyContent: "center" }}
                >
                    <img
                        style={{ maxWidth: "5.5em", borderRadius: "0.5em" }}
                        src={
                            product.photo !== "no-photo.jpg"
                                ? product.photo
                                : noPhoto
                        }
                        alt={"listItemImage"}
                    />
                </ListItem>
                <ListItem
                    button
                    onClick={() => setCurrentImg(src)}
                    style={{ padding: "0, 2em", justifyContent: "center" }}
                >
                    <img
                        style={{ maxWidth: "5.5em", borderRadius: "0.5em" }}
                        src={src}
                        alt={"listItemImage"}
                    />
                </ListItem>
                <ListItem
                    button
                    onClick={() => setCurrentImg(src2)}
                    style={{ padding: "0, 2em", justifyContent: "center" }}
                >
                    <img
                        style={{ maxWidth: "5.5em", borderRadius: "0.5em" }}
                        src={src2}
                        alt={"listItemImage"}
                    />
                </ListItem>
            </List>
        </div>
    );
};

const DealCounter = (props) => {
    const { product, timeInMilliSec } = props;
    return (
        product &&
        product.sale && (
            <div
                style={{
                    borderBottom: "1px solid lightgrey",
                    marginBottom: "3%",
                    paddingBottom: "16px",
                }}
            >
                <div>
                    <span>
                        <img
                            src={TikiTimerIcon}
                            style={{
                                height: "24px",
                                width: "24px",
                                marginRight: "1em",
                            }}
                            alt={"timer"}
                        />
                    </span>
                    <span>
                        Deal is finished in:{" "}
                        {timeInMilliSec !== undefined && (
                            <span>
                                <Countdown
                                    date={Date.now() + timeInMilliSec}
                                    renderer={renderer}
                                />
                            </span>
                        )}
                    </span>
                </div>
                <Progress
                    value={!isNaN(product.sold) ? product.sold : 50}
                    style={{ backgroundColor: "#FDDCCB", marginTop: "1em" }}
                >
                    {!isNaN(product.sold) && (
                        <span>
                            {" "}
                            {!!product.sale && (
                                <WhatshotIcon
                                    style={{
                                        color: "white",
                                        fontSize: "1.3em",
                                        paddingBottom: "0.2em",
                                    }}
                                />
                            )}
                            Sold {product.sold}
                        </span>
                    )}
                </Progress>
            </div>
        )
    );
};

const ProductPriceInfo = ({ product }) => {
    const classes = useStyles();

    const discount_price = () => {
        let price =
            (parseInt(product.price) * parseFloat(product.discount)) / 100;
        return formatVND(price);
    };

    const discounted_price = () => {
        let price =
            product.price -
            parseInt(product.price) * (parseInt(product.discount) / 100);
        return formatVND(price);
    };
    const formatVND = (x) => {
        let formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        return formatter.format(x);
    };

    return (
        <div
            // className={classes.block}
            style={{ border: "none", display: "flex", flexDirection: "column" }}
        >
            {/*title*/}
            <div
                style={{
                    padding: "1em",
                    borderRadius: "0.5em",
                    marginBottom: "1.5em",
                    paddingBottom: "1em",
                    backgroundColor: "white",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={TikiNow} alt="tiki now logo" />{" "}
                    <span style={{ margin: "0 0.5em" }}>|</span>
                    <span className={classes.title}>{product.name}</span>
                </div>
                {/* rating block */}
                <div className={classes.rating}>
                    {product.averageRating !== undefined && (
                        <Box component="fieldset" borderColor="transparent">
                            <Rating
                                name="half-rating-read"
                                defaultValue={
                                    !isNaN(product.averageRating)
                                        ? product.averageRating
                                        : 3
                                }
                                precision={0.5}
                                readOnly
                            />
                            {/*<p>See {props.reviews.length} reviews</p>*/}
                            {product.reviews !== undefined && (
                                <Link
                                    to={"#"}
                                    classname={classes.removeLinkStyle}
                                >
                                    <span
                                        style={{
                                            marginLeft: "2em",
                                            color: "#46B1FF",
                                        }}
                                    >
                                        (See {product.reviews.length} reviews)
                                    </span>
                                </Link>
                            )}
                        </Box>
                    )}
                    <span style={{ fontSize: "1em" }}>
                        Branch: <Link to="#">{product.branch}</Link>
                        <span style={{ marginLeft: "1em", color: "#9B9B9B" }}>
                            ID: {product.id}
                        </span>
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        paddingTop: "12px",
                        alignItems: "center",
                    }}
                >
                    {discount_price !== "NaN" ? (
                        <>
                            <span style={{ fontSize: "2em", fontWeight: 500 }}>
                                {discounted_price()}
                            </span>
                            <span
                                className={classes.discount}
                                style={{ color: "#FF3425", fontSize: "0.75em" }}
                            >
                                -{product.discount}%
                            </span>
                        </>
                    ) : (
                        <span
                            style={{
                                fontSize: "1.5em",
                                fontWeight: 600,
                            }}
                        >
                            {product.price}
                        </span>
                    )}
                </div>
            </div>
            {/*product's weight */}
            {/* <div style={{ fontSize: "1.5em", fontWeight: 600 }}>
                {product.weight !== undefined && product.weight}
            </div> */}
        </div>
    );
};

const ProductOptions = ({ product }) => {
    const dispatch = useDispatch();

    const classes = useStyles();
    const [amount, setAmount] = useState(1);
    const [setColor] = useState(product.colors[0]);

    const handleDecrease = () => {
        if (amount - 1 >= 0) {
            setAmount(amount - 1);
        }
    };
    const handleIncrease = () => {
        setAmount(amount + 1);
    };
    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    // product color options
    const colorOption = product.colors.map((item, index) => {
        return (
            <div key={index} style={{ marginLeft: "1em", marginTop: "0.8em" }}>
                {/* <Button variant="contained" color="primary">{item}</Button> */}
                <ToggleButton
                    size={"small"}
                    style={{
                        fontSize: "0.75em",
                        padding: "0 0.5em",
                        height: "3em",
                    }}
                    selected
                    value={item}
                    onClick={() => {
                        setColor(item);
                    }}
                >
                    {item}
                </ToggleButton>
            </div>
        );
    });

    const handleAddToCart = () => {
        for (let i = 0; i < amount; i++) {
            dispatch(cartActions.addToCart(product));
            dispatch(cartActions.updateFinalTotal());
        }
    };

    return (
        <div className={classes.block}>
            <div className="color-options" style={{ width: "100%" }}>
                <div style={{ fontWeight: 600 }}>Color options</div>
                <Grid container spacing={2} style={{ width: "fit-content" }}>
                    {colorOption}
                </Grid>
            </div>
            <div className="add-to-cart">
                <p
                    style={{
                        padding: 0,
                        margin: 0,
                        marginTop: "1em",
                        fontWeight: 600,
                    }}
                >
                    Amount:
                </p>
                <Grid container xl spacing={2}>
                    <Grid item>
                        <ButtonGroup
                            size="small"
                            style={{
                                height: "2em",
                                marginTop: "0.4em",
                                display: "flex",
                            }}
                            color={"primary"}
                        >
                            <Button onClick={handleDecrease}>-</Button>
                            <TextField
                                variant="outlined"
                                style={{
                                    borderRadius: 0,
                                    padding: 0,
                                    margin: 0,
                                }}
                                value={amount}
                                onChange={handleChange}
                            />
                            <Button onClick={handleIncrease}>+</Button>
                        </ButtonGroup>
                    </Grid>

                    <Grid item style={{ width: "100%" }}>
                        <Button
                            onClick={handleAddToCart}
                            variant="contained"
                            color="secondary"
                            style={{
                                fontSize: "1em",
                                width: "100%",
                            }}
                        >
                            <img
                                src={CartIcon}
                                style={{
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "10px",
                                    fontSize: "0.85em",
                                }}
                                alt={"a cart icon"}
                            />
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </div>
            {/* <Grid item container className="product-add-to-cart">
                {discount_price !== "NaN" && (
                    <>
                        {groupButton(discounted_price)}
                        <IconButton
                            aria-label="delete"
                            size="small"
                            style={{
                                padding: 0,
                                margin: 0,
                                marginLeft: "0.5em",
                                marginTop: "0.6em",
                                height: "1.5em",
                            }}
                        >
                            <FavoriteBorderIcon fontSize="inherit" />
                        </IconButton>
                    </>
                )}
            </Grid> */}
        </div>
    );
};
const InfoTable = (props) => {
    const classes = useStyles();
    const specsArray =
        props.specs !== undefined
            ? props.specs.split(",").map((item, index) => {
                  item = item.split(":");
                  return (
                      <TableRow key={index}>
                          <TableCell
                              align="left"
                              style={{
                                  backgroundColor: "#F4F4F4",
                                  fontWeight: 600,
                              }}
                          >
                              {item[0]}
                          </TableCell>
                          <TableCell align="left">{item[1]}</TableCell>
                      </TableRow>
                  );
              })
            : null;
    return (
        <TableContainer className={classes.grid} style={{ padding: "3%" }}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>{specsArray}</TableHead>
            </Table>
        </TableContainer>
    );
};

const ShippingInfo = () => {
    const currentAddress = useSelector((state) => state.address.defaultAddress);
    return (
        <div
            style={{
                borderRadius: "0.5em",
                padding: "16px",
                marginBottom: "1.5em",
                background: "#FFFFFF",
            }}
        >
            <Grid container>
                <Grid item xs={1} xl={1} md={1}>
                    <img src={WarningIcon} alt={"a warning icon"} />
                </Grid>
                <Grid item xs>
                    {currentAddress ? (
                        <div
                            style={{
                                fontSize: "1em",
                                fontWeight: 600,
                                marginBottom: "0.5em",
                            }}
                        >
                            Giao đến{" "}
                            {currentAddress.ward +
                                ", " +
                                currentAddress.district +
                                ", " +
                                currentAddress.city}
                        </div>
                    ) : (
                        <span>
                            Please select the shipping location in order to be
                            forecasted a delivery time accurately.{" "}
                            <Link to="/dashboard/3">Enter your address.</Link>
                        </span>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

const ServiceAndPromotion = ({ saleProduct }) => {
    const classes = useStyles();
    return (
        <div className={classes.block}>
            <Grid container wrap="nowrap">
                <Grid item className="price-block" xl={7} xs={12}>
                    {/* deal counter for hot products */}
                    <DealCounter
                        product={saleProduct}
                        timeInMilliSec={
                            (Math.floor(Math.random() * 10) + 2) * 100000
                        }
                    />

                    {/*Report products */}
                    <div
                        className={classes.block}
                        style={{ fontSize: "0.75em", marginTop: "1em" }}
                    >
                        <div>
                            <img
                                className={classes.responseIcon}
                                src={ResIcon}
                                alt={"a response icon"}
                            />
                            <span>
                                <Link to="#">
                                    Report the product incorrect information.
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div
                        className="promotion-section"
                        style={{ fontSize: "0.75em" }}
                    >
                        <div style={{ fontWeight: 600, fontSize: "1em" }}>
                            RELATED SERVICES AND PROMOTIONS
                        </div>
                        <ul>
                            <li>
                                <p style={{ padding: 0, margin: 0 }}>
                                    Refunds to TikiNow members (maximum:
                                    100k/month),{" "}
                                    <span style={{ color: "red" }}>0.25%</span>{" "}
                                    (10.375$) - <Link to="#">Detail</Link>
                                </p>
                            </li>
                            <li>
                                <span
                                    style={{
                                        color: "red",
                                        backgroundColor: "yellow",
                                    }}
                                >
                                    SHB card
                                </span>{" "}
                                - 10% off for orders from 500k
                            </li>
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const RecommendProd = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.block}>
            <RecommendProduct {...props} />
        </div>
    );
};

const TikiTranding = () => {
    const classes = useStyles();
    return (
        <div
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "0.5em",
                height: "100%",
                width: "auto",
                padding: "16px",
                fontSize: "0.9em",
                marginBottom: "1.5em",
            }}
        >
            <div className="name">
                <i className={classes.tikiStoreIcon} />
                <div className={classes.text}>
                    <span style={{ color: "#189EFF" }}>Tiki trading</span>
                    <p>Genuine commitment</p>
                </div>
            </div>
            <div className={classes.warrantyInfo}>
                <i className={classes.tikiRefund2} />
                <div className={classes.text}>
                    <span style={{ fontWeight: 600 }}>Tiki refunds 111%</span>
                    <p>if fake products are detected</p>
                </div>
            </div>
            <div className={classes.warrantyInfo}>
                <i className={classes.tikiRefund2} />
                <div className={classes.text}>
                    <span style={{ fontWeight: 600 }}>
                        Warranty information
                    </span>
                    <p style={{ padding: 0, margin: 0 }}>36 months</p>
                    <Link to="#">Detail</Link>
                </div>
            </div>
        </div>
    );
};
/* Recommend products
 * Đề xuất sản phẩm
 * @param {object} product
 * @return {JSX.Element}
 * @author PTSON
 * @date 22/09/2023
 */

const ShopInfo = (props) => {
    const classes = useStyles();
    const shop = props.shop;
    const shopAvatar =
        props.shop.avatar !== "no-photo.jpg"
            ? props.shop.avatar
            : defaultAvatar;
    return (
        <div className={classes.block}>
            <Grid container className="">
                <Grid
                    item
                    xs={2}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Link to={`/tiki/shops/${shop.id}`}>
                        <div className={classes.shopInfo__avatar}>
                            <img src={shopAvatar} alt="" />
                        </div>
                    </Link>
                </Grid>
                <Grid item xs={6} className={classes.shopInfo__name}>
                    <p>{shop.name}</p>
                    <span>{shop.description}</span>
                    <div style={{ display: "flex", paddingTop: "0.5em" }}>
                        <Button
                            size="medium"
                            variant="contained"
                            style={{
                                color: "#fff",
                                backgroundColor: "#0a68ff",
                                textTransform: "none",
                                fontSize: "1em",
                            }}
                        >
                            <QuestionAnswerRounded /> Chat
                        </Button>
                        <Link to={`/tiki/shops/${shop.id}`}>
                            <Button
                                size="medium"
                                style={{
                                    color: "#9E9E9E",
                                    backgroundColor: "#fff",
                                    textTransform: "none",
                                    fontSize: "1em",
                                    marginLeft: "1em",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <StoreRounded />
                                Shop
                            </Button>
                        </Link>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={{ paddingLeft: "1em", borderLeft: "1px solid #ccc" }}
                >
                    <div className={classes.shop__info__rating}>
                        <span className={classes.info__details}>
                            <b style={{ color: "#bbb" }}>Đánh giá</b>
                            <b style={{ color: "#0a68ff" }}>{shop.rating}4.9</b>
                        </span>
                        <span className={classes.info__details}>
                            <b style={{ color: "#bbb" }}>Theo dõi</b>
                            <b style={{ color: "#0a68ff" }}>
                                {shop.followers}250
                            </b>
                        </span>
                        <span className={classes.info__details}>
                            <b style={{ color: "#bbb" }}>Sản phẩm</b>
                            <b style={{ color: "#0a68ff" }}>
                                {shop.followers}250
                            </b>
                        </span>
                        <span className={classes.info__details}>
                            <b style={{ color: "#bbb" }}>Phản hồi</b>
                            <b style={{ color: "#0a68ff" }}>
                                {shop.followers}100%
                            </b>
                        </span>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
const ProductDetailInfo = ({ product }) => {
    const classes = useStyles();
    return (
        <div>
            {/* info table block */}
            <div className={classes.block}>
                <div
                    style={{
                        fontSize: "1.1em",
                        fontWeight: 400,
                        marginBottom: "0.3em",
                    }}
                >
                    PRODUCT DETAIL INFO
                </div>
                {InfoTable(product)}
            </div>
            <div className={classes.block} style={{ margin: 0 }}>
                <div
                    style={{
                        fontSize: "1.1em",
                        fontWeight: 400,
                        marginBottom: "0.3em",
                    }}
                >
                    PRODUCT DESCRIPTION
                </div>
                <div
                    className={classes.grid}
                    style={{ backgroundColor: "white", padding: "2%" }}
                >
                    {product.description}
                </div>
            </div>
        </div>
    );
};

const ProductQA = () => {
    const classes = useStyles();
    return (
        <div className={classes.block} style={{ margin: 0 }}>
            <div
                style={{
                    fontSize: "1.1em",
                    fontWeight: 400,
                    marginBottom: "0.3em",
                }}
            >
                QUESTION AND ANSWER
            </div>
            <div className={classes.grid} style={{ padding: "2em" }}>
                <div
                    style={{
                        display: "inline-block",
                        marginRight: "3em",
                        marginLeft: "2em",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "1.2em" }}>
                        <b>0</b>
                    </div>
                    <div>likes</div>
                </div>
                <div style={{ display: "inline-block" }}>
                    <div className={classes.question}>
                        Can I change the product when it is broken?
                    </div>
                    <div className={classes.answer}>No, you cant</div>
                    <div className={classes.answer}>
                        Tiki answered at:{" "}
                        {Moment(Date.now()).format("MMMM DD,YYYY")}
                    </div>
                </div>
            </div>
        </div>
    );
};

const theme = createTheme({
    overrides: {
        MuiButton: {
            contained: {
                backgroundColor: "#FDD22F",
            },
        },
    },
});

const ProductReview = ({ product, reviews }) => {
    const classes = useStyles();
    const [filter1, setFilter1] = useState(10);
    const [filter2, setFilter2] = useState(10);
    const [filter3, setFilter3] = useState(10);
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

    const calculateStarPercent = (star) => {
        let ratings = [];
        reviews !== null &&
            reviews.length > 0 &&
            reviews.map((review) => {
                ratings.push(Math.round(review.rating));
                return null;
            });
        let starList =
            ratings.length > 0 && ratings.filter((rating) => rating === star);
        return (starList.length / ratings.length) * 100;
    };

    const userHasCommentBefore = () => {
        return (
            reviews !== null &&
            reviews.length > 0 &&
            reviews.find((review) => {
                return review.user._id === user.id;
            })
        );
    };

    const handleOpenModal = () => {
        isLoggedIn
            ? setOpen(true)
            : message.error("You need to be logged in to comment");
    };
    const handleCloseModal = () => {
        setOpen(false);
    };

    const rateStar = [5, 4, 3, 2, 1];

    return (
        <div className={classes.block}>
            <div
                style={{
                    fontSize: "1.1em",
                    fontWeight: 400,
                    marginBottom: "0.3em",
                }}
            >
                CUSTOMER REVIEW
            </div>
            <Grid container>
                <Grid
                    item
                    container
                    xs={12}
                    style={{
                        paddingBottom: "1em",
                        marginBottom: "1em",
                        borderBottom: "1px solid #f4f4f4",
                    }}
                >
                    <Grid item container xs={3}>
                        <Grid item xs={12}>
                            <div style={{ fontSize: "1em" }}>
                                Average rating
                            </div>
                            <div
                                style={{ display: "flex", padding: "0.8em 0" }}
                            >
                                <span
                                    className="average-number"
                                    style={{
                                        fontSize: "2em",
                                        fontWeight: 600,
                                        color: "red",
                                    }}
                                >
                                    {product.averageRating !== undefined
                                        ? product.averageRating
                                        : 0}
                                    /5
                                </span>
                                <Box
                                    component="fieldset"
                                    mb={3}
                                    borderColor="transparent"
                                    style={{ margin: "0 0.5em" }}
                                >
                                    <Rating
                                        name="read-only"
                                        value={product.averageRating || 0}
                                        readOnly
                                    />
                                </Box>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {rateStar.map((star) => (
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {star}
                                    <StarIcon fontSize="small" />
                                    <Progress
                                        value={calculateStarPercent(star)}
                                        color={"#23B445"}
                                        style={{
                                            width: "80%",
                                            height: "0.5em",
                                            marginLeft: "1em",
                                        }}
                                    />
                                </span>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item container xs={9}>
                        <Grid
                            item
                            xs={12}
                            style={{
                                marginLeft: "3.5em",
                                paddingLeft: "1em",
                                borderLeft: "1px solid #f4f4f4",
                            }}
                        >
                            {userHasCommentBefore() ? (
                                <>
                                    <span>
                                        View you comment about the product
                                    </span>{" "}
                                    <br />
                                    <ThemeProvider theme={theme}>
                                        <Link to={"/dashboard/9"}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                style={{ marginTop: "0.5em" }}
                                                onClick={handleOpenModal}
                                            >
                                                View your comments
                                            </Button>
                                        </Link>
                                    </ThemeProvider>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Share your comment about the product
                                    </span>{" "}
                                    <br />
                                    <ThemeProvider theme={theme}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            style={{ marginTop: "0.5em" }}
                                            onClick={handleOpenModal}
                                        >
                                            Write your comment
                                        </Button>
                                    </ThemeProvider>
                                    <TransitionsModal
                                        open={open}
                                        onClose={handleCloseModal}
                                        piority={0}
                                        productId={product.id}
                                        type={"commentModal"}
                                    />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "1em" }}>
                    <div
                        className="sort-options"
                        style={{
                            paddingBottom: "0.5em",
                            borderBottom: "1px solid #f4f4f4",
                        }}
                    >
                        <span style={{ lineHeight: "3em" }}>
                            Filter the comments
                        </span>
                        <span>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter1}
                                    style={{ paddingLeft: "0.3em" }}
                                    onChange={(e) => setFilter1(e.target.value)}
                                    variant="standard"
                                >
                                    <MenuItem value={10}>Useful</MenuItem>
                                    <MenuItem value={20}>Newest</MenuItem>
                                    <MenuItem value={30}>
                                        Having images
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter2}
                                    style={{ paddingLeft: "0.3em" }}
                                    onChange={(e) => setFilter2(e.target.value)}
                                    variant="standard"
                                >
                                    <MenuItem value={10}>
                                        All customers
                                    </MenuItem>
                                    <MenuItem value={20}>
                                        All customers made a purchase
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                {/* <InputLabel id="demo-simple-select-label">All stars</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={filter3}
                                    style={{ paddingLeft: "0.3em" }}
                                    onChange={(e) => setFilter3(e.target.value)}
                                    variant="standard"
                                >
                                    <MenuItem value={10}>All stars</MenuItem>
                                    <MenuItem value={20}>5</MenuItem>
                                    <MenuItem value={30}>4</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                    <MenuItem value={30}>2</MenuItem>
                                    <MenuItem value={30}>1</MenuItem>
                                    <MenuItem value={30}>Satisfied</MenuItem>
                                    <MenuItem value={30}>
                                        Not satisfied
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </span>
                    </div>
                    <div className="review">
                        {reviews !== null &&
                            reviews.length > 0 &&
                            reviews.map((review, index) => (
                                <ReviewCard
                                    review={review}
                                    key={index}
                                    product={product}
                                    type={"product"}
                                />
                            ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const ProductDetailPage = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector((state) => state.products.currentProduct);
    const user = useSelector((state) => state.auth.user);
    const productReviews = useSelector((state) => state.reviews.reviews);
    const [currentImg, setCurrentImg] = useState(noPhoto);

    useEffect(() => {
        dispatch(productActions.getProductById(productId));
        dispatch(reviewActions.getProductReviews(productId));
    }, []);

    useEffect(() => {
        if (user.id) {
            dispatch(addressActions.getUserAddress(user.id));
        }
    }, [user.id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (product !== null && product !== undefined) {
            setCurrentImg(
                product.photo !== "no-photo.jpg" ? product.photo : noPhoto
            );
        }
        if (!product) {
            navigate("/notFound");
        }
    }, [product]);

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
            <div
                className={classes.root}
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Grid container className={classes.container}>
                    <Grid
                        item
                        container
                        xs={9}
                        style={{
                            marginTop: "1em",
                            paddingBottom: "1em",
                        }}
                    >
                        <Grid
                            item
                            container
                            xs={12}
                            style={{
                                padding: "0 0.5em 0.5em 0.5em",
                                flexWrap: "nowrap",
                            }}
                        >
                            <Grid
                                item
                                container
                                xs={5}
                                className={classes.imageContainer}
                                style={{ padding: "0 0.5em" }}
                            >
                                <div
                                    className={classes.imageContainer}
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        position: "sticky",
                                        top: "16px",
                                    }}
                                >
                                    <Grid item>
                                        {product !== null &&
                                            product !== undefined && (
                                                <>
                                                    <SideBySideMagnifier
                                                        imageSrc={currentImg}
                                                        largeImageSrc={
                                                            currentImg
                                                        }
                                                        imageAlt="Example"
                                                        style={{
                                                            marginTop: "3em",
                                                        }}
                                                    />
                                                    <div
                                                        className="image-description"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "0.75em",
                                                            }}
                                                        >
                                                            <img
                                                                src={ZoomIcon}
                                                                alt={
                                                                    "a zoom icon"
                                                                }
                                                            />
                                                            Drag your mouse to
                                                            zoom out
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                    </Grid>
                                    <Grid item>
                                        {product !== null &&
                                            product !== undefined && (
                                                <ImageList
                                                    product={product}
                                                    setCurrentImg={
                                                        setCurrentImg
                                                    }
                                                />
                                            )}
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={7}
                                style={{
                                    borderRadius: "0.5em",
                                    padding: "0 0.5em",
                                }}
                            >
                                {product !== null && product !== undefined && (
                                    <div>
                                        <ProductPriceInfo product={product} />
                                        <ShippingInfo />
                                        <ServiceAndPromotion
                                            product={product}
                                        />

                                        <ShopInfo shop={product.shop} />
                                        <TikiTranding />
                                        <ProductDetailInfo product={product} />
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            style={{ padding: "0.5em" }}
                        >
                            <Grid
                                item
                                xs={12}
                                style={{ padding: "0 0.5em 0.5em 0.5em" }}
                            >
                                {ProductQA()}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                style={{ padding: "0 0.5em 0.5em 0.5em" }}
                            >
                                <RecommendProd
                                    user={user}
                                    itemWidth={"170px"}
                                    type={"slider"}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                style={{ padding: "0 0.5em 0.5em 0.5em" }}
                            >
                                <TopProducts
                                    itemWidth={"170px"}
                                    type={"slider"}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ padding: "0.5em" }}>
                                {product !== null && product !== undefined && (
                                    <ProductReview
                                        reviews={productReviews}
                                        product={product}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{
                            borderRadius: "0.5em",
                            marginTop: "1em",
                        }}
                    >
                        <div style={{ position: "sticky", top: "16px" }}>
                            {product !== null && product !== undefined && (
                                <ProductOptions product={product} />
                            )}
                        </div>
                    </Grid>
                </Grid>
                {product === null || productReviews === null ? (
                    <LoadingSpinner />
                ) : null}
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;
