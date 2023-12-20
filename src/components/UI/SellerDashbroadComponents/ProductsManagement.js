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
import { Delete, Edit, Settings, Visibility } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UpdateAProductForm from "../AdminDashboardComponents/Products/UpdateAProductForm";
import { useDispatch, useSelector } from "react-redux";
import AddANewProduct from "../AdminDashboardComponents/Products/AddANewProduct";
import MuiNumberInput from "../../layout/MuiNumberInput";
import MuiInput from "../../layout/MuiInput";
import MuiSelect from "../../layout/MuiSelect";

import { setSaleProduct } from "../../../store/actions/productActions";
import { message } from "antd";

const userStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginTop: "20px",
    },
    stock__dialog: {
        padding: "1em 0",
        display: "flex",
        flexWrap: "wrap",
    },
    sale__status: {
        color: "#fff",
        fontWeight: "500",
        width: "100px",
        // height: "30px",
        borderRadius: "0.5em",
        textAlign: "center",
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

const ProductTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: "0.5em",
}));

const ProductTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const ProductTableHead = styled(TableHead)(({ theme }) => ({
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
                    Do you want to delete this product?
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

const UpdateProduct = (props) => {
    const { open, setOpen, product, type } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                {/* Form fields for editing the product */}
                {type === 0 ? (
                    <AddANewProduct
                        style={{ width: "100%", padding: 0, margin: 0 }}
                    />
                ) : (
                    <UpdateAProductForm
                        product={product}
                        setShowProductCard={setOpen}
                        style={{ padding: 0, margin: 0 }}
                        role="seller"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

const SaleConfig = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const { shop, open, setOpen, saleProduct } = props;
    const [sale, setSale] = useState(saleProduct.sale);
    const [discount, setDiscount] = useState(saleProduct.discount);
    const [quantity, setQuantity] = useState(saleProduct.quantity);
    const [soldQuantity] = useState(saleProduct.soldQuantity);
    const [beginAt, setBeginAt] = useState(saleProduct.beginAt);
    const [endIn, setEndIn] = useState(saleProduct.endIn);

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = async () => {
        const msg = message.loading("Updating product", 0);
        const saleProduct_ = {
            sale: sale === "Sale" ? true : false,
            discount,
            quantity,
            beginAt,
            endIn,
            soldQuantity,
        };
        await dispatch(setSaleProduct(shop._id, saleProduct.id, saleProduct_));
        setTimeout(msg, 1);
        handleClose();
    };

    const status = ["Sale", "Not On Sale"];
    const duration = ["30", "60", "90", "120"];

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Sale config</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update sale status for this product Sold quantity:{" "}
                    {soldQuantity}
                </DialogContentText>
                <Grid container className={classes.stock__dialog}>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Giảm giá</Typography>
                        <MuiNumberInput
                            value={discount}
                            setValue={setDiscount}
                            required={true}
                            defaultValue={0}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Số lượng</Typography>
                        <MuiNumberInput
                            value={quantity}
                            setValue={setQuantity}
                            required={true}
                            defaultValue={0}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Bắt đầu vào</Typography>
                        <MuiInput
                            aria-label="Begin"
                            type="date"
                            defaultValue={Date.now()}
                            value={beginAt}
                            onChange={(e) => setBeginAt(e.target.value)}
                            required={true}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography>Kết trúc trong (phút)</Typography>
                        <MuiSelect
                            aria-label="Sale"
                            value={endIn}
                            setValue={setEndIn}
                            items={duration}
                            required={true}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ flexDirection: "column", marginBottom: "1em" }}
                    >
                        <Typography style={{ marginBottom: "0.5em" }}>
                            Sale
                        </Typography>
                        <MuiSelect
                            aria-label="Sale"
                            value={sale}
                            setValue={setSale}
                            items={status}
                            required={true}
                            // onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant={"contained"}
                    style={{ backgroundColor: "#1976d2" }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ProductsManagement = () => {
    const theme = useTheme();
    const classes = userStyles();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSaleConfig, setOpenSaleConfig] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0);
    const itemsPerPage = 5;
    const [currentItem, setCurrentItem] = useState({});
    const products = useSelector((state) => state.products.productsInShop);
    const shop = useSelector((state) => state.shops.userShop);

    const filteredProducts =  products && products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredProducts' based on the search result
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (type, product) => {
        setOpen(true);
        setType(type);
        setCurrentItem(product);
    };

    const handleOpenSaleConfig = (product) => {
        setOpenSaleConfig(true);
        setCurrentItem(product);
    };

    const handleConfirmDelete = () => {
        console.log("Delete product");
    };

    const productStatus = (stock, sold) => {
        const status = parseInt(stock) - parseInt(sold ? sold : 0);
        return (
            <Typography
                className={classes.sale__status}
                style={{
                    backgroundColor: status > 0 ? "green" : "red",
                }}
            >
                {status > 0 ? status : "Out of stock"}
            </Typography>
        )
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
                    id="search-product"
                    options={products && products.map((product) => product.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Product"
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
                    color="primary"
                    size="medium"
                    onClick={() => handleOpenDialog(0, {})}
                    style={{ marginLeft: "1em" }}
                >
                    Add New Product
                </Button>
            </div>

            <ProductTableContainer component={Paper}>
                <Table>
                    <ProductTableHead>
                        <TableRow>
                            <ProductTableCell>ID Product</ProductTableCell>
                            <ProductTableCell>Product Name</ProductTableCell>
                            <ProductTableCell>Image</ProductTableCell>
                            <ProductTableCell>Product Price</ProductTableCell>
                            <ProductTableCell>Product Status</ProductTableCell>
                            <ProductTableCell>Sale status</ProductTableCell>
                            <ProductTableCell>Actions</ProductTableCell>
                        </TableRow>
                    </ProductTableHead>
                    <TableBody>
                        {filteredProducts
                            .sort((a, b) => b.sale - a.sale)
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((product) => (
                                <>
                                    <TableRow key={product.id}>
                                        <ProductTableCell
                                            style={{ width: "220px" }}
                                        >
                                            {product.id}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.name}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            <img
                                                src={product.photo}
                                                alt={product.name}
                                                style={{
                                                    width: "64px",
                                                    height: "64px",
                                                }}
                                            />
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.price}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {productStatus(product.quantity, product.soldQuantity)}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    className={
                                                        classes.sale__status
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            product.sale
                                                                ? "#13C2C2"
                                                                : "#FF3838",
                                                    }}
                                                >
                                                    {product.sale
                                                        ? "On Sale"
                                                        : "Not On Sale"}
                                                </Typography>
                                                <IconButton
                                                    color="success"
                                                    onClick={() =>
                                                        handleOpenSaleConfig(
                                                            product
                                                        )
                                                    }
                                                >
                                                    <Settings />
                                                </IconButton>
                                            </div>
                                        </ProductTableCell>
                                        <ProductTableCell
                                            style={{ width: "180px" }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDialog(1, product)
                                                }
                                                color="primary"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="success">
                                                <Visibility />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    setOpenDialog(true)
                                                }
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </ProductTableCell>
                                    </TableRow>
                                    {open && (
                                        <UpdateProduct
                                            open={open}
                                            setOpen={setOpen}
                                            product={currentItem}
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
                                    {openSaleConfig && (
                                        <SaleConfig
                                            shop={shop}
                                            open={openSaleConfig}
                                            setOpen={setOpenSaleConfig}
                                            saleProduct={currentItem}
                                        />
                                    )}
                                </>
                            ))}
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No products found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ProductTableContainer>

            <Pagination
                count={Math.ceil(filteredProducts.length / itemsPerPage)}
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

export default ProductsManagement;
