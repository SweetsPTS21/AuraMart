import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import aumartNotFound from "../../../image/aumart-not-found-pgae.png";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "../../../store/actions/orderActions";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Grid from "@material-ui/core/Grid";
import { LocalShippingRounded, StoreRounded } from "@material-ui/icons";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TransitionsModal from "../../user/UserModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
// import BottleWarmer from "../../../image/bottoleWarmer.jpg";
import MuiDialog from "../../layout/MuiDialog";

import * as cartActions from "../../../store/actions/cartActions";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "2.5em",
        color: "#fff",
        fontSize: "1em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },
        margin: 0,
        marginLeft: "1em",
        marginTop: "1em",
        marginBottom: "1em",
        padding: "0 1em",
    },
    button__secondary: {
        border: "1px solid #ccc",
        borderRadius: "4px",
        height: "2.5em",
        padding: "1em",
        margin: 0,
        marginLeft: "1em",
        marginTop: "1em",
        marginBottom: "1em",
        fontSize: "1em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            border: "1px solid #ccc",
        },
    },
    input: {
        height: "1em !important",
    },
    title: {
        fontSize: "1.1em",
        fontWeight: 400,
        marginBottom: "0.3em",
        color: "rgba(0,0,0,0.8)",
    },
    grid: {
        padding: "0",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    grid2: {
        padding: "1em",
        marginTop: "1em",
        marginBottom: "1.5em",
        backgroundColor: "white",
        borderRadius: "3px",
        fontWeight: 600,
        boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.07)",
    },
    boldGreen: {
        fontWeight: 600,
        color: "#00A86B",
    },
    lightGreen: {
        fontWeight: 500,
        color: "#019F7D",
    },
    priceText: {
        color: "#FF2800",
        marginTop: "0.5em",
        fontSize: "1.1em",
        fontWeight: 600,
    },
    removeLinkStyles: {
        textDecoration: "none !important",
    },
    card__shop: {
        display: "flex",
        alignItems: "center",
        padding: "1em",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        borderTop: "1px solid rgba(0,0,0,0.1)",
    },
    card__shop__name: {
        display: "flex",
        fontSize: "1.2em",
        fontWeight: 600,
        color: "rgba(0,0,0,0.8)",
    },
    card__order__status: {
        display: "flex",
        justifyContent: "flex-end",
    },
    card__shop__view__button: {
        textTransform: "none",
        backgroundColor: "#ff9100",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff9100",
        },
        color: "rgba(0,0,0,0.8)",
        fontSize: "0.7em",
        marginLeft: "1em",
        width: "7em",
        height: "2em",
    },
    card__product: {
        display: "flex",
        alignItems: "center",
        padding: "1em",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
    },
    card__product__info: {
        display: "flex",
    },
    card__product__price: {
        display: "flex",
        justifyContent: "flex-end",
    },
    card__actions: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "1em",
        paddingBottom: "0",
        backgroundColor: "#fffefb",
    },
    card__actions__button: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded":
        {
            top: "45% !important",
            left: "70% !important",
        },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)",
    },
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const OrderStep = ({ myOrder }) => {
    const QontoConnector = withStyles({
        alternativeLabel: {
            top: 10,
            left: "calc(-50% + 16px)",
            right: "calc(50% + 16px)",
        },
        active: {
            "& $line": {
                borderColor: "#189EFF",
            },
        },
        completed: {
            "& $line": {
                borderColor: "#189EFF",
            },
        },
        line: {
            borderColor: "#eaeaf0",
            borderTopWidth: 3,
            borderRadius: 1,
        },
    })(StepConnector);
    const useQontoStepIconStyles = makeStyles({
        root: {
            color: "#eaeaf0",
            display: "flex",
            height: 22,
            alignItems: "center",
        },
        active: {
            color: "#189EFF",
        },
        circle: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "currentColor",
        },
        completed: {
            color: "#189EFF",
            zIndex: 1,
            fontSize: 18,
        },
    });

    function QontoStepIcon(props) {
        const classes = useQontoStepIconStyles();
        const { active, completed } = props;

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                })}
            >
                {completed ? (
                    <Check className={classes.completed} />
                ) : (
                    <div className={classes.circle} />
                )}
            </div>
        );
    }

    QontoStepIcon.propTypes = {
        active: PropTypes.bool,
        completed: PropTypes.bool,
    };
    const getCurrentState = () => {
        if (myOrder.currentState === "Received") return 6;
        if (myOrder.currentState === "Delivered") return 5;
        if (myOrder.currentState === "Shipping") return 4;
        if (myOrder.currentState === "Packing") return 3;
        if (myOrder.currentState === "Getting Product") return 2;
        if (myOrder.currentState === "Tiki Received") return 1;
        if (myOrder.currentState === "Ordered Successfully") return 0;
    };
    const [activeStep] = useState(getCurrentState());

    const steps = [
        "Ordered Successfully",
        "Tiki Received",
        "Getting Product",
        "Packing",
        "Shipping",
        "Delivered",
        "Received",
    ];

    return (
        <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
        >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

const OrderCard = ({ myOrder }) => {
    const classes = userStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = myOrder.product ? myOrder.product : {};
    const [openDialog, setOpenDialog] = useState(false);
    const [openReviewModel, setOpenReviewModel] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [isCancel, setIsCancel] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const { shop, total, quantity } = myOrder;

    const handleCancelOrder = () => {
        dispatch(orderActions.cancelOrder(currentOrderId, user.id));
    };

    const handleReceivedOrder = () => {
        dispatch(orderActions.confirmReceivedOrder(currentOrderId, user.id));
    };

    const handleBuyAgain = () => {
        dispatch(
            cartActions.addToCart({
                ...product,
                quantity: quantity,
                shop: shop,
            })
        );
        // redirect to cart
        navigate("/cart");
    };

    const handlePurchaseOrder = () => {};

    const handleOpenReviewModel = () => {
        setOpenReviewModel(true);
    };

    const handleCloseReviewModel = () => {
        setOpenReviewModel(false);
    };

    const status = [
        "Ordered Successfully",
        "Tiki Received",
        "Getting Product",
        "Packing",
        "Shipping",
        "Delivered",
        "Received",
        "Cancelled",
    ];

    const formatVND = (price) => {
        return price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <div className={classes.grid2}>
            <OrderStep myOrder={myOrder} />
            <Grid container>
                <Grid item container xs={12} className={classes.card__shop}>
                    <Grid item xs={6} className={classes.card__shop__name}>
                        <StoreRounded />
                        <Typography style={{ marginLeft: "0.5em" }}>
                            {shop.name}
                        </Typography>
                        <Link to={`/aumart/shops/${shop._id}`}>
                            <Button
                                variant="contained"
                                className={classes.card__shop__view__button}
                            >
                                Xem shop
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6} className={classes.card__order__status}>
                        <div className={classes.boldGreen}>
                            {myOrder.currentState}
                        </div>
                        {myOrder.currentState === "Shipping" && (
                            <Typography
                                className={classes.lightGreen}
                                style={{ marginLeft: "0.5em" }}
                            >
                                <LocalShippingRounded /> Vận chuyển bởi{" "}
                                {myOrder.shippingMethod}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                {myOrder.orderDetails.map((orderDetail) => (
                    <Grid
                        item
                        container
                        xs={12}
                        className={classes.card__product}
                    >
                        <Grid
                            item
                            container
                            xs={8}
                            className={classes.card__product__info}
                        >
                            <Grid item xs={2}>
                                <img
                                    src={orderDetail.product.photo}
                                    alt=""
                                    style={{ width: "82px", height: "82px" }}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography
                                    style={{
                                        fontSize: "1em",
                                        fontWeight: 500,
                                        color: "rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {orderDetail.product.name}
                                </Typography>
                                <Typography
                                    style={{
                                        fontSize: "0.9em",
                                        fontWeight: 500,
                                        color: "#AAA",
                                    }}
                                >
                                    Phân loại hàng: {orderDetail.color}
                                </Typography>
                                <Typography
                                    style={{
                                        fontSize: "0.9em",
                                        fontWeight: 500,
                                        color: "rgba(0,0,0,0.8)",
                                    }}
                                >
                                    Số lượng: {orderDetail.quantity}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            className={classes.card__product__price}
                        >
                            <Typography
                                style={{
                                    color: "rgba(36, 36, 36, 0.6)",
                                    fontSize: "0.75em",
                                    marginLeft: "1.5em",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "0.5em",
                                    backgroundColor: "#f5f5fa",
                                    padding: "3px 6px",
                                }}
                            >
                                -{orderDetail.product.discount}%{" "}
                            </Typography>

                            <Typography
                                style={{
                                    fontSize: "1em",
                                    color: "#FF2800",
                                }}
                            >
                                {formatVND(orderDetail.product.price)}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
                <Grid item container xs={12} className={classes.card__actions}>
                    <Grid
                        item
                        xs={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            margin: "0.5em 0",
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "1.3em",
                                color: "#FF2800",
                            }}
                        >
                            Thành tiền:{" "}
                            {myOrder.total ? formatVND(myOrder.total) : 0}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={12}
                        className={classes.card__actions__button}
                    >
                        <Typography
                            style={{
                                fontSize: "1em",
                                fontWeight: 600,
                                color: "rgba(0,0,0,0.8)",
                            }}
                        >
                            Dự kiến giao hàng: 20/10/2023
                        </Typography>
                        <Grid
                            item
                            xs={8}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            {status
                                .slice(0, 4)
                                .includes(myOrder.currentState) && (
                                <>
                                    <Button
                                        style={{
                                            height: "2em",
                                            fontSize: "1em",
                                            textTransform: "none",
                                            margin: 0,
                                            marginLeft: "1em",
                                            marginTop: "1em",
                                            marginBottom: "1em",
                                        }}
                                        onClick={() => {
                                            setCurrentOrderId(myOrder._id);
                                            setOpenDialog(true);
                                            setIsCancel(true);
                                        }}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                    {isCancel && (
                                        <MuiDialog
                                            openDialog={openDialog}
                                            setOpenDialog={setOpenDialog}
                                            handleConfirm={handleCancelOrder}
                                            cancel={isCancel}
                                            message={
                                                "Tại sao bạn muốn hủy đơn hàng?"
                                            }
                                        />
                                    )}
                                </>
                            )}
                            {myOrder.currentState === "Shipping" && (
                                <Button
                                    style={{
                                        height: "2em",
                                        fontSize: "1em",
                                        textTransform: "none",
                                        margin: 0,
                                        marginLeft: "1em",
                                        marginTop: "1em",
                                        marginBottom: "1em",
                                    }}
                                    disabled
                                >
                                    Hủy đơn hàng
                                </Button>
                            )}
                            {myOrder.currentState === "Delivered" && (
                                <>
                                    <Button
                                        className={classes.button}
                                        onClick={() => {
                                            setCurrentOrderId(myOrder._id);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        Đã nhận hàng
                                    </Button>
                                    <MuiDialog
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                        handleConfirm={handleReceivedOrder}
                                        message={`Thanh toán ${total}đ cho shop ${shop.name}?`}
                                    />
                                </>
                            )}
                            {myOrder.currentState === "Received" && (
                                <>
                                    <Button
                                        className={classes.button}
                                        onClick={handleOpenReviewModel}
                                    >
                                        Đánh giá
                                    </Button>
                                    <TransitionsModal
                                        open={openReviewModel}
                                        onClose={handleCloseReviewModel}
                                        piority={0}
                                        productId={product.id}
                                        type={"commentModal"}
                                    />
                                </>
                            )}
                            {myOrder.currentState === "Cancelled" && (
                                <>
                                    <Button
                                        className={classes.button}
                                        onClick={() => {
                                            setCurrentOrderId(myOrder._id);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        Mua lại
                                    </Button>
                                    <MuiDialog
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                        handleConfirm={handleBuyAgain}
                                        message={`Bạn muốn mua lại sản phẩm này?`}
                                    />
                                </>
                            )}
                            {myOrder.paymentState === "Pending" &&
                            myOrder.currentState === "Ordered Successfully" &&
                            myOrder.paymentMethod !== "COD" ? (
                                <>
                                    <Button
                                        className={classes.button}
                                        onClick={() => {
                                            setCurrentOrderId(myOrder._id);
                                            setOpenDialog(true);
                                            setIsCancel(false);
                                        }}
                                    >
                                        Thanh toán ngay
                                    </Button>
                                    {!isCancel && (
                                        <MuiDialog
                                            openDialog={openDialog}
                                            setOpenDialog={setOpenDialog}
                                            handleConfirm={handlePurchaseOrder}
                                            message={`Bạn sẽ được chuyển hướng tới trang thanh toán của ${myOrder.paymentMethod}?`}
                                        />
                                    )}
                                </>
                            ) : (
                                <Button className={classes.button__secondary}>
                                    Xem chi tiết đơn hàng
                                </Button>
                            )}

                            <Link to={`/aumart/shops/${shop._id}`}>
                                <Button className={classes.button__secondary}>
                                    Liên hệ shop
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

const OrderPanel = (props) => {
    const classes = userStyles();
    const { myOrders } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid item xs={12} className={classes.voucher__content__tab}>
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        backgroundColor: "#fff",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        style={{ padding: "0" }}
                    >
                        <Tab label="Chờ thanh toán" {...a11yProps(0)} />
                        <Tab label="Đóng gói" {...a11yProps(1)} />
                        <Tab label="Vận chuyển" {...a11yProps(2)} />
                        <Tab label="Hoàn thành" {...a11yProps(3)} />
                        <Tab label="Đã hủy" {...a11yProps(4)} />
                        <Tab label="Trả hàng/hoàn tiền" {...a11yProps(5)} />
                        <Tab label="Tất cả" {...a11yProps(6)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={6}>
                    <div>
                        {myOrders.map((order, index) => (
                            <OrderCard myOrder={order} key={index} />
                        ))}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={0}>
                    <div>
                        {myOrders.map(
                            (order, index) =>
                                (order.currentState ===
                                    "Ordered Successfully" ||
                                    order.currentState === "Tiki Received") &&
                                order.paymentState === "Pending" && (
                                    <OrderCard myOrder={order} key={index} />
                                )
                        )}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div>
                        {myOrders.map(
                            (order, index) =>
                                (order.currentState === "Getting Product" ||
                                    order.currentState === "Packing") && (
                                    <OrderCard myOrder={order} key={index} />
                                )
                        )}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div>
                        {myOrders.map(
                            (order, index) =>
                                order.currentState === "Shipping" && (
                                    <OrderCard myOrder={order} key={index} />
                                )
                        )}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div>
                        {myOrders.map(
                            (order, index) =>
                                (order.currentState === "Delivered" ||
                                    order.currentState === "Received") && (
                                    <OrderCard myOrder={order} key={index} />
                                )
                        )}
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <div>
                        {myOrders.map(
                            (order, index) =>
                                order.currentState === "Cancelled" && (
                                    <OrderCard myOrder={order} key={index} />
                                )
                        )}
                    </div>
                </CustomTabPanel>
            </Box>
        </Grid>
    );
};

const OrderManagement = () => {
    const classes = userStyles();
    const myOrders = useSelector((state) => state.orders.myOrders);

    return (
        <div style={{ width: "100%" }}>
            <div className={classes.title}>My Order</div>

            {myOrders && myOrders.length > 0 ? (
                <OrderPanel myOrders={myOrders} />
            ) : (
                <div style={{ width: "80%" }}>
                    <div className={classes.grid}>
                        <section
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                flexDirection: "column",
                            }}
                        >
                            <img src={aumartNotFound} alt="" />
                            <br />
                            <p>You have no orders</p>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                style={{ height: "3em", fontSize: "1.2em" }}
                            >
                                Continue shopping
                            </Button>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
