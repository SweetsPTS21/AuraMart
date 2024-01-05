import {
    Box,
    Button,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import MuiDialog from "../../../layout/MuiDialog";
import MuiNumberInput from "../../../layout/MuiNumberInput";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import { useEffect } from "react";
import {
    getRecommenderLogs,
    updateRecommenderSystem,
} from "../../../../store/actions/settingActions";
import { AddRounded, CloseRounded } from "@material-ui/icons";
import PropTypes from "prop-types";
import { setSystemBanners } from "../../../../store/actions/settingActions";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: "850px",
        margin: "0 auto",
    },
    block: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.5em",
        backgroundColor: "#fff",
        padding: "1em",
        margin: "1em 0",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1em",
    },
    field: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        marginBottom: "1em",
        fontSize: "1.2em",
        fontWeight: 600,
    },
    text: {
        fontWeight: "500",
        fontSize: "1em",
        marginBottom: "0.5em",
    },
    text__title: {
        fontWeight: "500",
        fontSize: "1em",
    },
    button: {
        color: "#fff",
        backgroundColor: "#ff424e",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#fa676e",
        },
    },
    button__round: {
        borderRadius: "50%",
        border: "1px solid #ccc",
        minWidth: "0",
        padding: "0.3em",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            border: "1px solid #FF3838",
        },
    },
    button__round2: {
        borderRadius: "50%",
        minWidth: "0",
        width: "2.5em",
        height: "2.5em",
        "&:focus": {
            outline: "none",
        },
    },
    loading: {},
}));

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

const SystemParams = (props) => {
    const { data } = props;
    const [hotSaleLimit, setHotSaleLimit] = useState(data.hotSaleLimit);
    const [recommendLimit, setRecommendLimit] = useState(data.recommendLimit);
    const [bestSellerLimit, setBestSellerLimit] = useState(
        data.bestSellerLimit
    );
    const classes = useStyles();

    return (
        <div className={classes.block}>
            <Typography className={classes.title}>
                Các thông số chung
            </Typography>
            <Grid container style={{ marginBottom: "1em" }}>
                <Grid item xs={12} className={classes.row}>
                    <Typography className={classes.text__title}>
                        Giới hạn số lượng sản phẩm hot sale
                    </Typography>
                    <MuiNumberInput
                        size="small"
                        value={hotSaleLimit}
                        setValue={setHotSaleLimit}
                    />
                </Grid>
                <Grid item xs={12} className={classes.row}>
                    <Typography className={classes.text__title}>
                        Giới hạn số lượng sản phẩm đề xuất
                    </Typography>
                    <MuiNumberInput
                        value={recommendLimit}
                        setValue={setRecommendLimit}
                    />
                </Grid>
                <Grid item xs={12} className={classes.row}>
                    <Typography className={classes.text__title}>
                        Số lượng sản phẩm bán chạy hiển thị
                    </Typography>
                    <MuiNumberInput
                        value={bestSellerLimit}
                        setValue={setBestSellerLimit}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

const RecommendedSystem = (props) => {
    const dispatch = useDispatch();
    const { data, logs } = props;
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        const msg = message.loading("Đang cập nhật hệ thống", 0);
        setIsUpdating(true);
        await dispatch(updateRecommenderSystem());

        setTimeout(() => {
            setIsUpdating(false);
            msg();
            message.success("Cập nhật thành công");
            setOpenDialog(false);
        }, 5000);
    };

    return (
        <div className={classes.block} style={{ position: "relative" }}>
            {isUpdating && (
                // Loading animation with absolute positioning
                <div
                    className="loading-animation"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgb(0 0 0 / 32%)", // Transparent white background
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0.5em",
                        zIndex: 50,
                    }}
                >
                    <LoadingSpinner />
                    <Typography style={{ fontSize: "1.2em", fontWeight: 600 }}>
                        Đang cập nhật...
                    </Typography>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography className={classes.title}>
                    Hệ thống đề xuất
                </Typography>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setOpenDialog(true)}
                >
                    Cập nhật
                </Button>
            </div>

            <Grid container style={{ marginBottom: "1em" }}>
                <Grid
                    item
                    xs={6}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                        paddingRight: "1em",
                    }}
                >
                    <div className={classes.field}>
                        <Typography className={classes.text}>Server</Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.server}
                        />
                    </div>
                    <div>
                        <Typography className={classes.text}>
                            Lần cập nhật gần nhất
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            value={data.lastUpdate}
                        />
                    </div>
                    <div>
                        <Typography className={classes.text}>
                            Dự kiến cập nhật tiếp theo
                        </Typography>
                        <TextField
                            type="datetime-local"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={data.nextUpdate}
                        />
                    </div>
                </Grid>
                <Grid
                    item
                    xs={6}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5em",
                    }}
                >
                    <div>
                        <Typography className={classes.text}>
                            Thời gian cập nhật
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            value={data.updateTime}
                        />
                    </div>
                    <div>
                        <Typography className={classes.text}>
                            Tổng số bản ghi
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            value={data.totalRecords}
                        />
                    </div>
                    <div>
                        <Typography className={classes.text}>
                            Cập nhật bởi
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                            value={data.updatedBy}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <div
                        style={{
                            width: "100%",
                            height: "450px",
                            border: "1px solid #ccc",
                            borderRadius: "0.5em",
                            backgroundColor: "#f7f8fb",
                            padding: "1em",
                            overflowY: "scroll",
                        }}
                    >
                        {logs &&
                            logs.length > 0 &&
                            logs.map((log) => (
                                <Typography key={log.id}>{log}</Typography>
                            ))}
                    </div>
                    <div
                        style={{
                            marginTop: "1em",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant="outlined">Download</Button>
                        <Button>Clear</Button>
                    </div>
                </Grid>
            </Grid>
            {openDialog && (
                <MuiDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    message="Hệ thống đề xuất sẽ không khả dụng trong quá trình cập nhật. Bạn có chắc chắn không ?"
                    handleConfirm={handleUpdate}
                />
            )}
        </div>
    );
};

const Banners = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const [homeBanner1, setHomeBanner1] = useState([]);
    const [homeBanner2, setHomeBanner2] = useState([]);
    const [searchBanner, setSearchBanner] = useState([]);
    const [otherBanner, setOtherBanner] = useState([]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleRemoveHome1 = (index) => {
        const newHomeBanner1 = [...homeBanner1];
        newHomeBanner1.splice(index, 1);
        setHomeBanner1(newHomeBanner1);
    };

    const handleRemoveHome2 = (index) => {
        const newHomeBanner2 = [...homeBanner2];
        newHomeBanner2.splice(index, 1);
        setHomeBanner2(newHomeBanner2);
    };

    const handleRemoveSearch = (index) => {
        const newSearchBanner = [...searchBanner];
        newSearchBanner.splice(index, 1);
        setSearchBanner(newSearchBanner);
    };

    const handleRemoveOther = (index) => {
        const newOtherBanner = [...otherBanner];
        newOtherBanner.splice(index, 1);
        setOtherBanner(newOtherBanner);
    };

    const handleChangeHome1 = (index, value) => {
        const newHomeBanner1 = [...homeBanner1];
        newHomeBanner1[index] = value;
        setHomeBanner1(newHomeBanner1);
    };

    const handleChangeHome2 = (index, value) => {
        const newHomeBanner2 = [...homeBanner2];
        newHomeBanner2[index] = value;
        setHomeBanner2(newHomeBanner2);
    };

    const handleChangeSearch = (index, value) => {
        const newSearchBanner = [...searchBanner];
        newSearchBanner[index] = value;
        setSearchBanner(newSearchBanner);
    };

    const handleChangeOther = (index, value) => {
        const newOtherBanner = [...otherBanner];
        newOtherBanner[index] = value;
        setOtherBanner(newOtherBanner);
    };

    const mapBanners = (banners) => {
        const newBanners = banners.map((banner) =>
            // If banner does not contain "http", then it is a local image
            // import it then add image path
            !banner.contains("http") ? "../../" + banner : banner
        );
        return newBanners;
    };

    const handleUpdate = () => {
        const home1 = mapBanners(homeBanner1);
        const home2 = mapBanners(homeBanner2);
        const search = mapBanners(searchBanner);
        const other = mapBanners(otherBanner);

        const banners = {
            home1,
            home2,
            search,
            other,
        };
        dispatch(setSystemBanners(banners));
    };

    return (
        <div className={classes.block}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography className={classes.title}>
                    Banner hệ thống
                </Typography>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setOpenDialog(true)}
                >
                    Cập nhật
                </Button>
            </div>
            <Grid container style={{ marginBottom: "1em" }}>
                <Box sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            style={{ padding: "0" }}
                        >
                            <Tab label="Trang chủ 1" {...a11yProps(0)} />
                            <Tab label="Trang chủ 2" {...a11yProps(1)} />
                            <Tab label="Tìm kiếm" {...a11yProps(2)} />
                            <Tab label="Khác" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid item xs={12}>
                            <div className={classes.row}>
                                <Typography className={classes.text__title}>
                                    Banner trang chủ 1
                                </Typography>
                                <Button
                                    className={classes.button__round}
                                    onClick={() =>
                                        setHomeBanner1([...homeBanner1, ""])
                                    }
                                >
                                    <AddRounded />
                                </Button>
                            </div>
                            {homeBanner1.map((banner, index) => (
                                <div
                                    className={classes.row}
                                    style={{ marginBottom: "1em" }}
                                >
                                    <Button
                                        className={classes.button__round2}
                                        onClick={() => handleRemoveHome1(index)}
                                    >
                                        <CloseRounded />
                                    </Button>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={banner}
                                        style={{
                                            marginLeft: "2em",
                                            marginRight: "3em",
                                        }}
                                        onChange={(e) =>
                                            handleChangeHome1(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Grid item xs={12}>
                            <div className={classes.row}>
                                <Typography className={classes.text__title}>
                                    Banner trang chủ 2
                                </Typography>
                                <Button
                                    className={classes.button__round}
                                    onClick={() =>
                                        setHomeBanner2([...homeBanner2, ""])
                                    }
                                >
                                    <AddRounded />
                                </Button>
                            </div>
                            {homeBanner2.map((banner, index) => (
                                <div
                                    className={classes.row}
                                    style={{ marginBottom: "1em" }}
                                >
                                    <Button
                                        className={classes.button__round2}
                                        onClick={() => handleRemoveHome2(index)}
                                    >
                                        <CloseRounded />
                                    </Button>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={banner}
                                        style={{
                                            marginLeft: "2em",
                                            marginRight: "3em",
                                        }}
                                        onChange={(e) =>
                                            handleChangeHome2(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Grid item xs={12}>
                            <div className={classes.row}>
                                <Typography className={classes.text__title}>
                                    Banner tại trang tìm kiếm
                                </Typography>
                                <Button
                                    className={classes.button__round}
                                    onClick={() =>
                                        setSearchBanner([...searchBanner, ""])
                                    }
                                >
                                    <AddRounded />
                                </Button>
                            </div>
                            {searchBanner.map((banner, index) => (
                                <div
                                    className={classes.row}
                                    style={{ marginBottom: "1em" }}
                                >
                                    <Button
                                        className={classes.button__round2}
                                        onClick={() =>
                                            handleRemoveSearch(index)
                                        }
                                    >
                                        <CloseRounded />
                                    </Button>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={banner}
                                        style={{
                                            marginLeft: "2em",
                                            marginRight: "3em",
                                        }}
                                        onChange={(e) =>
                                            handleChangeSearch(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Grid item xs={12}>
                            <div className={classes.row}>
                                <Typography className={classes.text__title}>
                                    Banner khác
                                </Typography>
                                <Button
                                    className={classes.button__round}
                                    onClick={() =>
                                        setOtherBanner([...otherBanner, ""])
                                    }
                                >
                                    <AddRounded />
                                </Button>
                            </div>
                            {searchBanner.map((banner, index) => (
                                <div
                                    className={classes.row}
                                    style={{ marginBottom: "1em" }}
                                >
                                    <Button
                                        className={classes.button__round2}
                                        onClick={() => handleRemoveOther(index)}
                                    >
                                        <CloseRounded />
                                    </Button>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={banner}
                                        style={{
                                            marginLeft: "2em",
                                            marginRight: "3em",
                                        }}
                                        onChange={(e) =>
                                            handleChangeOther(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                </Box>
            </Grid>
            {openDialog && (
                <MuiDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    message="Banner hệ thống sẽ bị thay đổi, có thể sẽ mất vài phút?"
                    handleConfirm={handleUpdate}
                />
            )}
        </div>
    );
};

const SystemSettings = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.settings.logs);

    const data = {
        server: "https://recommendation-system-server.herokuapp.com",
        lastUpdate: "2021-05-05 12:00:00",
        nextUpdate: "2021-05-06 12:00:00",
        updateTime: "12:00:00",
        totalRecords: 3203,
        updatedBy: "admin",
    };

    const dataParams = {
        hotSaleLimit: 10,
        recommendLimit: 10,
        bestSellerLimit: 10,
    };

    useEffect(() => {
        dispatch(getRecommenderLogs());
    }, [dispatch]);

    return (
        <div style={{ width: "100%" }}>
            <div className={classes.root}>
                <SystemParams data={dataParams} />
                <RecommendedSystem data={data} logs={logs} />
                <Banners />
            </div>
        </div>
    );
};

export default SystemSettings;
