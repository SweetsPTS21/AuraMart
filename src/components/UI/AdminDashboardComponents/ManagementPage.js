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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@material-ui/core";
import AddANewProduct from "./Products/AddANewProduct";
import UpdateAProductForm from "./Products/UpdateAProductForm";
import AddNewUser from "./User/AddNewUser";
import UpdateUserForm from "./User/UpdateUserForm";
import AddNewOrder from "./Orders/AddNewOrder";
import UpdateOrderForm from "./Orders/UpdateOrderForm";
import AddANewReview from "./reviews/AddNewReview";
import UpdateReviewForm from "./reviews/UpdateReviewForm";

const ProductTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: "0.5em",
}));

const ProductTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
                    Do you want to delete this item?
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

const UpdateData = (props) => {
    const { open, setOpen, item, type, dataType } = props;
    const [ setShowDialog] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                {/* Form fields for editing the product */}
                {dataType === "products" &&
                    (type === 0 ? (
                        <AddANewProduct
                            style={{ width: "100%", padding: 0, margin: 0 }}
                        />
                    ) : (
                        <UpdateAProductForm
                            product={item}
                            setShowProductCard={setShowDialog}
                            style={{ padding: 0, margin: 0 }}
                        />
                    ))}
                {dataType === "users" &&
                    (type === 0 ? (
                        <AddNewUser
                            style={{ width: "100%", padding: 0, margin: 0 }}
                        />
                    ) : (
                        <UpdateUserForm
                            user={item}
                            setShowUserCard={setShowDialog}
                            style={{ padding: 0, margin: 0 }}
                        />
                    ))}
                {dataType === "orders" &&
                    (type === 0 ? (
                        <AddNewOrder
                            style={{ width: "100%", padding: 0, margin: 0 }}
                        />
                    ) : (
                        <UpdateOrderForm
                            order={item}
                            setShowUpdateForm={setShowDialog}
                            style={{ padding: 0, margin: 0 }}
                        />
                    ))}
                {dataType === "reviews" &&
                    (type === 0 ? (
                        <AddANewReview
                            style={{ width: "100%", padding: 0, margin: 0 }}
                        />
                    ) : (
                        <UpdateReviewForm
                            review={item}
                            setShowUpdateForm={setShowDialog}
                            style={{ padding: 0, margin: 0 }}
                        />
                    ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

const ManagementPage = (props) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [setSearchText] = useState("");
    const [currentItem, setCurrentItem] = useState({});
    const [page, setPage] = useState(1);
    const [type, setType] = useState(0);
    const itemsPerPage = 5;
    const { data, dataType } = props;

    const usersCol = ["_id", "name", "age", "gender", "email", "role"];
    const productsCol = [
        "_id",
        "name",
        "price",
        "quantity",
        "category",
        "brand",
    ];
    const ordersCol = [
        "_id",
        "user",
        "address",
        "phone",
        "total",
        "shop",
        "currentState",
        "paymentMethod",
        "paymentState",
        "createdAt",
    ];
    const reviewsCol = [
        "_id",
        "title",
        "text",
        "rating",
        "product",
        "user",
        "createdAt",
    ];

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredProducts' based on the search result
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (type, item) => {
        setOpen(true);
        setType(type);
        setCurrentItem(item);
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
                    id="search-item"
                    options={data.map((item) => item.name)}
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
                            {dataType === "users" &&
                                usersCol.map((col) => (
                                    <ProductTableCell key={col}>{col}</ProductTableCell>
                                ))}
                            {dataType === "products" &&
                                productsCol.map((col) => (
                                    <ProductTableCell key={col}>{col}</ProductTableCell>
                                ))}
                            {dataType === "orders" &&
                                ordersCol.map((col) => (
                                    <ProductTableCell key={col}>{col}</ProductTableCell>
                                ))}
                            {dataType === "reviews" &&
                                reviewsCol.map((col) => (
                                    <ProductTableCell key={col}>{col}</ProductTableCell>
                                ))}
                            <ProductTableCell>Actions</ProductTableCell>
                        </TableRow>
                    </ProductTableHead>
                    <TableBody>
                        {data
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((item) => (
                                <>
                                    <TableRow key={item._id}>
                                        {dataType === "users" &&
                                            usersCol.map((col) => (
                                                <ProductTableCell key={col}>
                                                    {item[col]}
                                                </ProductTableCell>
                                            ))}
                                        {dataType === "products" &&
                                            productsCol.map((col) => (
                                                <ProductTableCell key={col}>
                                                    {item[col]}
                                                </ProductTableCell>
                                            ))}
                                        {dataType === "orders" &&
                                            ordersCol.map((col) => (
                                                <ProductTableCell key={col}>
                                                    {item[col]}
                                                </ProductTableCell>
                                            ))}
                                        {dataType === "reviews" &&
                                            reviewsCol.map((col) => (
                                                <ProductTableCell key={col}>
                                                    {item[col]}
                                                </ProductTableCell>
                                            ))}
                                        <ProductTableCell
                                            style={{ width: "152px" }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDialog(1, item)
                                                }
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="success">
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() =>
                                                    setOpenDialog(true)
                                                }
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ProductTableCell>
                                    </TableRow>
                                    {open && (
                                        <UpdateData
                                            open={open}
                                            setOpen={setOpen}
                                            item={currentItem}
                                            type={type}
                                            dataType={dataType}
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
                                </>
                            ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No items found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ProductTableContainer>

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
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

export default ManagementPage;
