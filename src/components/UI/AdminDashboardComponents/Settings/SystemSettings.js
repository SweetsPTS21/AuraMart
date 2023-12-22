import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
        marginBottom: "0.5em",
    },
}));

const RecommendedSystem = (props) => {
    const { data, logs } = props;
    const classes = useStyles();

    return (
        <div className={classes.block}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography>Hệ thống đề xuất</Typography>
                <Button>Cập nhật</Button>
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
                        }}
                    >
                        <Typography>{logs}</Typography>
                    </div>
                    <div>
                        <Button>Download</Button>
                        <Button>Clear</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const SystemSettings = () => {
    const classes = useStyles();
    const data = {
        server: "https://recommendation-system-server.herokuapp.com",
        lastUpdate: "2021-05-05 12:00:00",
        nextUpdate: "2021-05-06 12:00:00",
        updateTime: "12:00:00",
        totalRecords: 1000,
        updatedBy: "admin",
    };

    const logs = "This is logs";

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
