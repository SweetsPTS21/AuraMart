import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Voucher from "../Voucher";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiNumberInput from "../../layout/MuiNumberInput";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { format } from "date-fns";

import * as voucherActions from "../../../store/actions/voucherActions";
import * as shopActions from "../../../store/actions/shopActions";
import MuiInput from "../../layout/MuiInput";
import { ToysOutlined } from "@material-ui/icons";

const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#fff",
        padding: "1em",
    },
    voucher__header: {
        display: "flex",
        alignItems: "center",
    },
    voucher__header__button: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "& a": {
            margin: "0 0.5em",
        },
    },
    voucher__search: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2em 20%",
        margin: "1em auto",
        backgroundColor: "#f5f5f5",
    },
    voucher__panel: {
        display: "flex",
        flexWrap: "wrap",
    },
    voucher__dialog: {
        padding: "1em 0",
    },
    voucher__dialog__part: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1em",
        margin: "0.5em 0",
    },
    datePicker: {
        width: "240px",
    },
}));

const VoucherPanel = (props) => {
    const classes = userStyles();
    const tab = props.index;
    const type = props.type;
    const action = props.action;
    const vouchers = props.vouchers;

    return (
        <Grid item xs={12} className={classes.voucher__panel}>
            {vouchers &&
                vouchers.map((voucher, index) => (
                    <Voucher
                        key={index}
                        voucher={voucher}
                        type={type}
                        action={action}
                        setOpen={props.setOpen}
                    />
                ))}
        </Grid>
    );
};

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

const VoucherRender = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const user = props.user;
    const vouchers = props.vouchers;
    const type = props.type;
    const action = props.action;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [search, setSearch] = useState("");
    const searchVoucher = useSelector((state) => state.vouchers.userVoucher);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenAddDialog = () => {
        setOpen(true);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleApplySearch = () => {
        dispatch(voucherActions.getVoucherByCode(search, user.id));
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.container}>
                <Grid item xs={12} className={classes.voucher__header}>
                    <Grid
                        item
                        xs={7}
                        className={classes.voucher__header__title}
                    >
                        My Vouchers
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        className={classes.voucher__header__button}
                    >
                        {type === "user" ? (
                            <Link to="/vouchers/create">
                                <Typography variant="contained" color="primary">
                                    Find Voucher
                                </Typography>
                            </Link>
                        ) : (
                            <Button
                                variant="text"
                                onClick={handleOpenAddDialog}
                            >
                                <Typography variant="contained" color="primary">
                                    Create Voucher
                                </Typography>
                            </Button>
                        )}
                        <Link to="/vouchers/create">
                            <Typography variant="contained" color="primary">
                                Voucher History
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.voucher__search}>
                    <Typography>Search</Typography>
                    <TextField
                        id="outlined-basic"
                        size="small"
                        variant="outlined"
                        placeholder="Search by voucher code"
                        style={{ width: "400px" }}
                        onChange={handleSearchChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplySearch}
                    >
                        Apply
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.voucher__content}>
                    {action === "apply" ? (
                        <Grid item xs={12} className={classes.voucher__panel}>
                            {vouchers &&
                                vouchers.map((voucher, index) => (
                                    <Voucher
                                        key={index}
                                        voucher={voucher}
                                        type={type}
                                        action={action}
                                        setOpen={setOpen}
                                        {...props}
                                    />
                                ))}
                            {searchVoucher && (
                                <Voucher
                                    key={searchVoucher.id}
                                    voucher={searchVoucher}
                                    type={type}
                                    action={action}
                                    setOpen={setOpen}
                                    {...props}
                                />
                            )}
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            className={classes.voucher__content__tab}
                        >
                            <Box sx={{ width: "100%" }}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="basic tabs example"
                                    >
                                        <Tab label="All" {...a11yProps(0)} />
                                        <Tab label="Shop" {...a11yProps(1)} />
                                        <Tab label="Tiki" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <VoucherPanel
                                        index={0}
                                        vouchers={vouchers}
                                        type={type}
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    Item Two
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    Item Three
                                </CustomTabPanel>
                            </Box>
                        </Grid>
                    )}
                </Grid>
                <AddNewShopVoucher open={open} setOpen={setOpen} />
            </Grid>
        </Grid>
    );
};

const UserVoucher = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const type = props.type;
    const action = props.action;
    const shopId = props.shopId;
    const user = useSelector((state) => state.auth.user);
    const vouchers = useSelector((state) =>
        action === "apply"
            ? state.vouchers.shopVouchers
            : state.vouchers.userVouchers
    );

    useEffect(() => {
        if (action === "apply") {
            dispatch(voucherActions.getVouchersByShopId(shopId));
        } else {
            dispatch(voucherActions.getVouchersByUserId(user.id));
        }
    }, [dispatch, user, shopId]);

    return (
        <>
            {vouchers &&
                (action === "apply" ? (
                    <VoucherRender
                        vouchers={vouchers}
                        type={type}
                        action={action}
                        {...props}
                    />
                ) : (
                    <VoucherRender
                        vouchers={vouchers}
                        type={type}
                        user={user}
                    />
                ))}
        </>
    );
};

const ShopVoucher = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const type = props.type;
    const user = useSelector((state) => state.auth.user);
    const vouchers = useSelector((state) => state.vouchers.shopVouchers);
    const shop = useSelector((state) => state.shops.userShop);

    useEffect(() => {
        dispatch(shopActions.getShopByUserId(user.id));
    }, [dispatch, user.id]);

    useEffect(() => {
        dispatch(voucherActions.getVouchersByShopId(shop.id));
    }, [dispatch, shop.id]);

    return <>{vouchers && <VoucherRender vouchers={vouchers} type={type} />}</>;
};

const AddNewShopVoucher = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const shop = useSelector((state) => state.shops.userShop);

    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState(10);
    const [minimumSpend, setMinimumSpend] = useState(100000);
    const [maximumDiscount, setMaximumDiscount] = useState(10000);
    const [expiryDate, setExpiryDate] = useState(dayjs("2023-12-12"));
    const [description, setDescription] = useState("");

    const handleClose = () => {
        props.setOpen(false);
    };

    const convertDate = (date) => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    const handleDateChange = (date) => {
        setExpiryDate(date);
    };

    const checkValidCode = (code) => {
        if (code.length > 10) {
            setCode(code.slice(0, 10));
        } else {
            setCode(code);
        }
    };

    const handleSubmit = () => {
        const voucher = {
            code,
            discount,
            minimumSpend,
            maximumDiscount,
            expiryDate: convertDate(expiryDate),
            description,
        };
        dispatch(voucherActions.createNewVoucher(voucher, shop.id));
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Add new voucher</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add new voucher for your shop here
                    </DialogContentText>
                    <Grid container className={classes.voucher__dialog}>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography>Code</Typography>
                            <MuiInput
                                aria-label="Code input"
                                placeholder="Eg: ABC123"
                                value={code}
                                // setValue={setCode}
                                className={classes.voucher__input}
                                autoFocus
                                onChange={(e) => checkValidCode(e.target.value)}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography>Discount</Typography>
                            <MuiNumberInput
                                value={discount}
                                setValue={setDiscount}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography>Minimum Spend</Typography>
                            <MuiNumberInput
                                value={minimumSpend}
                                setValue={setMinimumSpend}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography>Maximum Discount</Typography>
                            <MuiNumberInput
                                value={maximumDiscount}
                                setValue={setMaximumDiscount}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography>Expiry Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker", "DatePicker"]}
                                >
                                    <DatePicker
                                        value={expiryDate}
                                        onChange={(e) => handleDateChange(e)}
                                        className={classes.datePicker}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className={classes.voucher__dialog__part}
                        >
                            <Typography style={{ marginBottom: "0.5em" }}>
                                Description
                            </Typography>
                            <MuiInput
                                aria-label="Description input"
                                placeholder="Eg: Apply for all products"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const MyVoucher = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const type = props.type;
    const action = props.action;

    return (
        <>
            {type === "shop" ? (
                <ShopVoucher type={"shop"} />
            ) : (
                <UserVoucher type={"user"} action={action} {...props} />
            )}
        </>
    );
};

export default MyVoucher;
