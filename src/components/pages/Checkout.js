import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TikiLogo from "../../image/sprite.png";
import Grid from "@material-ui/core/Grid";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import Login from "../user/Login";
import SignUp from "../user/SignUp";
import hotline from "../../image/hotline.png";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Radio from "@material-ui/core/Radio";
import VNPAY from "../../image/icon-zalopay.svg";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import * as orderActions from "../../store/actions/orderActions";
import { Link, useNavigate } from "react-router-dom";
import { loadCSS } from "fg-loadcss";
import * as cartActions from "../../store/actions/cartActions";
import * as addressActions from "../../store/actions/addressActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        position: "relative",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    iconLogoBlue: {
        backgroundImage: `url(${TikiLogo}?v=100000000)`,
        backgroundPosition: "0px 0px",
        width: "90px",
        height: "60px",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabsContainer: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "auto",
        borderRadius: "0.5em",
    },
    bill: {
        backgroundColor: theme.palette.background.paper,
        height: "auto",
        borderRadius: "0.5em",
    },
    button: {
        color: "rgb(0, 182, 240)",
        borderColor: "rgba(0, 182, 240, 0.4)",
        "&:hover": {
            color: "rgb(0, 182, 240)",
            borderColor: "rgba(0, 182, 240, 0.4)",
            backgroundColor: "rgba(0, 182, 240, 0.04)",
        },
    },
    nextButton: {
        backgroundColor: "rgb(0, 182, 240)",
        "&:hover": {
            backgroundColor: "rgba(0, 182, 240, 0.8)",
        },
    },
    title: {
        fontSize: "1.2em",
        fontWeight: 600,
        margin: 0,
    },
    "@global .MuiTab-wrapper": {
        width: "auto !important",
    },
    "@global .MuiStepIcon-root.MuiStepIcon-completed, .MuiStepIcon-root.MuiStepIcon-active":
        {
            color: "#00B6F0",
        },
    "@global .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit:focus":
        {
            outline: "none !important",
        },
    "@global .MuiRadio-colorSecondary.Mui-checked": {
        color: "#29b6f6 !important",
    },
    "@global .MuiRadio-colorSecondary.Mui-checked:hover": {
        color: "#29b6f6 !important",
    },
    "@global .MuiOutlinedInput-root fieldset": {
        borderColor: "rgb(153, 153, 153)",
    },
    "@global .Mui-focused fieldset": {
        borderColor: "#29b6f6 !important",
    },
    "@global label.Mui-focused": {
        color: "#29b6f6 !important",
    },
    "@global .MuiRadio-colorSecondary.Mui-checked:hover ": {
        backgroundColor: "rgba(41,182,246, 0.04) !important",
    },
    "@global .MuiIconButton-colorSecondary:hover": {
        backgroundColor: "rgba(41,182,246, 0.04) !important",
    },
    "@global .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "2px solid rgb(153, 153, 153) !important",
    },
    "@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus":
        {
            outline: "none !important",
        },
    "@global .MuiInput-underline:after": {
        borderBottom: "2px solid #29b6f6 !important",
    },
    "@global .MuiButtonBase-root.MuiIconButton-root": {
        outline: "none !important",
    },
}));

// login ui
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: "450px" }}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const formatVND = (x) => {
    let formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return formatter.format(x);
};

const Bill = () => {
    const classes = useStyles();
    const cartTotalAmountDiscounted = useSelector(
        (state) => state.cart.totalAmount_discounted
    );
    const finalTotal = useSelector((state) => state.cart.finalTotal);
    const cartItems = useSelector((state) => {
        // transform the object of object to array of object
        const transformedCartItems = [];
        for (let key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                discountedPrice: state.cart.items[key].discountedPrice,
                product: state.cart.items[key].product,
                quantity: state.cart.items[key].quantity,
                sum_discounted: state.cart.items[key].sum_discounted,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const itemList = cartItems.map((item, index) => {
        return (
            <div
                style={{
                    borderBottom: "1px solid lightgrey",
                    marginTop: "1.5em",
                }}
                key={index}
            >
                <p style={{ fontSize: "0.9em", margin: 0 }}>
                    <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                    <span style={{ fontWeight: 600 }}> x </span>
                    <span>
                        <Link to={`/${item.product.slug}/${item.product._id}`}>
                            {item.product.name}
                        </Link>
                    </span>
                </p>
                <p style={{ fontSize: "0.8em", marginTop: "1.5em" }}>
                    Cửa hàng <strong>{item.product.shop.name}</strong>
                </p>
            </div>
        );
    });
    return (
        <div
            className={classes.bill}
            style={{ padding: "5%", borderRadius: "4px" }}
        >
            <div
                className="title"
                style={{
                    borderBottom: "1px solid lightgrey",
                    margin: "2%",
                    paddingBottom: "0.7em",
                }}
            >
                <p>
                    Hóa đơn
                    <span>
                        {" "}
                        ({cartItems.length} product{cartItems.length > 1 && "s"}
                        )
                    </span>
                    <span>
                        <Link to={"/cart"} className={classes.removeLinkStyle}>
                            <Button
                                variant="text"
                                size="small"
                                style={{ position: "relative", float: "right" }}
                            >
                                Thay đổi
                            </Button>
                        </Link>
                    </span>
                </p>
            </div>
            {itemList}
            <div style={{ paddingBottom: "2em", paddingTop: "1em" }}>
                <span style={{ fontWeight: 600 }}>Total fee:</span>
                <div
                    className="amount"
                    style={{
                        float: "right",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "right",
                    }}
                >
                    {cartTotalAmountDiscounted !== null &&
                    !isNaN(cartTotalAmountDiscounted) &&
                    cartTotalAmountDiscounted > 0 ? (
                        <>
                            <strong
                                style={{
                                    fontSize: "22px",
                                    color: "red",
                                    float: "right",
                                }}
                            >
                                {formatVND(finalTotal)}
                            </strong>
                            <small>(Included VAT)</small>
                        </>
                    ) : (
                        <>
                            <strong
                                style={{
                                    fontSize: "22px",
                                    color: "red",
                                    float: "right",
                                }}
                            >
                                {formatVND(finalTotal)}
                            </strong>
                            <small>(Included VAT)</small>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const LoginUI = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div
                className="payment-with"
                style={{
                    textAlign: "center",
                    padding: "0 10%",
                    fontSize: "1.2em",
                    marginBottom: "2%",
                }}
            >
                <p>Đăng nhập để tiếp tục thanh toán</p>
            </div>
            <div className="login-form" style={{ marginTop: "2.5em" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div
                            className={classes.tabsContainer}
                            style={{
                                borderRadius: "0.5em",
                                height: "100%",
                            }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                style={{ width: "20%" }}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                indicatorColor="secondary"
                                className={classes.tabs}
                                TabIndicatorProps={{
                                    style: {
                                        left: 0,
                                        backgroundColor: "#00B6F0",
                                    },
                                }}
                            >
                                <Tab
                                    label="Đăng nhập"
                                    {...a11yProps(0)}
                                    style={{ justifyContent: "start" }}
                                />
                                <Tab
                                    label="Đăng ký"
                                    {...a11yProps(1)}
                                    style={{ justifyContent: "start" }}
                                />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Login type="checkout" />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <SignUp />
                            </TabPanel>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Bill />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

// address ui
const AddressUI = ({ handleNext, shipAddress, setShipAddress }) => {
    const classes = useStyles();

    const [fullName, setFullName] = useState(
        shipAddress ? shipAddress.fullName : ""
    );
    const [phone, setPhone] = useState(shipAddress ? shipAddress.phone : "");
    const [city, setCity] = useState(shipAddress ? shipAddress.city : "");
    const [district, setDistrict] = useState(
        shipAddress ? shipAddress.district : ""
    );
    const [ward, setWard] = useState(shipAddress ? shipAddress.ward : "");
    const [address, setAddress] = useState(
        shipAddress ? shipAddress.address : ""
    );
    const [radio] = useState(shipAddress ? shipAddress.radio : "home");
    const listAddress = useSelector((state) => state.address.userAddress);
    const city_ = [
        "Ho Chi Minh",
        "Hanoi",
        "Danang",
        "An Giang",
        "BA Ria Vung Tau",
        "Bac Giang",
        "Bac Kan",
        "Bac Lieu",
        "Bac Ninh",
        "Ben tre",
        "Binh Duong",
        "Binh Phuoc",
        "Binh Thuan",
        "Pacify",
        "Ca Mau",
        "Can Tho",
        "As tall as",
        "Gia Lai",
        "Ha Giang",
        "Henan",
        "Ha Tinh",
        "Hai Duong",
        "Hai Phong",
        "Hau Giang",
        "Hòa Bình",
        "hung Yen",
        "Khánh Hòa",
        "Kien Giang",
        "Kon Tum",
        "Lai Chau",
        "Lam Dong",
        "Lang Son",
        "Lao Cai",
        "Long An",
        "Nam Dinh",
        "Nghe An",
        "Ninh Binh",
        "Ninh Thuận",
        "Phu-Tho",
        "Phu Yen",
        "Quang Binh",
        "Quang Nam",
        "Quang Ngai",
        "Quang Ninh",
        "Quang Tri",
        "Soc Trang",
        "Son La",
        "Xining",
        "peaceful",
        "Thai Nguyen",
        "Thanh Hoa",
        "Hue",
        "Tien Giang",
        "Tra Vinh",
        "Tuyen Quang",
        "Vinh Long",
        "Vinh Phuc",
        "Yen Bai",
        "Dak Lak",
        "Dak Nong",
        "Dien Bien",
        "Dong Nai",
        "Dong Thap",
    ];
    const district_ = [
        "Quận Ba Đình",
        "Quận Hoàn Kiếm",
        "Quận Hai Bà Trưng",
        "Quận Đống Đa",
        "Quận Cầu Giấy",
        "Quận Long Biên",
        "Quận Hoàng Mai",
        "Huyện Sóc Sơn",
        "Quận Bắc Từ Liêm",
        "Huyện Thanh Trì",
        "Huyện Gia Lâm",
        "Huyện Ba Vì",
        "Huyện Chương Mỹ",
        "Huyện Đan Phượng",
        "Huyện Hoài Đức",
        "Huyện Mỹ Đức",
        "Huyện Phú Xuyên",
        "Huyện Phúc Thọ",
        "Huyện Quốc Oai",
        "Huyện Thạch Thất",
        "Huyện Thanh Oai",
        "Huyện Thường Tín",
        "Huyện Ứng Hòa",
        "Huyện Mê Linh",
        "Quận Hà Đông",
        "Thị xã Sơn Tây",
        "Huyện Đông Anh",
        "Quận Nam Từ Liêm",
        "Quận Thanh Xuân",
        "Quận Tây Hồ",
    ];
    const ward_ = [
        "Phường Cống Vị",
        "Phường Điện Biên",
        "Phường Đội Cấn",
        "Phường Giảng Võ",
        "Phường Kim Mã",
        "Phường Liễu Giai",
        "Phường Ngọc Hà",
        "Phường Ngọc Khánh",
        "Phường Nguyễn Trung Trực",
        "Phường Phúc Xá",
        "Phường Quán Thánh",
        "Phường Thành Công",
        "Phường Trúc Bạch",
        "Phường Vĩnh Phúc",
    ];

    const handleSubmit = (e) => {
        setShipAddress({
            fullName,
            phone,
            city,
            district,
            ward,
            address,
            radio,
        });
        e.preventDefault();
        handleNext();
    };

    return (
        <div
            style={{
                padding: "5%",
                marginLeft: "15%",
                width: "80%",
                marginTop: "2.5%",
                borderRadius: "0.5em",
                backgroundColor: "white",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={6} style={{ borderRight: "1px solid #ccc" }}>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Full Name"
                                    style={{ width: "350px", margin: 8 }}
                                    placeholder="Your full name"
                                    value={fullName}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Your Full Name"]}
                                />
                            </FormControl>

                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Phone Number"
                                    style={{ width: "350px", margin: 8 }}
                                    placeholder="Phone No."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    margin="normal"
                                    type={"tel"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    validators={
                                        (["required"],
                                        ["isNumber"],
                                        ["minStringLength:10"],
                                        ["maxStringLength:11"],
                                        ["matchRegexp:(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\\b"])
                                    }
                                    errorMessages={["Phone number is invalid"]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    select
                                    label="City/Province"
                                    value={city}
                                    style={{ width: "350px", margin: 8 }}
                                    onChange={(e) => setCity(e.target.value)}
                                    // helperText="Please select your city/province"
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Select a city"]}
                                >
                                    {city_.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    select
                                    label="District"
                                    value={district}
                                    style={{ width: "350px", margin: 8 }}
                                    onChange={(e) =>
                                        setDistrict(e.target.value)
                                    }
                                    // helperText="Please select your city/province"
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Select a district"]}
                                >
                                    {district_.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    select
                                    label="Ward"
                                    value={ward}
                                    style={{ width: "350px", margin: 8 }}
                                    onChange={(e) => setWard(e.target.value)}
                                    // helperText="Please select your city/province"
                                    variant="standard"
                                >
                                    {ward_.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Address"
                                    value={address}
                                    style={{ width: "350px", margin: 8 }}
                                    onChange={(e) => setAddress(e.target.value)}
                                    // helperText="Please select your city/province"
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter your address"]}
                                />
                            </FormControl>

                            <Button
                                variant="outlined"
                                type={"submit"}
                                color="secondary"
                                className={classes.button}
                                style={{
                                    fontSize: "0.7em",
                                    margin: 0,
                                    width: "350px",
                                    marginTop: "2em",
                                    marginLeft: "0.7em",
                                }}
                            >
                                Tiếp tục
                            </Button>
                        </FormGroup>
                    </ValidatorForm>
                </Grid>
                <Grid item xs={6} style={{ padding: "0 1em" }}>
                    <>
                        <div className={classes.title}>Địa chỉ đã lưu</div>
                        {listAddress !== null && listAddress.length > 0 ? (
                            listAddress.map((address) => (
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "0.5em",
                                        marginTop: "0.5em",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            // height: "108px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "1em",
                                        }}
                                    >
                                        <div>
                                            {address.fullName}{" "}
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                    color: "#26bc4e",
                                                }}
                                            >
                                                {address.default
                                                    ? "Địa chỉ mặc định"
                                                    : ""}
                                            </span>{" "}
                                            <br />
                                            <span style={{ color: "#a1a1a1" }}>
                                                Địa chỉ:{" "}
                                            </span>
                                            <span>
                                                {address.address +
                                                    ", " +
                                                    address.ward +
                                                    ", " +
                                                    address.district +
                                                    ", " +
                                                    address.city}
                                            </span>
                                            <br />
                                            <span style={{ color: "#a1a1a1" }}>
                                                Số điện thoại:{" "}
                                            </span>
                                            <span>{address.phone}</span> <br />
                                        </div>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                type={"submit"}
                                                color="secondary"
                                                className={classes.button}
                                                style={{
                                                    fontSize: "0.7em",
                                                    margin: 0,
                                                    marginLeft: "1em",
                                                    marginRight: "0.5em",
                                                    marginTop: "2em",
                                                }}
                                                onClick={() => {
                                                    setFullName(
                                                        address.fullName
                                                    );
                                                    setPhone(address.phone);
                                                    setCity(address.city);
                                                    setDistrict(
                                                        address.district
                                                    );
                                                    setWard(address.ward);
                                                    setAddress(address.address);
                                                }}
                                            >
                                                Chọn
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span
                                style={{ color: "#a1a1a1", marginTop: "1.5em" }}
                            >
                                Bạn chưa có địa chỉ nào.
                                <Link
                                    to={"/dashboard/3"}
                                    style={{
                                        color: "#00b6f0",
                                        textDecoration: "none",
                                    }}
                                >
                                    Thêm địa chỉ{" "}
                                </Link>
                            </span>
                        )}
                    </>
                </Grid>
            </Grid>
        </div>
    );
};

const ShippingAddr = ({ setActiveStep, shipAddress, currentAddress }) => {
    const classes = useStyles();

    return (
        <div
            className={classes.bill}
            style={{
                padding: "5%",
                borderRadius: "0.5em",
            }}
        >
            <div
                className="title"
                style={{
                    borderBottom: "1px solid lightgrey",
                    margin: "2%",
                    paddingBottom: "0.7em",
                }}
            >
                <p>
                    Địa chỉ giao hàng
                    <span>
                        <Button
                            variant="text"
                            size="small"
                            style={{ position: "relative", float: "right" }}
                            onClick={() => setActiveStep(1)}
                        >
                            Thay đổi
                        </Button>
                    </span>
                </p>
            </div>

            <div style={{ paddingBottom: "1em", marginLeft: "0.5em" }}>
                {shipAddress ? (
                    <div>
                        <span style={{ fontWeight: 600 }}>
                            {shipAddress.fullName}
                        </span>
                        <p style={{ margin: 0 }}>
                            {shipAddress.address}, {shipAddress.ward},{" "}
                            {shipAddress.district},{shipAddress.city}
                        </p>
                        <p style={{ margin: 0 }}>
                            Số điện thoại: {shipAddress.phone}
                        </p>
                    </div>
                ) : currentAddress ? (
                    <div>
                        <span style={{ fontWeight: 600 }}>
                            {currentAddress.fullName}
                        </span>
                        <p style={{ margin: 0 }}>
                            {currentAddress.address}, {currentAddress.ward},{" "}
                            {currentAddress.district},{currentAddress.city}
                        </p>
                        <p style={{ margin: 0 }}>
                            Số điện thoại: {currentAddress.phone}
                        </p>
                    </div>
                ) : (
                    <div>null</div>
                )}
            </div>
        </div>
    );
};
// payment method uix
const PaymentMethodUI = ({
    loading,
    setActiveStep,
    handleOrder,
    shipAddress,
    currentAddress,
    payment,
    setPayment,
}) => {
    const [shipping, setShipping] = useState("standard");

    const handleShipping = (event) => {
        setShipping(event.target.value);
    };

    const handlePayment = (event) => {
        setPayment(event.target.value);
    };

    return (
        <div className="payment-method">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div className="shipping-method-section">
                        <p style={{ fontWeight: 600 }}>
                            1. Phương thức vận chuyển
                        </p>
                        <FormControl component="fieldset" fullWidth>
                            <div
                                style={{
                                    marginTop: "2%",
                                    borderRadius: "0.5em",
                                    backgroundColor: "white",
                                    width: "100%",
                                    padding: "2%",
                                    fontSize: "0.85em",
                                }}
                            >
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{
                                        marginBottom: "1%",
                                        paddingTop: "2.5%",
                                    }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={shipping === "standard"}
                                            onChange={handleShipping}
                                            value="standard"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <p
                                            style={{
                                                color: "#26bc4e",
                                                margin: 0,
                                            }}
                                        >
                                            Giao hàng vào Thursday, 26/03
                                        </p>
                                        <span
                                            style={{
                                                color: "lightgrey",
                                                marginRight: "2em",
                                            }}
                                        >
                                            19.000d
                                        </span>
                                        <span>Giao hàng tiêu chuẩn</span>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{ marginBottom: "1%" }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={shipping === "fast"}
                                            onChange={handleShipping}
                                            value="fast"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <p
                                            style={{
                                                color: "#26bc4e",
                                                margin: 0,
                                            }}
                                        >
                                            Giao hàng vào Thursday, 23/03
                                        </p>
                                        <span
                                            style={{
                                                color: "lightgrey",
                                                marginRight: "2em",
                                            }}
                                        >
                                            25.000d
                                        </span>
                                        <span>Giao hàng nhanh</span>
                                    </Grid>
                                </Grid>
                            </div>
                        </FormControl>
                    </div>

                    <div className="payment-method" style={{ marginTop: "4%" }}>
                        <p style={{ fontWeight: 600 }}>
                            2. Phương thức thanh toán
                        </p>
                        <FormControl component="fieldset" fullWidth>
                            <div
                                style={{
                                    marginTop: "2%",
                                    borderRadius: "0.5em",
                                    backgroundColor: "white",
                                    width: "100%",
                                    padding: "2%",
                                    fontSize: "0.85em",
                                }}
                            >
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{
                                        marginBottom: "1%",
                                        paddingTop: "2.5%",
                                    }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={payment === "COD"}
                                            onChange={handlePayment}
                                            value="COD"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item style={{ marginTop: "1em" }}>
                                        <p>Thanh toán khi nhận hàng</p>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{ marginBottom: "1%" }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={payment === "inter-card"}
                                            onChange={handlePayment}
                                            value="inter-card"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item style={{ marginTop: "1em" }}>
                                        <p>
                                            Thanh toán bằng thẻ quốc tế Visa,
                                            Master, JCB
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{ marginBottom: "1%" }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={payment === "MOMO"}
                                            onChange={handlePayment}
                                            value="MOMO"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item style={{ marginTop: "1em" }}>
                                        <p>Thanh toán bằng MOMO</p>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    xl={12}
                                    spacing={2}
                                    style={{ marginBottom: "1%" }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={payment === "VNPAY"}
                                            onChange={handlePayment}
                                            value="VNPAY"
                                            name="radio-button-demo"
                                        />
                                    </Grid>
                                    <Grid item xl={10}>
                                        <img
                                            src={VNPAY}
                                            style={{ marginRight: "2%" }}
                                        />
                                        <span>Thanh toán bằng VNPay</span>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ marginBottom: "1%" }}
                                >
                                    <Grid item>
                                        <Radio
                                            checked={payment === "sacombank"}
                                            onChange={handlePayment}
                                            value="sacombank"
                                            name="radio-button-demo"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xl={10}>
                                        <span
                                            style={{
                                                backgroundColor: "lightgrey",
                                                color: "white",
                                                borderRadius: "4px",
                                                padding: "0.5%",
                                                width: "fit-content",
                                                marginRight: "2%",
                                            }}
                                        >
                                            Sale
                                        </span>
                                        <span style={{ color: "lightgrey" }}>
                                            Giảm 200k cho đơn từ 1 triệu khi
                                            thanh toán bằng sacombank
                                        </span>
                                        <p style={{ color: "#FFAE00" }}>
                                            Chương trình khuyến mãi đã kết thúc
                                        </p>
                                    </Grid>
                                </Grid>
                            </div>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ marginTop: "11%", marginBottom: "2%" }}>
                        <ShippingAddr
                            setActiveStep={setActiveStep}
                            shipAddress={shipAddress}
                            currentAddress={currentAddress}
                        />
                    </div>
                    <div style={{ marginBottom: "2%" }}>
                        <Bill />
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "2%" }}
                        onClick={handleOrder}
                        disabled={loading}
                        fullWidth
                    >
                        Order
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

const BodyTemplate = ({
    activeStep,
    handleNext,
    setActiveStep,
    handleOrder,
    loading,
    currentAddress,
    shipAddress,
    setShipAddress,
    payment,
    setPayment,
}) => {
    switch (activeStep) {
        case 0:
            return (
                <div>
                    <p style={{ fontWeight: 600 }}>1. Đăng ký/Đăng nhập</p>
                    <LoginUI />
                </div>
            );
        case 1:
            return (
                <AddressUI
                    handleNext={handleNext}
                    setActiveStep={setActiveStep}
                    loading={loading}
                    currentAddress={currentAddress}
                    shipAddress={shipAddress}
                    setShipAddress={setShipAddress}
                />
            );
        case 2:
            return (
                <PaymentMethodUI
                    setActiveStep={setActiveStep}
                    loading={loading}
                    handleOrder={handleOrder}
                    shipAddress={shipAddress}
                    currentAddress={currentAddress}
                    payment={payment}
                    setPayment={setPayment}
                />
            );

        default:
            return (
                <div>
                    <h5>Some title</h5>
                </div>
            );
    }
};

const Checkout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const curUser = useSelector((state) => state.auth.user);
    const defaultAddress = useSelector((state) => state.address.defaultAddress);

    useEffect(() => {
        dispatch(addressActions.getUserAddress(curUser.id));
    }, [curUser.id]);

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const cartItems = useSelector((state) => {
        // transform the object of object to array of object
        const transformedCartItems = [];
        for (let key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                discountedPrice: state.cart.items[key].discountedPrice,
                product: state.cart.items[key].product,
                quantity: state.cart.items[key].quantity,
                sum_discounted: state.cart.items[key].sum_discounted,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });
    const total = useSelector((state) => state.cart.finalTotal);

    const [activeStep, setActiveStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [shipAddress, setShipAddress] = useState("");
    const [currentAddress, setCurrentAddress] = useState(
        useSelector((state) => state.address.currentAddress)
    );
    const [payment, setPayment] = useState("COD");

    const steps = ["Log in", "Address", "Payment & orders"];

    useEffect(() => {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
            document.querySelector("#font-awesome-css")
        );
        isLoggedIn ? setActiveStep(1) : setActiveStep(0);
        if (cartItems.length <= 0) {
            setTimeout(() => navigate("/cart"), 1000);
            message.error("No items in cart to checkout!");
        }
    }, []);

    if (defaultAddress !== currentAddress) {
        setCurrentAddress(defaultAddress);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleOrder = async () => {
        setLoading(true);
        const msg = message.loading("Ordering!", 0);
        for (let i = 0; i < cartItems.length; i++) {
            let order_ = {
                shop: cartItems[i].product.shop.id,
                product: cartItems[i].productId,
                quantity: parseInt(cartItems[i].quantity),
                receiver: shipAddress.fullName,
                phone: shipAddress.phone,
                address:
                    shipAddress.address +
                    ", " +
                    shipAddress.ward +
                    ", " +
                    shipAddress.district +
                    ", " +
                    shipAddress.city,
                total,
                shippingMethod: "GHN",
            };
            dispatch(await orderActions.addNewOrder(order_, payment));
        }
        dispatch(await cartActions.clearCart());
        setTimeout(msg, 1);
        navigate("/");
        setLoading(false);
    };

    return (
        <div className={classes.root}>
            <div
                className="progress-header"
                style={{
                    backgroundColor: "white",
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    padding: "0 20%",
                }}
            >
                <Grid container>
                    <Grid item xs={1}>
                        <Link to={"/"}>
                            <IconButton
                                aria-label="where do you want to shop to?"
                                color="inherit"
                                style={{
                                    padding: "auto 0px",
                                    paddingLeft: "0",
                                }}
                            >
                                <i className={classes.iconLogoBlue} />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item xs={9}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((step) => (
                                <Step key={step} style={{ color: "#00B6F0" }}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={2} style={{ padding: "2% 0" }}>
                        <img
                            src={hotline}
                            style={{ position: "relative", float: "left" }}
                        />
                    </Grid>
                </Grid>
            </div>

            <div
                className="progress-body"
                style={{
                    padding: "1% 15% 20% 15%",
                    backgroundColor: "#f4f4f4",
                }}
            >
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <div className={classes.instructions}>
                            {cartItems.length > 0 && (
                                <BodyTemplate
                                    activeStep={activeStep}
                                    handleNext={handleNext}
                                    setActiveStep={setActiveStep}
                                    handleOrder={handleOrder}
                                    loading={loading}
                                    currentAddress={currentAddress}
                                    shipAddress={shipAddress}
                                    setShipAddress={setShipAddress}
                                    payment={payment}
                                    setPayment={setPayment}
                                />
                            )}
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: "-50px",
                                    display: "flex",
                                }}
                            >
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                    style={{ marginRight: "1em" }}
                                >
                                    Back
                                </Button>
                                {activeStep !== 1 &&
                                    activeStep !== steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.nextButton}
                                            onClick={handleNext}
                                        >
                                            {"Next"}
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
