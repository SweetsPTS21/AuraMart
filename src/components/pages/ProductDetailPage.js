import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../layout/LoadingSpinner";
import TikiNow from "../../image/tiki-now.png";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Progress } from "reactstrap";
import Countdown from "react-countdown-now";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TikiTimerIcon from "../../image/tiki_timer.png";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ZoomIcon from "../../image/zoom-in.png";
// table
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import StarIcon from "@material-ui/icons/Star";
// select
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// list divider
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { SideBySideMagnifier } from "react-image-magnifiers";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    ChangeCircleOutlined,
    CurrencyExchangeRounded,
    QuestionAnswerRounded,
    ShoppingCartRounded,
    StoreRounded,
} from "@mui/icons-material";
import noPhoto from "../../image/nophoto.png";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../store/actions/cartActions";
import * as productActions from "../../store/actions/productActions";
import * as reviewActions from "../../store/actions/reviewActions";
import * as addressActions from "../../store/actions/addressActions";
import ToggleButton from "@material-ui/lab/ToggleButton";
// import TransitionsModal from "../user/UserModal";
import { message } from "antd";
import RecommendProduct from "../layout/RecommendProduct";
import TopProducts from "../layout/TopProducts";
import ReviewCard from "../layout/ReviewCard";
import {
    ArchiveRounded,
    ArrowForwardIosRounded,
    LocalShippingOutlined,
    RefreshRounded,
} from "@material-ui/icons";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@material-ui/core";
import defaultAvatar from "../../image/shopAvatar.jpg";
import { ReactComponent as FlashSale } from "../../image/flashsale.svg";

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
    zoomImage: {
        zIndex: "100",
    },
    icon: {
        color: "#0a68ff",
        marginRight: "0.3em",
    },
    title: { fontSize: "1.5em", color: "#858585" },

    button__color__enabled: {
        borderColor: "#FF424E",
    },
    button__color__disabled: {
        borderColor: "#ccc",
    },

    button__filter: {
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        margin: "0.4em",
    },

    button__filter__enabled: {
        margin: "0.4em",
        border: "1px solid #FF424E",
    },

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
        width: "100%",
        justifyContent: "space-around",
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
    "@global .MuiRating-label ": {
        display: "block !important",
        color: "inherit",
        fontSize: "inherit",
    },
    "@global .MuiInput-underline.Mui-disabled:before": {
        borderBottom: "none !important",
    },
    "@global .MuiDialog-paperWidthSm": {
        maxWidth: "420px !important",
    },
}));

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <span>Offer is over!</span>;
    } else {
        if (days !== 0) {
            return (
                <span>
                    {days} days {hours}:{minutes}:{seconds}
                </span>
            );
        }
        // Render a countdown
        return (
            <span>
                <span
                    style={{
                        backgroundColor: "#FF4C57",
                        color: "#fff",
                        padding: "4px 6px",
                        borderRadius: "5px",
                        fontWeight: 700,
                    }}
                >
                    {hours}
                </span>
                <span
                    style={{
                        fontSize: "1.2em",
                        fontWeight: "600",
                        margin: "0 0.2em",
                    }}
                >
                    :
                </span>
                <span
                    style={{
                        backgroundColor: "#FF4C57",
                        color: "#fff",
                        padding: "4px 6px",
                        borderRadius: "5px",
                        fontWeight: 700,
                    }}
                >
                    {minutes}
                </span>
                <span
                    style={{
                        fontSize: "1.2em",
                        fontWeight: "600",
                        margin: "0 0.2em",
                    }}
                >
                    :
                </span>
                <span
                    style={{
                        backgroundColor: "#FF4C57",
                        color: "#fff",
                        padding: "4px 6px",
                        borderRadius: "5px",
                        fontWeight: 700,
                    }}
                >
                    {seconds}
                </span>
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
    const soldPercent = Math.floor(
        (product.sale.soldQuantity / product.sale.quantity) * 100
    );
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
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <FlashSale />
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
                        Kết thúc trong:{" "}
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
                    value={soldPercent || 50}
                    style={{ backgroundColor: "#FDDCCB", marginTop: "1em" }}
                >
                    <span style={{ zIndex: 9999 }}>
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
                        Đã bán {product.sale.soldQuantity}
                    </span>
                </Progress>
            </div>
        )
    );
};

const ReportModal = (props) => {
    const dispatch = useDispatch();
    const reasons = [
        "Sản phẩm giả",
        "Sản phẩm bị cấm buôn bán",
        "Sản phẩm không rõ nguồn gốc xuất xứ",
        "Hình ảnh sản phẩm không rõ ràng",
        "Sản phẩm có nội dung, hình ảnh phản cảm",
        "Sản phẩm có dấu hiệu lừa đảo",
        "Tên với mô tả sản phẩm không phù hợp",
    ];
    const [value, setValue] = useState(reasons[0]);
    const [description, setDescription] = useState("");
    const { productId, openReport, setOpenReport } = props;

    const handleReport = async () => {
        const msg = message.loading("Đang gửi tố cáo", 0);
        let report_ = {
            reason: value,
            description: description,
        };

        await dispatch(productActions.reportProduct(productId, report_));
        setTimeout(msg, 1);
        setOpenReport(false);
    };

    const handleClose = () => {
        setOpenReport(false);
    };

    return (
        <Dialog open={openReport} setOpen={setOpenReport}>
            <DialogTitle>Chọn lý do</DialogTitle>
            <DialogContent>
                <div>
                    <FormControl
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "1em" }}
                    >
                        <Select
                            id="demo-simple-select-outlined"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            label="Lý do"
                        >
                            {reasons.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Nội dung"
                        multiline
                        minRows={4}
                        variant="outlined"
                        style={{ width: "100%", marginTop: "1em" }}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "#FF424E",
                        color: "white",
                        textTransform: "none",
                    }}
                    onClick={handleReport}
                >
                    Gửi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ProductPriceInfo = ({ product }) => {
    const classes = useStyles();
    const [openReport, setOpenReport] = useState(false);

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

    const handleOpenReport = () => {
        setOpenReport(true);
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
                        <Typography>Thương hiệu: {product.branch}</Typography>
                        <Typography style={{ color: "#9B9B9B" }}>
                            ID: {product._id}
                        </Typography>
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        paddingTop: "12px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        {discount_price !== "NaN" ? (
                            <>
                                <span
                                    style={{ fontSize: "2em", fontWeight: 500 }}
                                >
                                    {discounted_price()}
                                </span>
                                <span
                                    className={classes.discount}
                                    style={{
                                        color: "#FF3425",
                                        fontSize: "0.75em",
                                    }}
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
                    <div style={{ display: "flex" }}>
                        <Button
                            to={"#"}
                            style={{
                                fontSize: "0.9em",
                                color: "#757575",
                                textTransform: "none",
                            }}
                            onClick={handleOpenReport}
                        >
                            Tố cáo{" "}
                        </Button>
                    </div>
                    {openReport && (
                        <ReportModal
                            productId={product.id}
                            openReport={openReport}
                            setOpenReport={setOpenReport}
                        />
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
    const [color, setColor] = useState(null);
    const availableSaleQuantity =
        product.sale && product.sale.quantity - product.sale.soldQuantity;
    const availableQuantity = product.quantity - product.soldQuantity;

    const handleDecrease = () => {
        if (amount > 1) {
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
    const colorOption =
        product.colors &&
        product.colors.map((item, index) => {
            return (
                <div
                    key={index}
                    style={{ marginTop: "0.8em", display: "flex" }}
                >
                    <ToggleButton
                        size={"small"}
                        style={{
                            fontSize: "0.75em",
                            padding: "0 0.5em",
                            height: "3em",
                            backgroundColor: "#FFFFFF",
                        }}
                        className={
                            color === item
                                ? classes.button__color__enabled
                                : classes.button__color__disabled
                        }
                        selected
                        value={item}
                        onClick={() => {
                            setColor(item);
                        }}
                        // disabled={item !== color}
                    >
                        {item}
                    </ToggleButton>
                </div>
            );
        });

    const handleAddToCart = () => {
        if (color === null) {
            message.error("Vui lòng chọn loại sản phẩm");
            return;
        }
        for (let i = 0; i < amount; i++) {
            dispatch(cartActions.addToCart({ ...product, color: color }));
            dispatch(cartActions.updateFinalTotal());
        }
    };

    return (
        <div className={classes.block}>
            <div className="color-options" style={{ width: "100%" }}>
                <div style={{ fontWeight: 600 }}>Phân loại</div>
                <Grid container style={{ display: "flex", gap: "0.5em" }}>
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
                    Số lượng:
                </p>
                <Grid container xl spacing={2}>
                    <Grid item>
                        <div
                            size="small"
                            style={{
                                height: "2em",
                                marginTop: "0.4em",
                                display: "flex",
                            }}
                            color={"primary"}
                        >
                            <Button
                                onClick={handleDecrease}
                                style={{
                                    width: "2em",
                                    borderRadius: 0,
                                    border: "1px solid #ccc",
                                }}
                            >
                                -
                            </Button>

                            <TextField
                                style={{
                                    borderRadius: 0,
                                    borderTop: "1px solid #ccc",
                                    borderBottom: "1px solid #ccc",
                                    width: "4em",
                                    margin: "0.3",
                                    textAlign: "center",
                                }}
                                value={amount}
                                onChange={handleChange}
                                disabled
                            />
                            <Button
                                style={{
                                    borderRadius: 0,
                                    border: "1px solid #ccc",
                                }}
                                onClick={handleIncrease}
                                disabled={
                                    (product.sale &&
                                        amount >= availableSaleQuantity) ||
                                    amount >= availableQuantity
                                }
                            >
                                +
                            </Button>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography style={{ color: "#757575" }}>
                            {product.sale
                                ? availableSaleQuantity
                                : availableQuantity}{" "}
                            sản phẩm sẵn có
                        </Typography>
                    </Grid>

                    <Grid item style={{ width: "100%" }}>
                        <Button
                            onClick={handleAddToCart}
                            style={{
                                fontSize: "1em",
                                width: "100%",
                                backgroundColor: "#FF424E",
                                color: "white",
                                textTransform: "none",
                            }}
                        >
                            <ShoppingCartRounded />
                            Thêm vào giỏ hàng
                        </Button>
                    </Grid>
                </Grid>
            </div>
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
            <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={1} xl={1} md={1}>
                    <LocalShippingOutlined />
                </Grid>
                <Grid item xs={11}>
                    {currentAddress ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "1em",
                                    fontWeight: 600,
                                }}
                            >
                                {" "}
                                Tới{" "}
                                {currentAddress.ward +
                                    ", " +
                                    currentAddress.district +
                                    ", " +
                                    currentAddress.city}{" "}
                            </Typography>
                            <Link to="/dashboard/3">
                                <ChangeCircleOutlined
                                    style={{
                                        color: "#0a68ff",
                                        cursor: "pointer",
                                    }}
                                />
                            </Link>
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

const ServiceAndPromotion = ({ product }) => {
    const classes = useStyles();
    return (
        <div className={classes.block}>
            <Grid container wrap="nowrap">
                <Grid item className="price-block" xl={7} xs={12}>
                    {/* deal counter for hot products */}
                    <DealCounter
                        product={product}
                        timeInMilliSec={
                            (Math.floor(Math.random() * 10) + 2) * 100000
                        }
                    />

                    {/*Report products */}
                    <div
                        className="promotion-section"
                        style={{ fontSize: "0.75em" }}
                    >
                        <div style={{ fontWeight: 600, fontSize: "1em" }}>
                            Dịch vụ và khuyến mãi
                        </div>
                        <ul>
                            <li>
                                <p style={{ padding: 0, margin: 0 }}>
                                    Tiết kiệm hơn với Aumart Member (tối đa
                                    1tr/tháng),{" "}
                                    <span style={{ color: "red" }}>0.25%</span>{" "}
                                    <Link to="#">Chi tiết</Link>
                                </p>
                            </li>
                            <li>
                                <span
                                    style={{
                                        color: "red",
                                        backgroundColor: "yellow",
                                    }}
                                >
                                    SHB bank
                                </span>{" "}
                                Giảm thêm{" "}
                                <span style={{ color: "red" }}>10%</span> tối đa{" "}
                                <span style={{ color: "red" }}>100.000đ</span>{" "}
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
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#189EFF", fontSize: "16px" }}>
                        An tâm mua sắm
                    </span>
                    <Button>
                        <ArrowForwardIosRounded style={{ fontSize: "1em" }} />
                    </Button>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", padding: "0.5em 0" }}>
                    <ArchiveRounded className={classes.icon} />
                    <Typography>Được mở hộp kiểm tra khi nhận hàng</Typography>
                </div>
                <div style={{ display: "flex", padding: "0.5em 0" }}>
                    <CurrencyExchangeRounded className={classes.icon} />
                    <Typography>Được hoàn tiền 111% nếu là hàng giả</Typography>
                </div>
                <div style={{ display: "flex", padding: "0.5em 0" }}>
                    <RefreshRounded className={classes.icon} />
                    <Typography>
                        Đổi trả miễn phí tại nhà trong 30 ngày nếu sản phẩm lỗi
                    </Typography>
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
        props.shop && props.shop.avatar !== "no-photo.jpg"
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
                    Chi tiết
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
                    Mô tả
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

//     const classes = useStyles();
//     return (
//         <div className={classes.block} style={{ margin: 0 }}>
//             <div
//                 style={{
//                     fontSize: "1.1em",
//                     fontWeight: 400,
//                     marginBottom: "0.3em",
//                 }}
//             >
//                 Câu hỏi liên quan
//             </div>
//             <div className={classes.grid} style={{ padding: "2em" }}>
//                 <div
//                     style={{
//                         display: "inline-block",
//                         marginRight: "3em",
//                         marginLeft: "2em",
//                         textAlign: "center",
//                     }}
//                 >
//                     <div style={{ fontSize: "1.2em" }}>
//                         <b>0</b>
//                     </div>
//                     <div>likes</div>
//                 </div>
//                 <div style={{ display: "inline-block" }}>
//                     <div className={classes.question}>
//                         Can I change the product when it is broken?
//                     </div>
//                     <div className={classes.answer}>No, you cant</div>
//                     <div className={classes.answer}>
//                         Tiki answered at:{" "}
//                         {Moment(Date.now()).format("MMMM DD,YYYY")}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const theme = createTheme({
//     overrides: {
//         MuiButton: {
//             contained: {
//                 backgroundColor: "#FDD22F",
//             },
//         },
//     },
// });

const ProductReview = ({ product, reviews }) => {
    const classes = useStyles();
    const [stars, setStars] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        if (reviews !== null) {
            let temp = [0, 0, 0, 0, 0];
            reviews.map((review) => {
                temp[review.rating - 1] += 1;
            });
            setStars(temp);
        }
    }, [reviews]);

    const NumberFormat = (value) => {
        const numberValue = parseFloat(value);

        if (isNaN(numberValue)) {
            return 0;
        }
        // Format the number to one decimal place
        const formattedNumber = numberValue.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        });

        return formattedNumber;
    };

    return (
        <div className={classes.block}>
            <div
                style={{
                    fontSize: "1.1em",
                    fontWeight: 600,
                    marginBottom: "0.3em",
                }}
            >
                Khách hàng đánh giá
            </div>
            <Grid container>
                <Grid
                    item
                    container
                    xs={12}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "2em",
                        borderRadius: "0.5em",
                        border: "1px solid #f4f4f4",
                        backgroundColor: "#f6f8fc",
                    }}
                >
                    <Grid item container xs={2}>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <span
                                        style={{
                                            fontSize: "1.8em",
                                            fontWeight: 600,
                                            color: "red",
                                        }}
                                    >
                                        {product.averageRating
                                            ? NumberFormat(
                                                  product.averageRating
                                              )
                                            : 0}{" "}
                                        {""}
                                    </span>
                                    <span
                                        style={{
                                            color: "red",
                                            fontWeight: 600,
                                            fontSize: "1.1em",
                                        }}
                                    >
                                        trên 5
                                    </span>
                                </div>
                                <Box
                                    component="fieldset"
                                    borderColor="transparent"
                                    style={{ marginTop: "0.5em" }}
                                >
                                    <Rating
                                        name="read-only"
                                        value={product.averageRating || 0}
                                        readOnly
                                    />
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container xs={10}>
                        <div>
                            <Button className={classes.button__filter__enabled}>
                                Tất cả
                            </Button>
                            <Button className={classes.button__filter}>
                                5 Sao ({stars[4]})
                            </Button>
                            <Button className={classes.button__filter}>
                                4 Sao ({stars[3]})
                            </Button>
                            <Button className={classes.button__filter}>
                                3 Sao ({stars[2]})
                            </Button>
                            <Button className={classes.button__filter}>
                                2 Sao ({stars[1]})
                            </Button>
                            <Button className={classes.button__filter}>
                                1 Sao ({stars[0]})
                            </Button>
                            <Button className={classes.button__filter}>
                                Có bình luận
                            </Button>
                            <Button className={classes.button__filter}>
                                Có hình ảnh
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "1em" }}>
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
                                                <div>
                                                    <SideBySideMagnifier
                                                        imageSrc={currentImg}
                                                        imageAlt="Example"
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                        }}
                                                        alwaysInPlace={true}
                                                        overlayOpacity={0.5}
                                                        switchSides={false}
                                                        fillAvailableSpace={
                                                            true
                                                        }
                                                        zoomPosition={"left"}
                                                        zoomContainerBorder={
                                                            "1px solid #ccc"
                                                        }
                                                        zoomContainerBoxShadow={
                                                            "0 4px 8px rgba(0,0,0,.5)"
                                                        }
                                                        cursorStyle={
                                                            "crosshair"
                                                        }
                                                        cursorStyleActive={
                                                            "crosshair"
                                                        }
                                                        dragToMove={false}
                                                        dragToMoveEnabled={
                                                            false
                                                        }
                                                    ></SideBySideMagnifier>
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
                                                </div>
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

                                        <ShopInfo
                                            shop={
                                                product.shop ? product.shop : {}
                                            }
                                        />
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
