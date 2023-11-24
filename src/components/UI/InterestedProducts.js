import React from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import IP1 from "../../image/IP1.jpg";
import IP2 from "../../image/IP2.jpg";
import IP3 from "../../image/IP3.png";
import IP4 from "../../image/IP4.png";
import IP5 from "../../image/IP5.png";
import IP6 from "../../image/IP6.png";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const userStyles = makeStyles(() => ({
    "@global .BrainhubCarousel__arrows": {
        backgroundColor: "#189EFF",
    },
    "@global .BrainhubCarousel__arrows:hover:enabled": {
        backgroundColor: "#189EFF",
    },
    image: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
        padding: "0.5em",
        width: "154px",
        height: "220px",
        marginRight: "0.2em",
        borderRadius: "5px",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.09)",
            cursor: "pointer",
        },
    },
    removeLinkStyle: {
        textDecoration: "none !important",
        color: "inherit !important",
    },
}));

const InterestedProducts = () => {
    const classes = userStyles();

    return (
        <div style={{marginTop: "1.5em"}}>
            <div
                style={{
                    fontSize: "1.1em",
                    fontWeight: 400,
                    marginBottom: "0.6em",
                }}
            >
                Tìm kiếm hàng đầu
            </div>
            <div style={{ display: "flex" }}>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP1}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Gia dụng
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP2}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Bột giặt
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP3}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Mẹ và bé
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP4}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Thực phẩm
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP5}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Điện tử
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img
                            src={IP6}
                            alt={"interested products"}
                            style={{ width: "130px" }}
                        />
                        <div
                            style={{
                                fontSize: "0.8em",
                                marginTop: "0.5em",
                                textAlign: "center",
                            }}
                        >
                            Làm đẹp
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InterestedProducts;
