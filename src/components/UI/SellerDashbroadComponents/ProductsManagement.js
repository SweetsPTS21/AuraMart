import React, { useState, useEffect } from "react";
import {
    Autocomplete,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@material-ui/core";
import UpdateAProductForm from "../AdminDashboardComponents/Products/UpdateAProductForm";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByShopId } from "../../../store/actions/productActions";
import AddANewProduct from "../AdminDashboardComponents/Products/AddANewProduct";
import { set } from "date-fns";

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
    "@global .MuiDialog-paperWidthSm.css-1t1j96h-MuiPaper-root-MuiDialog-paper":
        {
            maxWidth: "600px !important",
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
    const [showProductCard, setShowProductCard] = useState(false);

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
                        setShowProductCard={setShowProductCard}
                        style={{ padding: 0, margin: 0 }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

const ProductsManagement = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0);
    const itemsPerPage = 5;

    const shop = useSelector((state) => state.shops.userShop);
    const products = useSelector((state) => state.products.productsInShop);
    useEffect(() => {
        dispatch(getProductsByShopId(shop.id));
    }, [shop]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredProducts' based on the search result
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (type) => {
        setOpen(true);
        setType(type);
    };

    const handleConfirmDelete = () => {
        console.log("Delete product");
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
                    options={products.map((product) => product.name)}
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
                    onClick={(e) => handleOpenDialog(0)}
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
                            <ProductTableCell>Product Price</ProductTableCell>
                            <ProductTableCell>Product Status</ProductTableCell>
                            <ProductTableCell>Sale status</ProductTableCell>
                            <ProductTableCell>Actions</ProductTableCell>
                        </TableRow>
                    </ProductTableHead>
                    <TableBody>
                        {filteredProducts
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((product) => (
                                <>
                                    <TableRow key={product.id}>
                                        <ProductTableCell>
                                            {product.id}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.name}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.price}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.status}
                                        </ProductTableCell>
                                        <ProductTableCell>
                                            {product.sale}
                                        </ProductTableCell>
                                        <ProductTableCell
                                            style={{ width: "152px" }}
                                        >
                                            <IconButton
                                                onClick={(e) =>
                                                    handleOpenDialog(1)
                                                }
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="success">
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) =>
                                                    setOpenDialog(true)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ProductTableCell>
                                    </TableRow>
                                    <UpdateProduct
                                        open={open}
                                        setOpen={setOpen}
                                        product={product}
                                        type={type}
                                    />
                                    <DialogDelete
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                        handleConfirmDelete={
                                            handleConfirmDelete
                                        }
                                    />
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