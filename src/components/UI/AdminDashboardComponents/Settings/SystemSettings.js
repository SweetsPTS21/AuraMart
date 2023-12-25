import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import MuiDialog from "../../../layout/MuiDialog";
import LoadingSpinner from "../../../layout/LoadingSpinner";
import { useEffect } from "react";
import {
    getRecommenderLogs,
    updateRecommenderSystem,
} from "../../../../store/actions/settingActions";

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
    field: {
        display: "flex",
        flexDirection: "column",
    },
    text: {
        fontWeight: "500",
        fontSize: "1em",
        marginBottom: "0.5em",
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
    loading: {},
}));

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
                <Typography>Hệ thống đề xuất</Typography>
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
                    <div>
                        <Button>Download</Button>
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

const SystemSettings = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.settings.logs);

    const data = {
        server: "https://recommendation-system-server.herokuapp.com",
        lastUpdate: "2021-05-05 12:00:00",
        nextUpdate: "2021-05-06 12:00:00",
        updateTime: "12:00:00",
        totalRecords: 1000,
        updatedBy: "admin",
    };

    useEffect(() => {
        dispatch(getRecommenderLogs());
    }, [dispatch]);

    return (
        <div style={{ width: "100%" }}>
            <div className={classes.root}>
                <div className={classes.block}>
                    <Typography>Các thông số chung</Typography>
                </div>
                <RecommendedSystem data={data} logs={logs} />
                <div className={classes.block}>
                    <Typography>Giao diện hệ thống</Typography>
                </div>
                <div className={classes.block}>
                    <Typography>Banner</Typography>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
