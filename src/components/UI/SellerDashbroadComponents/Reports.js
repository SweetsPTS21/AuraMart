import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import chartup from "../../../image/chartup.svg";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from "@material-ui/core";
import { ErrorOutlineRounded, FolderSharedOutlined } from "@material-ui/icons";
import styled from "@material-ui/core/styles/styled";
import PropTypes from "prop-types";
import { endOfDay, format, startOfMonth } from "date-fns";
import { DownloadOutlined } from "@mui/icons-material";

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
    title: {
        fontSize: "1.2em",
        fontWeight: 400,
        lineHeight: "150%",
        margin: "0px 0px 14px 12px",
        color: "rgb(39, 39, 42)",
    },
    grid: {
        padding: "1em",
        marginTop: "0.5em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    button3: {
        margin: "0.5em",
        fontFamily: "inherit",
        backgroundColor: "#0a68ff",
        color: "#fff",
        textAlign: "center",
        gridArea: "auto",
        padding: "3px 12px",
        borderRadius: "4px",
        lineHeight: "2.5em",
        "&:hover": {
            backgroundColor: "#0a68ff",
        },
    },
    "@global .MuiButton-root": {
        textTransform: "none",
    },
    "@global .MuiTab-root": {
        textTransform: "none",
        fontSize: "1em",
    },
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
                <Box>
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

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: "0.5em",
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const CustomTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "& th": {
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
}));

const ReportForm = (props) => {
    const requests = props.requests || [];
    const [filter, setFilter] = useState("");

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", padding: "0.5em" }}>
                <div
                    style={{
                        display: "flex",
                        padding: "1em 0",
                        justifyContent: "space-between",
                    }}
                >
                    <FormControl
                        sx={{ m: 1, minWidth: 80 }}
                        size="small"
                        style={{ width: "325px" }}
                    >
                        <Select
                            variant="outlined"
                            value={filter}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"week"}>
                                Tuần này {format(Date.now(), "dd/MM/yyyy")} -{" "}
                                {format(Date.now(), "dd/MM/yyyy")}
                            </MenuItem>
                            <MenuItem value={"month"}>
                                Tháng này{" "}
                                {format(startOfMonth(Date.now()), "dd/MM/yyyy")}{" "}
                                - {format(endOfDay(Date.now()), "dd/MM/yyyy")}
                            </MenuItem>
                            <MenuItem value={"3month"}>3 tháng trước</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined">Xuất</Button>
                </div>

                <CustomTableContainer component={Paper}>
                    <Table>
                        <CustomTableHead>
                            <TableRow>
                                <CustomTableCell>Đơn hàng</CustomTableCell>
                                <CustomTableCell>
                                    Thanh toán đã chuyển vào
                                </CustomTableCell>
                                <CustomTableCell>Trạng thái</CustomTableCell>
                                <CustomTableCell>
                                    Phương thức thanh toán
                                </CustomTableCell>
                                <CustomTableCell>
                                    Số tiền thanh toán
                                </CustomTableCell>
                            </TableRow>
                        </CustomTableHead>
                        <TableBody>
                            {requests?.length > 0 &&
                                requests?.map((request) => (
                                    <>
                                        <TableRow key={request.id}>
                                            <CustomTableCell>
                                                {request.id}
                                            </CustomTableCell>
                                            <CustomTableCell
                                                style={{ maxWidth: "548px" }}
                                            >
                                                {request.name}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {request.status}
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {request.updatedAt}
                                            </CustomTableCell>
                                        </TableRow>
                                    </>
                                ))}
                            {requests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <FolderSharedOutlined
                                            style={{
                                                fontSize: "32px",
                                            }}
                                        />
                                        Không có yêu cầu nào
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CustomTableContainer>
            </div>
        </div>
    );
};

const ReportDetails = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
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
                    <Tab label="Chưa hoàn thành" {...a11yProps(0)} />
                    <Tab label="Đã hoàn thành" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ReportForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ReportForm />
            </CustomTabPanel>
        </Box>
    );
};
const Reports = () => {
    const classes = useStyles();
    const downloadReports = ["Tuần này", "Tháng này", "3 tháng trước"];

    return (
        <div style={{ width: "100%" }}>
            <div style={{ margin: "0 auto", width: "70%" }}>
                <Grid container className={classes.grid}>
                    <Grid item xs={1}>
                        <img
                            src={chartup}
                            alt="chartup"
                            style={{ height: "80px", width: "90px" }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "0 1em",
                        }}
                    >
                        <div
                            className={classes.title}
                            style={{ marginLeft: 0 }}
                        >
                            Ban đang tìm kiếm cách để tăng doanh số? Hãy thử
                            dùng Quảng cáo Aumart!
                        </div>
                        <Typography
                            style={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#666",
                            }}
                        >
                            Trung bình, Quảng cáo Aumart đang giúp những người
                            bán sử dụng quảng cáo thu về 65% về số đơn đặt hàng.
                            Bắt đầu ngay hôm nay để tăng mức độ tiếp xúc và bán
                            hàng, và giúp Shop của bạn phát triển hơn nữa!
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Button className={classes.button3}>
                            Tạo quảng cáo
                        </Button>
                    </Grid>
                </Grid>
                <div>
                    <Grid container>
                        <Grid container item xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={8}>
                                <Grid container className={classes.grid}>
                                    <Typography className={classes.title}>
                                        Tổng quan
                                    </Typography>
                                    <div
                                        style={{
                                            display: "flex",
                                            padding: "0.5em 1em",
                                            border: "1px solid #0a68ff",
                                            borderRadius: "0.5em",
                                            backgroundColor: "#e5eefb",
                                        }}
                                    >
                                        <ErrorOutlineRounded
                                            style={{ color: "#0a68ff" }}
                                        />
                                        <Typography
                                            style={{ paddingLeft: "0.5em" }}
                                        >
                                            Các số dưới đây chưa bao gồm điều
                                            chỉnh. Vui lòng tải xuống Báo cáo
                                            thu nhập để kiểm tra chi tiết các
                                            điều chỉnh liên quan.
                                        </Typography>
                                    </div>
                                    <Grid
                                        container
                                        style={{
                                            paddingTop: "1em",
                                            display: "flex",
                                        }}
                                    >
                                        <Grid
                                            item
                                            xs={4}
                                            style={{ padding: "0" }}
                                        >
                                            <Typography
                                                style={{
                                                    fontSize: "1.2em",
                                                    fontWeight: "bold",
                                                    marginBottom: "0.5em",
                                                }}
                                            >
                                                Chưa thanh toán
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontSize: "1em",
                                                }}
                                            >
                                                Tổng cộng
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontSize: "1.5em",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                0đ
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={8}
                                            style={{
                                                paddingLeft: "1em",
                                                borderLeft: "1px solid #ccc",
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    fontSize: "1.2em",
                                                    fontWeight: "bold",
                                                    marginBottom: "0.5em",
                                                }}
                                            >
                                                Đã thanh toán
                                            </Typography>
                                            <div style={{ display: "flex" }}>
                                                <Typography
                                                    style={{
                                                        fontSize: "1em",
                                                        color: "#999",
                                                        width: "50%",
                                                    }}
                                                >
                                                    Tuần này
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: "0.9em",
                                                        color: "#999",
                                                        width: "25%",
                                                    }}
                                                >
                                                    Tháng này
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: "0.9em",
                                                        color: "#999",
                                                        width: "25%",
                                                    }}
                                                >
                                                    Tổng cộng
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <Typography
                                                    style={{
                                                        fontSize: "1.5em",
                                                        fontWeight: "600",
                                                        width: "50%",
                                                    }}
                                                >
                                                    0đ
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: "0.9em",
                                                        fontWeight: "600",
                                                        width: "25%",
                                                    }}
                                                >
                                                    0đ
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        fontSize: "0.9em",
                                                        fontWeight: "600",
                                                        width: "25%",
                                                    }}
                                                >
                                                    0đ
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            width: "100%",
                                            backgroundColor: "#fafafa",
                                            padding: "0.5em 1em",
                                        }}
                                    >
                                        <Button
                                            type="text"
                                            style={{ color: "#0a68ff" }}
                                        >
                                            Số dư tài khoản
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid container className={classes.grid}>
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography className={classes.title}>
                                            Chi tiết
                                        </Typography>
                                        <FormControl size="small">
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                placeholder="Tìm kiếm đơn hàng"
                                            ></TextField>
                                        </FormControl>
                                    </div>
                                    <ReportDetails />
                                </Grid>
                            </Grid>
                            <Grid item xs={4} style={{ paddingLeft: "1em" }}>
                                <div className={classes.grid}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontSize: "1.2em",
                                                fontWeight: "bold",
                                                marginBottom: "0.5em",
                                            }}
                                        >
                                            Báo cáo thu nhập
                                        </Typography>
                                        <Button
                                            type="text"
                                            style={{
                                                color: "#0a68ff",
                                            }}
                                        >
                                            Xem thêm
                                        </Button>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {downloadReports.map((item) => (
                                            <div
                                                key={item}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    padding: "0.5em 0",
                                                    borderBottom:
                                                        "1px solid #ccc",
                                                }}
                                            >
                                                <Typography
                                                    style={{ fontSize: "1em" }}
                                                >
                                                    4th12 - 10 th12 2023
                                                </Typography>
                                                <Button
                                                    type="text"
                                                    style={{ color: "#0a68ff" }}
                                                >
                                                    <DownloadOutlined />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

ReportForm.propTypes = {
    requests: PropTypes.array,
};

export default Reports;
