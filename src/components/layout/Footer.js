import React from "react";
import footerStyle from "../../styles/FooterStyles";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

import visaIcon from "../../image/visa.svg";
import jcbIcon from "../../image/jcb.svg";
import cashIcon from "../../image/cash.svg";
import installmentIcon from "../../image/installment.svg";
import internetIcon from "../../image/internet.svg";
import mastercardIcon from "../../image/mastercard.svg";
import fbIcon from "../../image/fb.svg";
import youtubeIcon from "../../image/youtube.svg";
import appstore from "../../image/appstore.png";
import playstore from "../../image/playstore.png";
import zalo from "../../image/Logo_Zalo.png";
import { Link } from "react-router-dom";

const About = () => {
    const classes = footerStyle();
    return (
        <Grid container spacing={0} className={classes.aboutRoot}>
            <Grid
                container
                item
                xs={3}
                spacing={2}
                className={classes.mobileMode}
            >
                <Grid item xs={6} sm={12}>
                    <Typography className={classes.headers}>
                        Customer Service
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={12}>
                    <Typography
                        style={{
                            color: "#C4011A",
                            lineHeight: 1,
                            fontSize: "0.95em",
                            fontWeight: "bold",
                        }}
                    >
                        <Link to={"#"} className={classes.removeLinkStyles}>
                            Hotline Order: 1800-9999-9999
                        </Link>
                    </Typography>
                    <Typography className={classes.fontSmall}>
                        (Free,8-21h include Sat,Sun)
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={12}>
                    <Typography
                        style={{
                            color: "#C4011A",
                            lineHeight: 1,
                            fontSize: "0.95em",
                            fontWeight: "bold",
                        }}
                    >
                        <Link to={"#"} className={classes.removeLinkStyles}>
                            Customer Service: 1900-6034
                        </Link>
                    </Typography>
                    <Typography className={classes.fontSmall}>
                        (10$/min, 8-21 include Sat,Sun)
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://hotro.Aumart.vn/hc/vi"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Question&Answer
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"/https://hotro.Aumart.vn/hc/vi/requests/new"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Ask for Support
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={
                            "/https://hotro.Aumart.vn/hc/vi/categories/200126644"
                        }
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Ordering Instruction
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={
                            "https://hotro.Aumart.vn/hc/vi/categories/200123960"
                        }
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Transport Method
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://Aumart.vn/doi-tra-de-dang"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Refund Policy
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"mailto:hotro@Aumart.vn"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Customer Support:support@Aumart.vn
                    </a>
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={2}
                spacing={0}
                className={classes.mobileMode}
            >
                <Grid item xs={6} sm={12}>
                    <Typography className={classes.headers}>
                        About Aumart
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://Aumart.vn/gioi-thieu-ve-Aumart"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Aumart Introduction
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://tuyendung.Aumart.vn/"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Recruitment
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://Aumart.vn/bao-mat-thanh-toan"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Payment Security
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://Aumart.vn/bao-mat-thong-tin-ca-nhan"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Information Security
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://hotro.Aumart.vn/hc/vi/articles/201971214"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Term&Agreement
                    </a>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <a
                        href={"https://Aumart.vn/tu-van/"}
                        target="_blank"
                        className={classes.removeLinkStyles}
                        rel="noreferrer"
                    >
                        Aumart Advice
                    </a>
                </Grid>
                <Grid item xs={6} sm={12}></Grid>
                <Grid item xs={6} sm={12}></Grid>
                <Grid item xs={6} sm={12}></Grid>
                <Grid item xs={6} sm={12}></Grid>
                <Grid item xs={6} sm={12}></Grid>
            </Grid>
            <Grid
                container
                item
                xs={2}
                spacing={0}
                className={classes.mobileMode}
            >
                <Grid item xs={6} sm={12}>
                    <Typography className={classes.headers}>
                        Associate and Connect
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <Link to={"#"} className={classes.removeLinkStyles}>
                        Work Regulation
                    </Link>
                </Grid>
                <Grid item xs={6} sm={12} className={classes.fontSmall}>
                    <Link to={"#"} className={classes.removeLinkStyles}>
                        Sell with Aumart
                    </Link>
                </Grid>
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
                <Grid item xs={6} sm={12} />
            </Grid>
            <Grid
                container
                item
                xs={3}
                spacing={0}
                style={{ paddingLeft: "1em" }}
            >
                <Typography className={classes.headers} component={"span"}>
                    Payment Method
                    <Grid style={{ paddingTop: "1.3em", lineHeight: 1 }}>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="visa"
                                    className={classes.icon}
                                    src={visaIcon}
                                />
                            </Link>
                        </Icon>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="master"
                                    className={classes.icon}
                                    src={mastercardIcon}
                                />
                            </Link>
                        </Icon>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="jcb"
                                    className={classes.icon}
                                    src={jcbIcon}
                                />
                            </Link>
                        </Icon>
                    </Grid>
                    <Grid>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="cash"
                                    className={classes.icon}
                                    src={cashIcon}
                                />
                            </Link>
                        </Icon>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="internet"
                                    className={classes.icon}
                                    src={internetIcon}
                                />
                            </Link>
                        </Icon>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="installment"
                                    className={classes.icon}
                                    src={installmentIcon}
                                />
                            </Link>
                        </Icon>
                    </Grid>
                </Typography>
            </Grid>
            <Grid container item xs={2} spacing={0}>
                <Typography className={classes.headers} component={"span"}>
                    Connect with Us
                    <Grid style={{ paddingTop: "1.2em", lineHeight: 1 }}>
                        <Link to="https://www.facebook.com/praise.oketola">
                            <Icon className={classes.iconRoot}>
                                <img
                                    alt="fb"
                                    className={classes.icon}
                                    src={fbIcon}
                                />
                            </Icon>
                        </Link>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="yt"
                                    className={classes.icon}
                                    src={youtubeIcon}
                                />
                            </Link>
                        </Icon>
                        <Icon className={classes.iconRoot}>
                            <Link to={"#"} className={classes.removeLinkStyles}>
                                <img
                                    alt="zalo"
                                    className={classes.icon}
                                    src={zalo}
                                    style={{ width: 32, height: 32 }}
                                />
                            </Link>
                        </Icon>
                    </Grid>
                    <Grid>
                        <Typography component={"span"}>
                            <p className={classes.headers}>
                                {" "}
                                Install App On Your Mobile
                            </p>

                            <Grid>
                                <div>
                                    <Link
                                        to={"#"}
                                        className={classes.removeLinkStyles}
                                    >
                                        <img
                                            alt="appstore"
                                            className={classes.apprefer}
                                            src={appstore}
                                            style={{ width: "134px" }}
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to={"#"}
                                        className={classes.removeLinkStyles}
                                    >
                                        <img
                                            alt="playstore"
                                            className={classes.apprefer}
                                            src={playstore}
                                            style={{ width: "134px" }}
                                        />
                                    </Link>
                                </div>
                            </Grid>
                        </Typography>
                    </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
};

const Lisence = () => {
    const classes = footerStyle();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
            }}
        >
            <Typography className={classes.lisence}>
                Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8,
                phường 12, quận 10, Thành phố Hồ Chí Minh
            </Typography>
            <Typography className={classes.lisence}>
                Aumart nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ
                mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý
                đơn hàng
            </Typography>
            <Typography className={classes.lisence}>
                Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch
                và Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và
                sửa đổi lần thứ 23 ngày 14/02/2022
            </Typography>
            <Typography className={classes.lisence}>
                © 2022 - Bản quyền của Công ty TNHH Ti Ki
            </Typography>
        </div>
    );
};

const About2 = () => {
    const classes = footerStyle();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
            }}
        >
            <Typography
                className={classes.lisenceTitle}
                style={{ color: "rgb(56, 56, 61)" }}
            >
                Aumart - Thật nhanh, thật chất lượng, thật rẻ
            </Typography>
            <Typography className={classes.lisenceTitle}>
                Aumart có tất cả
            </Typography>

            <Typography className={classes.lisence}>
                Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín,
                hàng nghìn loại mặt hàng từ Điện thoại smartphone tới Rau củ quả
                tươi, kèm theo dịch vụ giao hàng siêu tốc AumartNOW, Aumart mang đến
                cho bạn một trải nghiệm mua sắm online bắt đầu bằng chữ tín.
                Thêm vào đó, ở Aumart bạn có thể dễ dàng sử dụng vô vàn các tiện
                ích khác như mua thẻ cào, thanh toán hoá đơn điện nước, các dịch
                vụ bảo hiểm.
            </Typography>
            <Typography className={classes.lisenceTitle}>
                Khuyến mãi, ưu đãi tràn ngập
            </Typography>
            <Typography className={classes.lisence}>
                Bạn muốn săn giá sốc, Aumart có giá sốc mỗi ngày cho bạn! Bạn là
                tín đồ của các thương hiệu, các cửa hàng Official chính hãng
                đang chờ đón bạn. Không cần săn mã freeship, vì Aumart đã có hàng
                triệu sản phẩm trong chương trình Freeship+, không giới hạn lượt
                đặt, tiết kiệm thời gian vàng bạc của bạn. Mua thêm gói AumartNOW
                tiết kiệm để nhận 100% free ship 2h & trong ngày, hoặc mua gói
                AumartNOW cao cấp để nhận được 100% freeship, áp dụng cho 100% sản
                phẩm, 100% tỉnh thành Việt Nam. Bạn muốn tiết kiệm hơn nữa? Đã
                có AumartCARD, thẻ tín dụng Aumart hoàn tiền 15% trên mọi giao dịch
                (tối đa hoàn 600k/tháng)
            </Typography>
        </div>
    );
};

function Footer() {
    const classes = footerStyle();

    return (
        <div
            className={classes.root}
            style={{ margin: "0 0%", background: "white" }}
        >
            <div className={classes.about} style={{ padding: "1em" }}>
                <About />
            </div>
            <div className={classes.about} style={{ padding: "1em" }}>
                <Lisence />
            </div>
            <div className={classes.about} style={{ padding: "1em" }}>
                <About2 />
            </div>
        </div>
    );
}

export default Footer;
