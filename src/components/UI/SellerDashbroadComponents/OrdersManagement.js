import React, { useState } from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderById } from "../../../store/actions/orderActions";
import MuiSelect from "../../layout/MuiSelect";
import MuiInput from "../../layout/MuiInput";
import { message } from "antd";
import { Visibility } from "@mui/icons-material";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "20px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    orderSuccess: {
        color: "#fff !important",
        backgroundColor: "#4caf50 !important",
    },
    order__dialog: {
        padding: "1em 0",
    },
    order__dialog__part: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1em",
        margin: "0.5em 0",
    },
    "@global .MuiDialog-paperWidthSm.css-1t1j96h-MuiPaper-root-MuiDialog-paper":
        {
            maxWidth: "600px !important",
        },
    "@global .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
        backgroundColor: "rgb(0 0 0 / 32%) !important",
    },
}));

const OrderTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: "0.5em",
}));

const OrderTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const OrderTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "& th": {
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
}));

const DialogDelete = (props) => {
    const { openDialog, setOpenDialog, handleConfirmDelete } = props;

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleConfirm = () => {
        handleConfirmDelete();
        setOpenDialog(false);
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
                    Do you want to cancel this order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} autoFocus>
                    Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateOrder = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { open, setOpen, order } = props;

    const [name, setName] = useState(order.receiver);
    const [phone, setPhone] = useState(order.phone);
    const [address, setAddress] = useState(order.address);
    const [date, setDate] = useState(order.createdAt);
    const [total, setTotal] = useState(order.total);
    const [currentState, setCurrentState] = useState(order.currentState);

    const states = [
        "Ordered Successfully",
        "Tiki Received",
        "Getting Product",
        "Packing",
        "Shipping",
        "Delivered",
    ];

    const formatDate = (date) => {
        const d = new Date(date);
        return format(d, "yyyy-MM-dd");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const msg = message.loading("Updating order...", 0);

        const newOrder = {
            receiver: name,
            phone: phone,
            address: address,
            createdAt: date,
            total: total,
            currentState: currentState,
            shop: order.shop,
        };

        dispatch(updateOrderById(newOrder, order._id));
        setTimeout(msg, 1);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cập nhật thông tin đơn hàng</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Cập nhật thông tin đơn hàng của bạn tại đây
                </DialogContentText>
                <Grid container className={classes.order__dialog}>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography>Người nhận</Typography>
                        <MuiInput
                            aria-label="Name"
                            placeholder="Eg: Kho 1"
                            value={name}
                            className={classes.order__input}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography>Số điện thoại</Typography>
                        <MuiInput
                            aria-label="Phone"
                            placeholder="Eg: 0981234567"
                            value={phone}
                            className={classes.order__input}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Địa chỉ
                        </Typography>
                        <MuiInput
                            aria-label="Address"
                            placeholder="Eg: Ha Dong, Ha Noi"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Ngày đặt hàng
                        </Typography>
                        <MuiInput
                            aria-label="Date"
                            type="date"
                            placeholder="Eg: 2021-10-10"
                            value={formatDate(date)}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Trạng thái
                        </Typography>
                        <MuiSelect
                            aria-label="Status"
                            value={currentState}
                            setValue={setCurrentState}
                            items={states}
                            // onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.order__dialog__part}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Tổng tiền
                        </Typography>
                        <MuiInput
                            aria-label="Total"
                            placeholder="Eg: 100000"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const OrderDetail = (props) => {
    const classes = useStyles();
    const { products, open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const formatVND = (price) => {
        return price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Chi tiết sản phẩm trong đơn hàng
                </DialogContentText>
                <Grid container className={classes.order__dialog}>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Grid
                                item
                                xs={12}
                                style={{
                                    display: "flex",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.5em",
                                    padding: "0.5em 1em",
                                    marginBottom: "0.5em",
                                }}
                            >
                                <img
                                    src={product.product.photo}
                                    alt=""
                                    style={{ width: "90px", height: "90px" }}
                                />
                                <div style={{ paddingLeft: "1em" }}>
                                    <Typography>
                                        {product.product.name}
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "5px",
                                            paddingTop: "0.5em",
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                padding: "2px 4px",
                                                borderRadius: "4px",
                                                color: "#fff",
                                                backgroundColor: "#12B76A",
                                            }}
                                        >
                                            x{product.quantity}
                                        </Typography>
                                        <Typography
                                            style={{
                                                padding: "2px 4px",
                                                borderRadius: "4px",
                                                color: "#fff",
                                                backgroundColor: "#4C5768",
                                            }}
                                        >
                                            {product.color}
                                        </Typography>
                                        <Typography
                                            style={{
                                                padding: "2px 4px",
                                                borderRadius: "4px",
                                                color: "#fff",
                                                backgroundColor: "#13C2C2",
                                            }}
                                        >
                                            {formatVND(product.product.price)}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            style={{
                                padding: "1em",
                                backgroundColor: "#FF3838",
                                color: "#fff",
                                borderRadius: "0.5em",
                            }}
                        >
                            Không thể hiện thị danh sách sản phẩm
                        </Typography>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

const OrdersManagement = () => {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0);
    const itemsPerPage = 5;
    const [currentItem, setCurrentItem] = useState({});

    const orders = useSelector((state) => state.orders.allShopOrders);

    const filteredOrders = orders
        ? orders.filter((order) =>
              order._id.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredOrders' based on the search result
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return format(d, "dd/MM/yyyy HH:mm:ss");
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (type, order) => {
        setOpen(true);
        setType(type);
        setCurrentItem(order);
    };

    const handleOpenDetail = (order) => {
        setOpenDetail(true);
        setCurrentItem(order);
    };

    const handleConfirmDelete = () => {
        console.log("Delete order");
    };

    return (
        <div style={{ width: "100%", padding: "0.5em" }}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    backgroundColor: "#fff",
                    borderRadius: "0.5em",
                    padding: "1.5em",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: theme.spacing(2),
                }}
            >
                <Typography variant="h5">Search</Typography>
                <Autocomplete
                    id="search-order"
                    options={orders ? orders.map((order) => order._id) : []}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Order"
                            variant="outlined"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    )}
                    style={{ margin: "0 1em", width: "500px" }}
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>

            <OrderTableContainer component={Paper}>
                <Table>
                    <OrderTableHead>
                        <TableRow>
                            <OrderTableCell>ID Order</OrderTableCell>
                            <OrderTableCell>Name</OrderTableCell>
                            <OrderTableCell>Phone</OrderTableCell>
                            <OrderTableCell>Address</OrderTableCell>
                            <OrderTableCell>Order Date</OrderTableCell>
                            <OrderTableCell>Status</OrderTableCell>
                            <OrderTableCell>Total</OrderTableCell>
                            <OrderTableCell>Actions</OrderTableCell>
                        </TableRow>
                    </OrderTableHead>
                    <TableBody>
                        {filteredOrders
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((order) => (
                                <>
                                    <TableRow key={order._id}>
                                        <OrderTableCell>
                                            {order._id}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            style={{ maxWidth: "548px" }}
                                        >
                                            {order.receiver}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {order.phone}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {order.address}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {formatDate(order.createdAt)}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            className={classes.orderSuccess}
                                        >
                                            {order.currentState}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {order.total}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            style={{ width: "152px" }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDialog(1, order)
                                                }
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDetail(order)
                                                }
                                                color="secondary"
                                            >
                                                <Visibility />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    setOpenDialog(true)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </OrderTableCell>
                                    </TableRow>
                                    {open && (
                                        <UpdateOrder
                                            open={open}
                                            setOpen={setOpen}
                                            order={currentItem}
                                            type={type}
                                        />
                                    )}
                                    {openDialog && (
                                        <DialogDelete
                                            openDialog={openDialog}
                                            setOpenDialog={setOpenDialog}
                                            handleConfirmDelete={
                                                handleConfirmDelete
                                            }
                                        />
                                    )}
                                    {openDetail && (
                                        <OrderDetail
                                            open={openDetail}
                                            setOpen={setOpenDetail}
                                            products={currentItem.orderDetails}
                                        />
                                    )}
                                </>
                            ))}
                        {filteredOrders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No orders found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </OrderTableContainer>

            <Pagination
                count={Math.ceil(filteredOrders.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{
                    marginTop: theme.spacing(2),
                    display: "flex",
                    justifyContent: "center",
                }}
            />
        </div>
    );
};

export default OrdersManagement;
