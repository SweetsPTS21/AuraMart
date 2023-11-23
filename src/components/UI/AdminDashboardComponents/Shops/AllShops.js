import React, { useState } from "react";
import userStyles from "../styles/AllUsersStyles";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";

import { Accessibility, Update } from "@material-ui/icons";

import CardFooter from "../Card/CardFooter";
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
    Typography,
    Paper,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { ShopCard } from "./ShopCard2";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import ShopStats from "../Stats/ShopStats";
import ManagementPage from "../ManagementPage";
import { message } from "antd";

import { approveShop } from "../../../../store/actions/shopActions";

const OrderTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: "0.5em",
}));

const OrderTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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

const ShopToApprove = (props) => {
    const { shopsToApprove } = props;
    const theme = useTheme();
    const classes = userStyles();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [currentShop, setCurrentShop] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredShops = shopsToApprove
        ? shopsToApprove.filter((shop) =>
              shop.id.toLowerCase().includes(searchText.toLowerCase())
          )
        : [];

    const handleSearch = () => {
        // Implement your search logic here
        // Update the 'filteredShops' based on the search result
    };

    const handleChangeStatus = async (shopId) => {
        // Implement your search logic here
        // Update the 'filteredShops' based on the search result
        const msg = message.loading("Approving shop...", 0);

        await dispatch(approveShop(shopId));

        setTimeout(msg, 1);
    };

    return (
        <>
            <Typography variant="h5">Duyệt cửa hàng</Typography>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    backgroundColor: "#fff",
                    borderRadius: "0.5em",
                    padding: "1.5em",
                    marginTop: theme.spacing(1),
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: theme.spacing(2),
                }}
            >
                <Typography variant="h5">Search</Typography>
                <Autocomplete
                    id="search-shop"
                    options={
                        shopsToApprove
                            ? shopsToApprove.map((shop) => shop.name)
                            : []
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search shop"
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
                            <OrderTableCell>ID</OrderTableCell>
                            <OrderTableCell>Name</OrderTableCell>
                            <OrderTableCell>Phone</OrderTableCell>
                            <OrderTableCell>Address</OrderTableCell>
                            <OrderTableCell>User</OrderTableCell>
                            <OrderTableCell>Date</OrderTableCell>
                            <OrderTableCell>Status</OrderTableCell>
                        </TableRow>
                    </OrderTableHead>
                    <TableBody>
                        {filteredShops
                            .slice(
                                (page - 1) * itemsPerPage,
                                page * itemsPerPage
                            )
                            .map((shop) => (
                                <>
                                    <TableRow key={shop.id}>
                                        <OrderTableCell
                                            style={{ maxWidth: "150px" }}
                                        >
                                            {shop.id}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            style={{ maxWidth: "250px" }}
                                        >
                                            {shop.name}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {shop.phone}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            style={{ maxWidth: "220px" }}
                                        >
                                            {shop.address}
                                        </OrderTableCell>
                                        <OrderTableCell>
                                            {shop.user}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            className={classes.orderSuccess}
                                        >
                                            {shop.createdAt}
                                        </OrderTableCell>
                                        <OrderTableCell
                                            style={{ width: "190px" }}
                                        >
                                            {shop.status === "pending" ? (
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            shop.id
                                                        )
                                                    }
                                                >
                                                    {" "}
                                                    Duyệt{" "}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    disabled
                                                >
                                                    {" "}
                                                    Duyệt{" "}
                                                </Button>
                                            )}
                                        </OrderTableCell>
                                    </TableRow>
                                </>
                            ))}
                        {filteredShops.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No shopsToApprove found!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </OrderTableContainer>

            <Pagination
                count={Math.ceil(filteredShops.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                style={{
                    marginTop: theme.spacing(2),
                    display: "flex",
                    justifyContent: "center",
                }}
            />
        </>
    );
};

const AllShops = (props) => {
    const classes = userStyles();
    const allShops = useSelector((state) => state.shops.shops); // shops
    const [shops, setShops] = useState(null); // to update users that are rendered
    const [shopsToApprove, setShopsToApprove] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const [toggleShop, setToggleShop] = useState(false);
    const [currentShop, setCurrentShop] = useState(null);

    const [toggleSortOrder, setToggleSortOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [shopsLastUpdated, setShopsLastUpdated] = useState(Date.now());
    const [toggleList, setToggleList] = useState(false);
    const [filterOptions, setFilterOptions] = useState("createdAt");

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allShops !== null &&
            setTimeout(() => {
                setShops(allShops.filter((shop) => shop.status !== "pending"));
                setShopsToApprove(
                    allShops.filter((shop) => shop.status === "pending")
                );
                setFirstLoad(false);
            }, 1000);
    }

    const handleFilter = (sortDescending, filterOptions) => {
        setIsLoading(true);
        if (sortDescending) {
            switch (filterOptions) {
                case "createdAt":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.createdAt > b.createdAt ? -1 : 1
                        );
                    setIsLoading(false);
                    return shops;
                case "noOfProducts":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.products.length > b.products.length ? -1 : 1
                        );
                    setIsLoading(false);
                    return shops;
                default:
                    return shops;
            }
        } else {
            switch (filterOptions) {
                case "createdAt":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.createdAt > b.createdAt ? 1 : -1
                        );
                    setIsLoading(false);
                    return shops;
                case "noOfProducts":
                    shops !== null &&
                        shops.sort((a, b) =>
                            a.products.length > b.products.length ? 1 : -1
                        );
                    setIsLoading(false);
                    return shops;
                default:
                    return allShops;
            }
        }
    };
    return (
        <div style={{ width: "100%" }}>
            <Grid
                container
                style={{ marginTop: "0.7em", marginLeft: "0.5em" }}
                spacing={3}
            >
                <Grid
                    item
                    container
                    spacing={2}
                    xs={12}
                    className={classes.card}
                >
                    <Grid item xs={3} className={classes.card}>
                        <Card onClick={() => handleFilter(false, "totalShops")}>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>
                                    Total Shops
                                </p>
                                <h3 className={classes.cardTitle}>
                                    {allShops !== null && allShops.length}
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {shopsLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    </Grid>
                    <Grid item xs={3} className={classes.card}>
                        <Card onClick={() => handleFilter(false, "totalShops")}>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="warning">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>
                                    Need approve
                                </p>
                                <h3 className={classes.cardTitle}>
                                    {shopsToApprove !== null &&
                                        shopsToApprove.length}
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {shopsLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    </Grid>
                    <Grid item xs={3} className={classes.card}>
                        <Card onClick={() => handleFilter(false, "totalShops")}>
                            <CardHeader color="success" stats icon>
                                <CardIcon color="success">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>
                                    Total Shops
                                </p>
                                <h3 className={classes.cardTitle}>
                                    {allShops !== null && allShops.length}
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {shopsLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    </Grid>
                    <Grid item xs={3} className={classes.card}>
                        <Card onClick={() => handleFilter(false, "totalShops")}>
                            <CardHeader color="warning" stats icon>
                                <CardIcon color="warning">
                                    <Accessibility />
                                </CardIcon>
                                <p className={classes.cardCategory}>
                                    Need approve
                                </p>
                                <h3 className={classes.cardTitle}>
                                    {shopsToApprove !== null &&
                                        shopsToApprove.length}
                                </h3>
                            </CardHeader>
                            <CardFooter stats>
                                <div className={classes.stats}>
                                    <Update />
                                    <Moment
                                        fromNow
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {shopsLastUpdated}
                                    </Moment>
                                </div>
                            </CardFooter>
                        </Card>
                    </Grid>
                    <Grid item xs={6} className={classes.card}>
                        <ShopStats />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ShopToApprove shopsToApprove={shopsToApprove} />
                </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginLeft: "1em" }}>
                {shops !== null && shops.length > 0 && !toggleShop
                    ? shops.map((shop, index) => (
                          <Grid
                              item
                              xs={6}
                              md={5}
                              lg={4}
                              style={{ margin: 0 }}
                              key={index}
                          >
                              <ShopCard
                                  shop={shop}
                                  setCurrentShop={setCurrentShop}
                                  toggleShop={setToggleShop}
                              />
                          </Grid>
                      ))
                    : null}
                {toggleShop && (
                    <Fab
                        aria-label="add"
                        style={{ marginTop: "3em", marginLeft: "3em" }}
                        onClick={() => setToggleShop((val) => !val)}
                    >
                        <ArrowBackIcon />
                    </Fab>
                )}
                {currentShop !== null && toggleShop ? (
                    <ManagementPage
                        data={currentShop.products}
                        dataType={"products"}
                    />
                ) : null}
                {(shops === null || isLoading) && <LoadingSpinner />}
            </Grid>
        </div>
    );
};

export default AllShops;
