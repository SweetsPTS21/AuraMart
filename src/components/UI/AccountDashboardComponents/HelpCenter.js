import React from "react";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import {
    AccountCircleOutlined,
    ArrowForwardIosRounded,
    CallRounded,
    CardGiftcardOutlined,
    InfoOutlined,
    LocalShippingOutlined,
    MailRounded,
    PersonRounded,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { LocalPoliceOutlined } from "@mui/icons-material";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "3em",
        color: "#fff",
        fontSize: "1.2em",
        textTransform: "none",
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
        textTransform: "none",
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
}));

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
                        Cách đăng ký tài khoản tại Aumart, chỉnh sửa thông tin cá
                        nhân, theo dõi đơn hàng...
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
        <div style={{ width: "100%" }}>
            <div className={classes.title}>Trung tâm hỗ trợ</div>
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
