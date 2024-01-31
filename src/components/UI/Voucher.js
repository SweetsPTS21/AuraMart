import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Button, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {format} from "date-fns";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {deleteVoucher} from "../../store/actions/voucherActions";
import {message} from "antd";
import * as voucherActions from "../../store/actions/voucherActions";
import { updateFinalTotal } from "../../store/actions/cartActions";
import * as shopActions from "../../store/actions/shopActions";
import PropTypes from "prop-types";

const userStyles = makeStyles(() => ({
    container: {
        width: "328px",
        height: "110px",
        margin: "1em",
    },
    voucher: {
        width: "100%",
        height: "100%",
        margin: "0",
        backgroundColor: "#e2f0ff",
        padding: "0.5em",
        border: "1px solid #017fff",
        borderRadius: "0.5em",
        boxShadow: "0 0 0.3em 0.1em rgba(0,0,0,0.2)",
    },
    voucher__content: {},
    voucher__button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    voucher__modify: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: "1px solid #017fff",
    },
    voucher__discount: {
        fontWeight: "bold",
        color: "#017fff",
    },
    voucher__info: {
        fontSize: "1em",
        color: "#017fff",
    },
    voucher__expDate: {
        fontSize: "0.8em",
        color: "#f50057",
    },
}));

const DialogDelete = (props) => {
    const openDialog = props.open;

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleDeleteVoucher = () => {
        props.handleDeleteVoucher();
        props.setOpen(false);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to delete this voucher?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteVoucher} autoFocus>
                    Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    );
};

const Voucher = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const type = props.type;
    const action = props.action;
    const shopId = props.shopId;
    const user = useSelector((state) => state.auth.userData);
    const shop = useSelector((state) => state.shops.currentShop);
    const userVouchers = useSelector((state) => state.vouchers.userVouchers);
    const voucher =
        type === "shop" || action === "apply"
            ? props.voucher
            : props.voucher.vouchers[0];
    const [openDialog, setOpenDialog] = useState(false);
    const [saved, setSaved] = useState(true);
    const [used, setUsed] = useState(false);

    useEffect(() => {
        if (user && userVouchers) {
            const index = userVouchers.find((v) => v.voucher === voucher.id);
            if (index) {
                setSaved(false);
            } else {
                setSaved(true);
            }
            if (index?.used) {
                setUsed(true);
            }
        }
    }, [userVouchers, voucher.id]);

    useEffect(() => {
        if (shopId) {
            dispatch(shopActions.getShopById(shopId));
        }
    }, [shopId]);

    const handleSaveClick = () => {
        const msg = message.loading("Saving voucher...", 0);
        dispatch(voucherActions.addUserVoucherByUserId(user._id, voucher.id));
        setSaved(true);
        setTimeout(msg, 1);
    };

    const handleApplyClick = () => {
        // Check if voucher is used
        if (used) {
            message.error("Voucher is already used");
            return;
        }
        // Check if voucher is expired
        if (new Date(voucher.expiryDate) < new Date()) {
            message.error("Voucher is expired");
            return;
        }
        // Check if voucher of shop
        if (voucher.shop !== shopId) {
            message.error("Voucher is not for this shop");
            return;
        }
        dispatch(updateFinalTotal(props.total, voucher, shopId));
        setUsed(true);
        props.setOpen(false);
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleDeleteVoucher = () => {
        const msg = message.loading("Deleting voucher...", 0);
        dispatch(deleteVoucher(shop.id, voucher.id));
        setTimeout(msg, 1);
    };

    const convertDate = (date) => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    return (
        <div className={classes.container}>
            <Grid container className={classes.voucher}>
                <Grid item xs={9} className={classes.voucher__content}>
                    <Typography className={classes.voucher__discount}>
                        Giảm {voucher.discount + "%"}
                    </Typography>
                    <Typography className={classes.voucher__info}>
                        Cho đơn từ {voucher.minimumSpend / 1000}k giảm tối đa{" "}
                        {voucher.maximumDiscount / 1000}k
                    </Typography>
                    <Typography className={classes.voucher__expDate}>
                        HSD: {convertDate(voucher.expiryDate)}
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.voucher__button}>
                    {shop && user._id === shop.user && action !== "apply" && (
                        <Grid item xs={12} className={classes.voucher__modify}>
                            <Button
                                size="medium"
                                color="secondary"
                                variant="text"
                                onClick={handleDeleteClick}
                            >
                                <Delete />
                            </Button>
                        </Grid>
                    )}
                    {action === "apply" ? (
                        <Button
                            size="medium"
                            color="primary"
                            variant="outlined"
                            onClick={handleApplyClick}
                            disabled={used}
                        >
                            Apply
                        </Button>
                    ) : (
                        <Button
                            size="medium"
                            color="primary"
                            variant="outlined"
                            onClick={handleSaveClick}
                            disabled={saved}
                        >
                            {saved ? "Saved" : "Save"}
                        </Button>
                    )}
                </Grid>
            </Grid>
            <DialogDelete
                open={openDialog}
                setOpen={setOpenDialog}
                handleDeleteVoucher={handleDeleteVoucher}
            />
        </div>
    );
};

Voucher.defaultProps = {
    type: "user",
    action: "save",
};

Voucher.propTypes = {
    type: PropTypes.string,
    action: PropTypes.string,
    shopId: PropTypes.string,
    voucher: PropTypes.object,
    total: PropTypes.number,
    setOpen: PropTypes.func,
};

DialogDelete.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    handleDeleteVoucher: PropTypes.func,
}

export default Voucher;
