import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import tikiNow from "../../image/tiki-now2.png";
import tikixu from "../../image/tikixu.svg";

import navbarStyles from "../../styles/NavbarStyles";
import { Typography } from "antd";
import { IconButton, Fab } from "@material-ui/core";
import { ChatEngine } from "react-chat-engine";
import {
    NotificationsOutlined,
    ArrowBackOutlined,
    ChatBubbleOutline,
    CloseRounded,
    Dashboard,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const chatPublicKey = "0c8bb7fc-8146-4063-99f5-77c2f518da58";

const DashboardHeader = (props) => {
    const { user } = props;
    const classes = navbarStyles();
    const [openChat, setOpenChat] = useState(false);

    const handleOpenChatPopup = () => {
        setOpenChat(!openChat);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                height: "64px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 0 0 rgba(0,0,0,.1)",
                zIndex: 9999,
            }}
        >
            <Grid container style={{ display: "flex", padding: "1em" }}>
                <Grid
                    item
                    container
                    xs={10}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRight: "1px solid #ccc",
                    }}
                >
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", alignItems: "Center" }}
                    >
                        <img
                            src={tikiNow}
                            style={{ width: "32px", height: "32px" }}
                            alt={"oven"}
                        />
                        <Typography
                            style={{
                                fontSize: "1.3em",
                                fontWeight: 400,
                                textAlign: "center",
                                marginLeft: "0.5em",
                                fontFamily: "inherit",
                            }}
                        >
                            {user.role === "admin"
                                ? "Kênh quản lý"
                                : "Kênh người bán"}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "0.5em",
                            justifyContent: "flex-end",
                            marginRight: "1em",
                        }}
                    >
                        <IconButton
                            size="small"
                            style={{
                                padding: "0 0.5em",
                                borderRadius: "1.3em",
                                margin: 0,
                                "&:hover": {
                                    backgroundColor: "#BBB",
                                },
                            }}
                        >
                            <img
                                src={tikixu}
                                style={{ width: "32px", height: "32px" }}
                                alt={"oven"}
                            />
                            <Typography
                                style={{
                                    fontSize: "0.8em",
                                    textAlign: "center",
                                    marginLeft: "0.5em",
                                }}
                            >
                                {user.name}
                            </Typography>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={2}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        size="small"
                        style={{
                            padding: "0 0.5em",
                            borderRadius: "1.3em",
                            margin: 0,
                            marginLeft: "1em",
                        }}
                    >
                        <NotificationsOutlined />
                    </IconButton>

                    <Link to="/">
                        <IconButton
                            size="small"
                            style={{
                                padding: "0.2em 0.5em",
                                border: "1px solid #ccc",
                                borderRadius: "1.3em",
                                margin: 0,
                                marginLeft: "1em",
                                "&:hover": {
                                    backgroundColor: "#BBB",
                                },
                            }}
                        >
                            <ArrowBackOutlined />
                            Trang chủ
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
            <Fab
                aria-label="up"
                size={"large"}
                style={{
                    top: "90%",
                    right: "2%",
                    position: "fixed",
                    zIndex: 99999,
                    backgroundColor: "#0a68ff",
                }}
                onClick={() => handleOpenChatPopup()}
            >
                <ChatBubbleOutline fontSize="large" htmlColor="#fff" />
            </Fab>
            {openChat && (
                <div className={classes.chatPopup}>
                    <Grid container className={classes.chatPopupInner}>
                        <Grid item xs={12} className={classes.chatPopupHeader}>
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    fontFamily: "inherit",
                                }}
                            >
                                Chat
                            </Typography>
                            <IconButton onClick={() => setOpenChat(!openChat)}>
                                <CloseRounded />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} className={classes.chatPopupContent}>
                            <ChatEngine
                                publicKey={chatPublicKey}
                                userName={user.email}
                                userPassword={user._id}
                            />
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;
