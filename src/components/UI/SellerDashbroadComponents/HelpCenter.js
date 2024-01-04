import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    Link,
    Paper,
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
import {
    AccountCircleOutlined,
    ArrowForwardIosRounded,
    CallRounded,
    CardGiftcardOutlined,
    Delete,
    Edit,
    FolderSharedOutlined,
    InfoOutlined,
    LocalShippingOutlined,
    MailRounded,
    PersonRounded,
    SearchRounded,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { LocalPoliceOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "3em",
        color: "#fff",
        fontSize: "1.2em",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },
        margin: 0,
        marginLeft: "1em",
        marginRight: "0.5em",
        marginTop: "2em",
        marginBottom: "1em",
    },
    button2: {
        margin: "0.5em 0",
        fontFamily: "inherit",
        backgroundColor: "#0a68ff",
        color: "#fff",
        textAlign: "center",
        gridArea: "auto",
        padding: "3px 12px",
        borderRadius: "4px",
        lineHeight: "18px",
        "&:hover": {
            backgroundColor: "#0a68ff",
        },
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
    input: {
        height: "1em !important",
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
    grid2: {
        padding: "2em",
        marginTop: "0.6em",
        marginBottom: "0.5em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    block: {
        padding: "0.5em",
        fontSize: "1.1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.5em",
        backgroundColor: "#f5f5fa",
    },
    block__title: {
        color: "#808089",
        fontSize: "14px",
        lineHeight: "21px",
        gridArea: "auto",
        fontWeight: 600,
        margin: "0.5em 0",
    },
    link: {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        lineHeight: "150%",
        fontWeight: 500,
        color: "#0a68ff",
        cursor: "pointer",
        webkitBoxAlign: "center",
        textDecoration: "none !important",
    },
    removeLinkStyles: {
        textDecoration: "none !important",
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded":
        {
            top: "45% !important",
            left: "70% !important",
        },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)",
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

const SellerForm = () => {
    const classes = userStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" className={classes.title}>
                Công cụ hỗ trợ người bán
            </Typography>
            <Typography
                variant="body1"
                style={{
                    color: "rgb(128, 128, 137)",
                    fontSize: "14px",
                    lineHeight: "150%",
                    fontWeight: 400,
                    marginBottom: "1em",
                    marginLeft: "1em",
                }}
            >
                Bạn đang cần hỗ trợ? Sử dụng công cụ này để gửi yêu cầu đến
                Aumart nhé. Chúng tôi sẽ hỗ trợ bạn trong thời gian sớm nhất có
                thể.
            </Typography>
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
                        <Tab label="Vận chuyển" {...a11yProps(0)} />
                        <Tab label="Tài khoản và gian lận" {...a11yProps(1)} />
                        <Tab label="Sản phẩm" {...a11yProps(2)} />
                        <Tab label="Vận hành" {...a11yProps(3)} />
                        <Tab label="Hủy gói Freeship Xtra" {...a11yProps(4)} />
                        <Tab label="Trả hàng/hoàn tiền" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Khiếu nại cập nhật sai trạng thái lấy hàng
                        </Button>
                        <Button className={classes.button3}>
                            Yêu cầu vận chuyển đến lấy hàng{" "}
                        </Button>
                        <Button className={classes.button3}>
                            Khiếu nại về đơn hàng giao không thành công
                        </Button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Khiếu nại về thông tin tài khoản
                        </Button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Khiếu nại về hành vi xâm phạm quyền sở hữu trí tuệ
                        </Button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Hỗ trợ các vấn đề quảng cáo
                        </Button>
                        <Button className={classes.button3}>
                            Yêu cầu xem xét vé phạt
                        </Button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Trả hàng/hoàn tiền
                        </Button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Button className={classes.button3}>
                            Portal freeship extra
                        </Button>
                        <Button className={classes.button3}>
                            Portal freeship extra plus
                        </Button>
                        <Button className={classes.button3}>
                            Portal voucher freeship extra
                        </Button>
                    </div>
                </CustomTabPanel>
            </Box>
        </div>
    );
};

const RequestForm = (props) => {
    const requests = props.requests || [];
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", padding: "0.5em" }}>
                <div
                    style={{
                        display: "flex",
                        padding: "1em 0",
                    }}
                >
                    <Typography
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1em",
                            border: "1px solid #ccc",
                            padding: "0.5em",
                            borderRight: "none",
                            borderRadius: "4px 0 0 4px",
                        }}
                    >
                        Mã ID yêu cầu
                    </Typography>
                    <TextField
                        id="standard-basic"
                        size="small"
                        placeholder="Nhập mã ID yêu cầu"
                        style={{
                            width: "300px",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1em",
                            border: "1px solid #ccc",
                            borderRight: "none",
                            padding: "0.5em",
                        }}
                        fullWidth
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            padding: "4px",
                            borderLeft: "none",
                            borderRadius: "0 4px 4px 0",
                        }}
                    >
                        <SearchRounded style={{ fontSize: "26px" }} />
                    </div>
                </div>

                <CustomTableContainer component={Paper}>
                    <Table>
                        <CustomTableHead>
                            <TableRow>
                                <CustomTableCell>ID yêu cầu</CustomTableCell>
                                <CustomTableCell>Tên yêu cầu</CustomTableCell>
                                <CustomTableCell>Trạng thái</CustomTableCell>
                                <CustomTableCell>Mã đơn hàng</CustomTableCell>
                                <CustomTableCell>
                                    Cập nhật gần nhất
                                </CustomTableCell>
                                <CustomTableCell>Hoạt động</CustomTableCell>
                            </TableRow>
                        </CustomTableHead>
                        <TableBody>
                            {requests &&
                                requests.length > 0 &&
                                requests.map((request) => (
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
                                            <CustomTableCell
                                                style={{ width: "152px" }}
                                            >
                                                <IconButton
                                                    // onClick={() =>
                                                    //     handleOpenDialog(
                                                    //         1,
                                                    //         order
                                                    //     )
                                                    // }
                                                    color="primary"
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    // onClick={() =>
                                                    //     setOpenDialog(true)
                                                    // }
                                                    color="error"
                                                >
                                                    <Delete />
                                                </IconButton>
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

const SellerRequest = () => {
    const classes = userStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography variant="body1" className={classes.title}>
                Yêu cầu của tôi
            </Typography>
            <Typography
                variant="body1"
                style={{
                    color: "rgb(128, 128, 137)",
                    fontSize: "14px",
                    lineHeight: "150%",
                    fontWeight: 400,
                    marginBottom: "1em",
                    marginLeft: "1em",
                }}
            >
                Quản lý và theo dõi tất cả các yêu cầu/ hỗ trợ từ Người Bán liên
                hệ đến Aumart. Bạn có thể xem chi tiết của từng yêu cầu, bao gồm
                lịch sử trò chuyện của bạn với Nhân Viên Chăm Sóc Khách Hàng của
                Aumart.
            </Typography>
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
                        <Tab label="Đang xử lý" {...a11yProps(0)} />
                        <Tab label="Đóng" {...a11yProps(1)} />
                        <Tab label="Tất cả" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <RequestForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <RequestForm />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <RequestForm />
                </CustomTabPanel>
            </Box>
        </>
    );
};

const Question = () => {
    const classes = userStyles();

    return (
        <>
            <Typography
                variant="body1"
                style={{
                    margin: "1em 0",
                    color: "rgb(39, 39, 42)",
                    fontSize: "1em",
                    fontWeight: "600",
                    lineHeight: "150%",
                }}
            >
                Tra cứu câu hỏi theo chủ đề
            </Typography>
            <Grid
                container
                item
                xs={12}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "40px 100px",
                }}
            >
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <ShoppingCartOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Đơn hàng và thanh toán
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Cách tra cứu đơn hàng, sử dụng mã giảm giá và các phương
                        thức thanh toán...
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <AccountCircleOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Tài khoản của tôi
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Cách đăng ký tài khoản tại Aumart, chỉnh sửa thông tin
                        cá nhân, theo dõi đơn hàng...
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <LocalShippingOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Đơn hàng và vận chuyển
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Chính sách đổi trả, cách kích hoạt bảo hành, hướng dẫn
                        đổi trả online ...
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <LocalPoliceOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Đổi trả, bảo hành và hồi hoàn
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Chính sách đổi trả, cách kích hoạt bảo hành, hướng dẫn
                        đổi trả online ...
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <CardGiftcardOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Dịch vụ và chương trình
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Chính sách của các dịch vụ và chương trình dành cho
                        khách hàng Aumart
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "8px",
                    }}
                >
                    <InfoOutlined style={{ fontSize: "2em" }} />
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(39, 39, 42)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "600",
                        }}
                    >
                        Thông tin về Aumart
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            color: "rgb(128, 128, 137)",
                            fontSize: "14px",
                            lineHeight: "150%",
                            fontWeight: "400",
                        }}
                    >
                        Quy chế hoạt động và chính sách của sàn thương mại điện
                        tử Aumart
                    </Typography>
                    <Link to="#">
                        <Typography variant="body1" className={classes.link}>
                            Tìm hiểu thêm{" "}
                            <ArrowForwardIosRounded
                                style={{
                                    fontSize: "16px",
                                    marginLeft: "8px",
                                }}
                            />
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

const Contact = () => {
    const classes = userStyles();

    return (
        <>
            <div className={classes.title}>Câu hỏi thường gặp</div>
            <Grid container item xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={4} style={{ padding: "0.5em" }}>
                    <div className={classes.block}>
                        <CallRounded
                            style={{
                                margin: "0.5em 0",
                                fontSize: "2em",
                                color: "#0a68ff",
                            }}
                        />
                        <Typography className={classes.block__title}>
                            Hotline
                        </Typography>

                        <Typography
                            variant="body1"
                            style={{
                                margin: "0.5em 0",
                                fontWeight: 600,
                                color: "#0a68ff",
                                fontSize: "20px",
                                lineHeight: "27px",
                            }}
                        >
                            1900 1234
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                margin: "0.5em 0",
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: "150%",
                                color: "rgb(128, 128, 137)",
                            }}
                        >
                            1000 đ/p, 8h-21h cả thứ 7, CN
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={4} style={{ padding: "0.5em" }}>
                    <div className={classes.block}>
                        <PersonRounded
                            style={{
                                margin: "0.5em 0",
                                fontSize: "2em",
                                color: "#0a68ff",
                            }}
                        />
                        <Typography className={classes.block__title}>
                            Trợ lý cá nhân
                        </Typography>

                        <Button className={classes.button2}>Chat ngay</Button>
                        <Typography
                            variant="body1"
                            style={{
                                margin: "0.5em 0",
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: "150%",
                                color: "rgb(128, 128, 137)",
                            }}
                        >
                            8h-21h cả Thứ 7, CN
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={4} style={{ padding: "0.5em" }}>
                    <div className={classes.block}>
                        <MailRounded
                            style={{
                                margin: "0.5em 0",
                                fontSize: "2em",
                                color: "#0a68ff",
                            }}
                        />
                        <Typography className={classes.block__title}>
                            Gửi yêu cầu hỗ trợ
                        </Typography>

                        <Button className={classes.button2}>Gửi yêu cầu</Button>
                        <Typography
                            variant="body1"
                            style={{
                                margin: "0.5em 0",
                                fontSize: 12,
                                fontWeight: 400,
                                lineHeight: "150%",
                                color: "rgb(128, 128, 137)",
                            }}
                        >
                            Chúng tôi sẽ trả lời bạn trong 24h
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

const HelpCenter = () => {
    const classes = userStyles();

    return (
        <div style={{ width: "70%", margin: "0 auto" }}>
            <div className={classes.title}>Trung tâm hỗ trợ</div>
            <div className={classes.grid}>
                <Grid container>
                    <SellerForm />
                </Grid>
            </div>
            <div className={classes.grid}>
                <Grid container>
                    <SellerRequest />
                </Grid>
            </div>
            <div className={classes.grid}>
                <Grid container>
                    <Contact />
                    <Question />
                </Grid>
            </div>
        </div>
    );
};

export default HelpCenter;
