import React from "react";
import {
    MuiThemeProvider,
    createTheme,
    makeStyles,
} from "@material-ui/core/styles";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import Button from "@material-ui/core/Button";
import noProductsLogo from "../../image/emptycart.png";
import Card from "../UI/Card";
import noPhoto from "../../image/nophoto.png";
import RecommendProduct from "../layout/RecommendProduct";
import TopProducts from "../layout/TopProducts";
import * as cartActions from "../../store/actions/cartActions";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyVoucher from "../UI/AccountDashboardComponents/MyVoucher";

const useStyles = makeStyles(() => ({
    root: {
        // padding: "0 10%",
        width: "80%",
        maxWidth: "1300px",
        minWidth: "1200px",
        height: "100%",
    },
    paper: {
        borderRadius: "0.5em",
    },
    removeLink: {
        textDecoration: "none !important",
        color: "inherit !important",
    },
    cartLabel: {
        margin: 0,
        paddingBottom: "1em",
        borderBottom: "1px solid #ddd",
    },
    feePaper: {
        marginTop: 52,
    },
    boxFee: {
        padding: "5%",
    },
    shopVoucher: {
        color: "red",
        fontSize: "14px",
        padding: "0.5em",
        backgroundColor: "#f5f5f5",
        borderRadius: "0.5em",
    },
    "@global .MuiDialog-paperWidthSm.css-1t1j96h-MuiPaper-root-MuiDialog-paper":
        {
            maxWidth: "900px !important",
        },
}));

const formatVND = (x) => {
    let formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return formatter.format(x);
};

const paperStyle = createTheme({
    overrides: {
        MuiPaper: {
            root: {
                textAlign: "left",
                backgroundColor: "#fff",
                padding: "1em",
                borderRadius: "0.5em",
                marginBottom: "1em",
            },
        },
    },
});

const ApplyVoucher = (props) => {
    const [shopTotal, setShopTotal] = useState(props.shopTotalAmount);

    const handleClose = () => {
        props.setOpen(false);
    };
    const handleSubmit = () => {};

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Apply your voucher</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Current shop total: {formatVND(shopTotal)}
                    </DialogContentText>
                    <MyVoucher
                        type={"user"}
                        action={"apply"}
                        total={shopTotal}
                        setTotal={setShopTotal}
                        {...props}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const CartPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartTotalAmountDiscounted = useSelector(
        (state) => state.cart.totalAmount_discounted
    );

    const finalTotal = useSelector((state) => state.cart.finalTotal);
    const totalShopDiscount = useSelector(
        (state) => state.cart.totalShopDiscount
    );

    const user = useSelector((state) => state.auth.user);

    const handleAddShopVoucherClick = (index) => {
        setCurrentIndex(index);
        setOpenDialog(true);
    };

    // const [totalShopAmount, setTotalShopAmount] = useState(null);
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

    const TotalShopAmount = () => {
        const total = [];
        for (let key in groupByShop) {
            const items = groupByShop[key];
            total.push({
                shop: key,
                total: items.reduce(
                    (sum, item) => sum + item.sum_discounted,
                    0
                ),
            });
        }
        return total;
    };

    const groupByShop = useSelector((state) => {
        const groupByShop = {};
        for (let key in state.cart.items) {
            const shopId = state.cart.items[key].product.shop.id;
            if (groupByShop[shopId] === undefined) {
                groupByShop[shopId] = [];
            }
            groupByShop[shopId].push(state.cart.items[key]);
        }
        return groupByShop;
    });

    const itemList =
        groupByShop &&
        Object.keys(groupByShop).map((key, index) => {
            const items = groupByShop[key];
            // totalShopAmount.push({shop: key, total: items.reduce((sum, item) => sum + item.sum_discounted, 0)})
            return (
                <>
                    <MuiThemeProvider theme={paperStyle}>
                        <Paper
                            className={classes.paper}
                            elevation={0}
                            square={true}
                        >
                            <h5 className={classes.cartLabel}>
                                {items[0].product.shop.name}
                            </h5>
                            {items.map((item, index) => {
                                return (
                                    <Card
                                        key={index}
                                        style={{ marginTop: 0 }}
                                        type={"cart"}
                                        link={true}
                                        name={item.product.name}
                                        id={item.product.id}
                                        title={item.product.name}
                                        image={
                                            item.product.photo ===
                                            "no-photo.jpg"
                                                ? noPhoto
                                                : item.product.photo
                                        }
                                        soldBy={item.product.shop.name}
                                        price={item.product.price}
                                        discount={item.product.discount}
                                        // discountedPrice={40003}
                                        quantity={item.quantity}
                                        stock={item.product.quantity}
                                        soldQuantity={item.product.soldQuantity}
                                        addItem={() => {
                                            dispatch(
                                                cartActions.addToCart(
                                                    item.product
                                                ),
                                                cartActions.updateFinalTotal()
                                            );
                                            dispatch(
                                                cartActions.updateFinalTotal()
                                            );
                                        }}
                                        removeItem={() => {
                                            dispatch(
                                                cartActions.removeFromCart(
                                                    item.productId
                                                )
                                            );
                                            dispatch(
                                                cartActions.updateFinalTotal()
                                            );
                                        }}
                                        deleteItem={() => {
                                            dispatch(
                                                cartActions.deleteFromCart(
                                                    item.productId
                                                ),
                                                cartActions.updateFinalTotal()
                                            );
                                        }}
                                    />
                                );
                            })}
                            <Grid
                                item
                                style={{
                                    paddingTop: "1em",
                                    borderTop: "1px solid #ddd",
                                }}
                            >
                                <span>Shop voucher: </span>
                                <span className={classes.shopVoucher}>
                                    {totalShopDiscount &&
                                        totalShopDiscount.map((item) => {
                                            if (item.shop === key) {
                                                return (
                                                    <>
                                                        <span>
                                                            -{" "}
                                                            {formatVND(
                                                                item.discount
                                                            )}
                                                        </span>
                                                    </>
                                                );
                                            }
                                        })}
                                </span>
                                <Button
                                    variant="text"
                                    style={{ color: "red" }}
                                    onClick={() =>
                                        handleAddShopVoucherClick(index)
                                    }
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Paper>
                    </MuiThemeProvider>
                    {openDialog && currentIndex === index && (
                        <ApplyVoucher
                            shopId={key}
                            open={openDialog}
                            setOpen={setOpenDialog}
                            shopTotalAmount={
                                TotalShopAmount()[currentIndex].total
                            }
                        />
                    )}
                </>
            );
        });

    const total = () => {
        return (
            <div style={{ paddingBottom: "1em" }}>
                <span>Tổng tiền:</span>
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
                            <small>(Đã bao gồm VAT)</small>
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
                            <small>(Đã bao gồm VAT)</small>
                        </>
                    )}
                </div>
            </div>
        );
    };
    const CartSection = () => {
        if (!cartItems.length) {
            return (
                <Grid container className={classes.root} alignItems="center">
                    <Grid item xs={12}>
                        <h5 style={{ margin: "1em 0" }}>
                            Your cart ({props.amount ? props.amount : 0}{" "}
                            products)
                        </h5>
                        <Paper
                            className={classes.paper}
                            elevation={0}
                            square
                            style={{ textAlign: "center", padding: "1em" }}
                        >
                            <img
                                src={noProductsLogo}
                                alt={"not product logo"}
                            />
                            <h5>Giỏ hàng trống!</h5>
                            <p>
                                Bạn tham khảo thêm các sản phẩm được Aumart gợi
                                ý bên dưới nhé!
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <RecommendProduct
                            user={user}
                            itemWidth={"170px"}
                            type={"slider"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TopProducts itemWidth={"170px"} type={"slider"} />
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={9}>
                    <h5 style={{ marginBottom: "1em" }}>Your cart</h5>
                    {itemList}
                </Grid>
                <Grid item xs={3}>
                    <Paper
                        elevation={0}
                        variant="standard"
                        square
                        className={classes.feePaper}
                    >
                        <div className={classes.boxFee}>
                            <p
                                className={classes.listInfoPrice}
                                style={{ margin: 0 }}
                            >
                                {cartTotalAmountDiscounted !== null &&
                                !isNaN(cartTotalAmountDiscounted) &&
                                cartTotalAmountDiscounted > 0 ? (
                                    <>
                                        <span>Giá gốc: </span>
                                        <strong style={{ float: "right" }}>
                                            {formatVND(cartTotalAmount)}
                                        </strong>
                                        <br />
                                        <span>Tạm tính: </span>
                                        <strong style={{ float: "right" }}>
                                            {formatVND(
                                                cartTotalAmountDiscounted
                                            )}
                                        </strong>
                                    </>
                                ) : (
                                    <>
                                        <span>Tạm tính: </span>
                                        <strong style={{ float: "right" }}>
                                            {formatVND(cartTotalAmount)}
                                        </strong>
                                    </>
                                )}
                            </p>
                        </div>
                        <div
                            className={classes.boxFee}
                            style={{ marginBottom: "5%" }}
                        >
                            {total()}
                        </div>
                    </Paper>
                    <Link to={"/checkout"} className={classes.removeLink}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            style={{ marginTop: 10 }}
                        >
                            Order
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    };

    return (
        <div>
            <NavBar {...props} />
            <div
                className="body"
                style={{
                    minWidth: "1300px",
                    marginBottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {CartSection()}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
