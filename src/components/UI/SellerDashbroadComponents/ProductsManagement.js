import React from "react";
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
}));

const ProductsManagement = () => {
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
        <div className={classes.root}>
            <Grid container spacing={3}></Grid>
        </div>
    );
};

export default ProductsManagement;