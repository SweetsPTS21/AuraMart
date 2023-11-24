import React, { useState } from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
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
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
    addNewStock,
    updateStockById,
} from "../../../store/actions/stockActions";
import MuiNumberInput from "../../layout/MuiNumberInput";
import MuiInput from "../../layout/MuiInput";
import { message } from "antd";

const userStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "20px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    stockSuccess: {
        color: "#fff !important",
        backgroundColor: "#4caf50 !important",
    },
    stock__dialog: {
        padding: "1em 0",
        display: "flex",
        flexWrap: "wrap",
    },
    part: {
        display: "flex",
        flexDirection: "column",
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

const StockTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    bstockRadius: "0.5em",
}));

const StockTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StockTableHead = styled(TableHead)(({ theme }) => ({
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
                    Do you want to cancel this stock?
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

const UpdateStock = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const { open, setOpen, type, shopId, stock } = props;
    const [name, setName] = useState(stock.name);
    const [phone, setPhone] = useState(stock.phone);
    const [address, setAddress] = useState(stock.address);
    const [description, setDescription] = useState(stock.description);
    const [capacity, setCapacity] = useState(stock.capacity);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const msg = message.loading("Updating stock...", 0);
        const newStock = {
            name,
            description,
            phone,
            address,
            capacity,
        };
        if (type === 2) dispatch(updateStockById(shopId, newStock, stock.id));
        else dispatch(addNewStock(shopId, newStock));

        setTimeout(msg, 1);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add/Update stock</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add/Update stock for your shop here
                </DialogContentText>
                <Grid container className={classes.stock__dialog}>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Name</Typography>
                        <MuiInput
                            aria-label="Name"
                            placeholder="Eg: Kho 1"
                            value={name}
                            // setValue={setCode}
                            className={classes.stock__input}
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ flexDirection: "column" }}>
                        <Typography>Description</Typography>
                        <MuiInput
                            aria-label="Description"
                            placeholder="Eg: description"
                            value={description}
                            // setValue={setCode}
                            className={classes.stock__input}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Capacity</Typography>
                        <MuiNumberInput
                            value={capacity}
                            setValue={setCapacity}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ flexDirection: "column" }}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Phone
                        </Typography>
                        <MuiInput
                            aria-label="Phone"
                            placeholder="Eg: 0897654621"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ flexDirection: "column" }}>
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Address
                        </Typography>
                        <MuiInput
                            aria-label="Address"
                            placeholder="Eg: Hà Đông, Hà Nội"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Stocks = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0);
    const [currentStock, setCurrentStock] = useState({});
    const itemsPerPage = 5;

    const shop = useSelector((state) => state.shops.userShop);
    const stocks = useSelector((state) => state.stocks.allShopStocks);

    const filteredStocks = stocks
        ? stocks.filter((stock) =>
              stock.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredStocks' based on the search result
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleUpdate = (type, stock) => {
        setCurrentStock(stock);
        setOpen(true);
        setType(type);
    };

    const handleConfirmDelete = () => {
        console.log("Delete stock");
    };

    return (
        <div style={{ width: "100%", padding: "0.5em" }}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    backgroundColor: "#fff",
                    bstockRadius: "0.5em",
                    padding: "1.5em",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: theme.spacing(2),
                }}
            >
                <Typography variant="h5">Search</Typography>
                <Autocomplete
                    id="search-stock"
                    options={stocks ? stocks.map((stock) => stock.name) : []}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Stock"
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
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdate(1, {})}
                    style={{ marginLeft: "1em" }}
                >
                    Add new stock
                </Button>
            </div>

            <StockTableContainer component={Paper}>
                <Table>
                    <StockTableHead>
                        <TableRow>
                            <StockTableCell>ID Stock</StockTableCell>
                            <StockTableCell>Name</StockTableCell>
                            <StockTableCell>Phone</StockTableCell>
                            <StockTableCell>Address</StockTableCell>
                            <StockTableCell>Capacity</StockTableCell>
                            <StockTableCell>Actions</StockTableCell>
                        </TableRow>
                    </StockTableHead>
                    <TableBody>
                        {filteredStocks
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((stock) => (
                                <>
                                    <TableRow key={stock.id}>
                                        <StockTableCell>
                                            {stock.id}
                                        </StockTableCell>
                                        <StockTableCell
                                            style={{ maxWidth: "548px" }}
                                        >
                                            {stock.name}
                                        </StockTableCell>
                                        <StockTableCell>
                                            {stock.phone}
                                        </StockTableCell>
                                        <StockTableCell>
                                            {stock.address}
                                        </StockTableCell>
                                        <StockTableCell>
                                            {stock.capacity}
                                        </StockTableCell>
                                        <StockTableCell
                                            style={{ width: "152px" }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleUpdate(type, stock)
                                                }
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    setOpenDialog(true)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </StockTableCell>
                                    </TableRow>
                                </>
                            ))}
                        {filteredStocks.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No stock found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </StockTableContainer>
            {open && (
                <UpdateStock
                    open={open}
                    setOpen={setOpen}
                    stock={currentStock}
                    type={type}
                    shopId={shop.id}
                />
            )}
            {openDialog && (
                <DialogDelete
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    handleConfirmDelete={handleConfirmDelete}
                />
            )}

            <Pagination
                count={Math.ceil(filteredStocks.length / itemsPerPage)}
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

export default Stocks;
