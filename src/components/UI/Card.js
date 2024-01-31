import React, {useEffect, useState} from "react";
import {Progress} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import Ripples from "react-ripples";

import "bootstrap/dist/css/bootstrap.min.css";
import AumartNow from "../../image/aumart-now.png";
import DealTag from "../../image/dealTag.png";
import userStyles from "../../styles/CardStyles";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AumartArrow from "../../image/aumartArrow.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {message} from "antd";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import PropTypes from "prop-types";

const RecommendProduct = (props) => {
    const classes = userStyles();

    const formatVND = (x) => {
        let formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        return formatter.format(x);
    };

    return (
        <div
            className={classes.container}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
            style={{...props.style}}
            tabIndex="0"
            role={"button"}
        >
            <div>
                <img
                    src={props.image}
                    alt="product"
                    width={"100%"}
                    style={{
                        borderRadius: "3px",
                        maxHeight: "180px",
                        minHeight: "160px",
                    }}
                />{" "}
                <br/>
            </div>
            <div>
                {props.count && (
                    <p
                        style={{
                            marginBottom: 0,
                            marginTop: "0.5em",
                            fontWeight: 500,
                            fontSize: "0.8em",
                            color: "#26BC4E",
                        }}
                    >
                        Đã bán {props.count} sản phẩm
                    </p>
                )}
                <Grid container style={{marginBottom: "0.5em"}}>
                    <Grid item className={classes.title__container}>
                        <span className={classes.title}>{props.title}</span>
                    </Grid>
                </Grid>

                {props.discount !== undefined && props.discount > 0 ? (
                        <p style={{marginBottom: 0}}>
                            <span style={{fontWeight: 500}}>
                                {discounted_price()}
                            </span>
                            <span className={classes.discount}>
                                {" "}
                                -{props.discount}%
                            </span>
                        </p>
                ) : (
                        <p style={{marginBottom: 0}}>
                            <span style={{fontWeight: 500}}>
                                {formatVND(props.price)}
                            </span>
                        </p>
                )}

                <p style={{margin: 0}}>
                    <IconButton
                        aria-label=""
                        color="inherit"
                        style={{
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: "0.1em",
                            paddingBottom: "0.1em",
                            color: "#26BC4E",
                        }}
                    >
                        <Icon
                            className={"fas fa-angle-double-right"}
                            style={{
                                paddingLeft: 0,
                                paddingRight: 0,
                                fontSize: "1.25vw",
                            }}
                        />
                    </IconButton>
                    <span
                        style={{
                            fontWeight: 500,
                            fontSize: "0.8em",
                            color: "#26BC4E",
                        }}
                    >
                        Giao hàng 2h
                    </span>
                </p>
                <div
                    style={{
                        marginBottom: "0.2rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Rating
                        name="half-rating-read"
                        defaultValue={
                            props.rating || 3
                        }
                        precision={0.5}
                        readOnly
                        size="small"
                        style={{
                            width: "50%",
                            margin: 0,
                            fontSize: "0.9rem",
                            alignItems: "center",
                        }}
                    />
                    <p
                        className={classes.title}
                        style={{
                            width: "50%",
                            marginBottom: 0,
                            alignItems: "center",
                        }}
                    >
                        {" "}
                        ({reviews} đánh giá)
                    </p>
                </div>
            </div>
        </div>
    );
};

const Card = (props) => {
    const classes = userStyles();
    const navigate = useNavigate();
    const reviews = useSelector((state) => state.reviews.allReviews);
    const [amount, setAmount] = useState(props?.quantity || 0);
    const stock = props.stock || 0;
    const soldQuantity = props.soldQuantity || 0;
    const [color, setColor] = useState(props.color || "");

    const discounted_price = () => {
        let discounted_price =
            props.price -
            parseInt(props.price) * (parseInt(props.discount) / 100);
        return formatVND(discounted_price);
    };

    function formatVND(x) {
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        });

        return formatter.format(x);
    }

    const getProductReviewLength = () => {
        let reviewsLength = 0;
        reviews !== null &&
        reviews.length > 0 &&
        reviews.filter((review) => {
            if (review.product.id === props.id) {
                reviewsLength++;
            }
            return null;
        });
        return reviewsLength;
    };

    const navigateToProduct = () => {
        navigate(`/${props.slug}/${props.id}`, {replace: true});
        window.location.reload();
    };

    useEffect(() => {
        message.destroy();
    }, []);

    // Card section for default product
    const type1 = (
        <Ripples>
            <Link
                to={
                    props.link  ? `/${props.slug}/${props.id}` : "#"
                }
                className={classes.removeLinkStyle}
            >
                <div
                    className={classes.container}
                    style={{...props.style}}
                    onClick={() => {
                        if (props.onClick) {
                            props.onClick();
                        }
                    }}
                    tabIndex="0"
                    role={"button"}
                >
                    <div>
                        <img
                            src={props.image}
                            alt="product "
                            width={"100%"}
                            style={{
                                borderRadius: "3px",
                                maxHeight: "180px",
                                minHeight: "160px",
                            }}
                        />{" "}
                        <br/>
                    </div>
                    <div>
                        <Grid container style={{marginBottom: "0.5em"}}>
                            <Grid item className={classes.title__container}>
                                <span className={classes.title}>
                                    {props.title}
                                </span>
                            </Grid>
                        </Grid>
                        {props?.discount > 0 ? (
                            <p style={{marginBottom: 0}}>
                                    <span style={{fontWeight: 500}}>
                                        {discounted_price()}
                                    </span>
                                <span className={classes.discount}>
                                        -{props.discount}%
                                    </span>
                            </p>
                        ) : (
                            <p style={{marginBottom: 0}}>
                                    <span style={{fontWeight: 500}}>
                                        {formatVND(props.price)}
                                    </span>
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </Ripples>
    );

    // Card section for deal of the day
    const type2 = (
        <Ripples>
            <Link
                to={
                    props.link ? `/${props.slug}/${props.id}` : "#"
                }
                className={classes.removeLinkStyle}
            >
                <div
                    className={classes.container}
                    style={{...props.style}}
                    onClick={() => {
                        if (props.onClick) {
                            props.onClick();
                        }
                    }}
                    tabIndex="0"
                    role={"button"}
                >
                    <div>
                        {props.discount !== undefined && props.discount > 0 ? (
                            <>
                                <img
                                    src={DealTag}
                                    alt="deal tag"
                                    width={"38vw"}
                                    style={{position: "absolute"}}
                                />
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        position: "absolute",
                                        marginTop: "0.2em",
                                        marginLeft: "0.4em",
                                        fontSize: "0.85em",
                                        color: "white",
                                    }}
                                >
                                    -{props.discount}%
                                </span>
                            </>
                        ) : null}
                        <img
                            src={props.image}
                            alt="product"
                            width={"100%"}
                            style={{
                                borderRadius: "3px",
                                maxHeight: "180px",
                                minHeight: "160px",
                            }}
                        />{" "}
                        <br/>
                    </div>
                    <div>
                        <Grid container style={{marginBottom: "0.5em"}}>
                            <Grid item className={classes.title__container}>
                                <span className={classes.title}>
                                    {props.title}
                                </span>
                            </Grid>
                        </Grid>
                        {props.discount !== undefined && props.discount > 0 ? (
                            <p style={{marginBottom: "0.5em"}}>
                                <span style={{fontWeight: 500}}>
                                    {discounted_price()}
                                </span>
                                <span className={classes.discount}>
                                    -{props.discount}%
                                </span>
                            </p>
                        ) : (
                            <p style={{marginBottom: "0.5em"}}>
                                <span style={{fontWeight: 500}}>
                                    {formatVND(props.price)}
                                </span>
                            </p>
                        )}

                        <Progress
                            value={!isNaN(props.sold) ? props.sold : 50}
                            className={classes.progress}
                        >
                            {!isNaN(props.sold) && (
                                <span style={{zIndex: 9999}}>
                                    {" "}
                                    {!!props.hot && (
                                        <WhatshotIcon
                                            style={{
                                                color: "white",
                                                fontSize: "1.3em",
                                                paddingBottom: "0.2em",
                                            }}
                                        />
                                    )}
                                    <span style={{fontSize: "0.8em"}}>
                                        Đã bán {props.sold}
                                    </span>
                                </span>
                            )}
                        </Progress>
                        <Grid container className={classes.aumartNowBorder}>
                            <Grid
                                item
                                xs={2}
                                md={3}
                                lg={3}
                                style={{margin: 0, marginTop: "0.1em"}}
                            >
                                <div>
                                    <img
                                        src={AumartNow}
                                        alt="aumartnow"
                                        width={"70%"}
                                    />{" "}
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                md={9}
                                lg={9}
                                style={{margin: 0}}
                            >
                                <span className={classes.aumartNowTitle}>
                                    {"Giao siêu tốc 2h"}
                                </span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Link>
        </Ripples>
    );

    // Recommened for you section/review section
    const type3 = (
        <Ripples>
            {props.rerender ? (
                <div onClick={navigateToProduct}
                     tabIndex="0"
                     role={"button"}>
                    <RecommendProduct
                        {...props}
                        reviews={getProductReviewLength()}
                        discounted_price={discounted_price}
                    />
                </div>
            ) : (
                <Link
                    to={
                        props.link !== undefined && props.link !== false
                            ? `/${props.slug}/${props.id}`
                            : "#"
                    }
                    className={classes.removeLinkStyle}
                >
                    <RecommendProduct
                        {...props}
                        reviews={getProductReviewLength()}
                        discounted_price={discounted_price}
                    />
                </Link>
            )}
        </Ripples>
    );

    //Card section for product in cart
    const type4 = (
        <div
            className={classNames(classes.grid, classes.removeLinkStyle)}
            style={{...props.style}}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
            tabIndex="0"
            role={"button"}
        >
            <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Ripples>
                            <Link
                                to={
                                    props.link !== undefined &&
                                    props.link !== false
                                        ? `/${props.slug}/${props.id}`
                                        : "#"
                                }
                                className={classes.removeLinkStyle}
                            >
                                <ButtonBase className={classes.image}>
                                    <img
                                        className={classes.img}
                                        alt="complex"
                                        src={props.image}
                                    />
                                </ButtonBase>
                            </Link>
                        </Ripples>
                    </Grid>
                    <Grid item xs={12} sm container spacing={2}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <Link
                                        to={
                                            props.link !== undefined &&
                                            props.link !== false
                                                ? `/${props.slug}/${props.id}`
                                                : "#"
                                        }
                                        className={classes.removeLinkStyle}
                                    >
                                        <img
                                            src={AumartNow}
                                            alt={"aumartnow"}
                                        />{" "}
                                        | {props.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <img
                                        src={AumartArrow}
                                        className={classes.aumartArrow}
                                        alt={"aumart arrow "}
                                    />{" "}
                                    Giao hàng 2h
                                </Typography>
                                {props.colors && (
                                    <FormControl
                                        sx={{m: 1, minWidth: 120}}
                                        size="small"
                                    >
                                        <Select
                                            label="Color"
                                            variant="standard"
                                            value={color}
                                            onChange={(e) =>
                                                setColor(e.target.value)
                                            }
                                            autoWidth
                                        >
                                            {props.colors?.map((color) => (
                                                <MenuItem
                                                    key={color}
                                                    value={color}
                                                >
                                                    {color}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                        if (props.removeItem) {
                                            props.removeItem();
                                        }
                                        setAmount(0);
                                    }}
                                >
                                    Xóa
                                </Button>
                                <Button size="small" color="primary">
                                    Mua sau
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {discounted_price() !== "NaN" ? (
                                <Typography
                                    variant="subtitle1"
                                    style={{textAlign: "center"}}
                                >
                                    <strong>{discounted_price()}</strong>
                                    <span className={classes.priceOrigin}>
                                            {" "}
                                        {formatVND(props.price)}
                                        </span>
                                </Typography>
                            ) : (
                                <Typography
                                    variant="subtitle1"
                                    style={{
                                        textAlign: "right",
                                        marginTop: "1em",
                                    }}
                                >
                                    <strong>{formatVND(props.price)}</strong>
                                </Typography>
                            )}
                            {props.quantity && (
                                <Typography
                                    style={{
                                        textAlign: "right",
                                        marginTop: "1em",
                                    }}
                                >
                                    Còn <strong>{stock - soldQuantity}</strong>{" "}
                                    sản phẩm
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        style={{display: "flex", alignItems: "center"}}
                    >
                        <Button
                            onClick={() => {
                                if (props.removeItem) {
                                    props.removeItem();
                                }
                                setAmount((amt) => amt - 1);
                            }}
                            style={{fontSize: "2em", marginRight: "0.3em"}}
                            color="secondary"
                        >
                            -
                        </Button>
                        <TextField
                            variant="outlined"
                            style={{
                                borderRadius: 0,
                                width: "3.3em",
                                margin: "0.3",
                                textAlign: "center",
                            }}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled
                        />
                        <Button
                            onClick={() => {
                                if (props.addItem) {
                                    props.addItem();
                                }
                                setAmount((amt) => amt + 1);
                            }}
                            style={{fontSize: "2em", marginLeft: "0.3em"}}
                            color="primary"
                            disabled={amount >= stock - soldQuantity}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );

    const handleCardType = (type) => {
        switch (type) {
            case "default":
                return type1;
            case "deal":
                return type2;
            case "review":
                return type3;
            case "cart":
                return type4;
            default:
                return type1;
        }
    };
    return <>{handleCardType(props.type)}</>;
};

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    sold: PropTypes.number,
    hot: PropTypes.bool,
    onClick: PropTypes.func,
    slug: PropTypes.string,
    id: PropTypes.number,
    link: PropTypes.bool,
    type: PropTypes.string,
    style: PropTypes.object,
    colors: PropTypes.array,
    color: PropTypes.string,
    quantity: PropTypes.number,
    stock: PropTypes.number,
    soldQuantity: PropTypes.number,
    rerender: PropTypes.bool,

    removeItem: PropTypes.func,
    addItem: PropTypes.func,
};

RecommendProduct.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object,
    count: PropTypes.number,
    rating: PropTypes.number,
};

export default Card;
