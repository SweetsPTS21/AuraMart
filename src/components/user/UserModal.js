// this is displayed whenever the user click to the login, signup button
// import for modal
import React, { useEffect, useState } from "react";
import {
    MuiThemeProvider,
    createTheme,
    makeStyles,
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import for modal formcontrol
import Login from "../user/Login";
import SignUp from "../user/SignUp";
// import for modal tab
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import loginImage from "../../image/login.png";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as reviewActions from "../../store/actions/reviewActions";
import { useDispatch } from "react-redux";
import { message } from "antd";
import * as productActions from "../../store/actions/productActions";
import { TextField } from "@material-ui/core";

// style for both modal and tabs
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        marginTop: "5%",
        justifyContent: "center",
        zIndex: "100 !important",
    },
    paper: {
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "1em",
        boxShadow: theme.shadows[5],
        maxWidth: "800px",
        width: "800px",
        height: "530px",
    },
    destab: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        position: "auto",
    },
    container: {
        height: "100%",
    },
    tabSection: {
        position: "relative",
        flexGrow: 1,
        height: "100%",
    },
    descriptionSection: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    formStyle: {
        // padding: "0 2em",
    },
    formStyle2: {
        padding: 0,
    },
    textDescription: {
        textAlign: "justify",
    },
    button: {
        height: "2.5em",
        textTransform: "none",
        margin: 0,
        marginLeft: "1em",
        marginTop: "1em",
        marginBottom: "1em",
        padding: "0 1em",
        "&:focus": {
            outline: "none",
        },
    },
    buttonStyle: {
        backgroundColor: "#ff424e",
        height: "2.5em",
        color: "#fff",
        fontSize: "1em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },
        margin: 0,
        marginLeft: "1em",
        marginTop: "1em",
        marginBottom: "1em",
        padding: "0 1em",
    },
    "@global .MuiRating-label ": {
        display: "block !important",
        color: "inherit",
        fontSize: "inherit",
    },
}));

const tabTheme = createTheme({
    overrides: {
        MuiTab: {
            root: {
                flexGrow: 1,
            },
        },
    },
});

// tabs inside the modal
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ height: "calc(100% - 48px)" }}
        >
            {value === index && (
                <Box p={5} style={{ height: "100%" }}>
                    {children}
                </Box>
            )}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ModalTabSection = (props) => {
    const classes = useStyles();
    const piority = parseInt(props.piority, 10);

    const [value, setValue] = React.useState(piority);

    useEffect(() => {
        setValue(piority);
    }, [piority]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container className={classes.container}>
            <div className={classes.destab}>
                <Grid
                    item
                    xs={7}
                    style={{ backgroundColor: "#fff", borderRadius: "1em" }}
                >
                    <div className={classes.tabSection}>
                        <MuiThemeProvider theme={tabTheme}>
                            <AppBar
                                position="static"
                                style={{
                                    backgroundColor: "#0180ce",
                                    borderTopLeftRadius: "1em",
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="wrapped label tabs example"
                                >
                                    <Tab
                                        value={0}
                                        className={classes.tab}
                                        label="Log in"
                                        {...a11yProps("zero")}
                                    />
                                    <Tab
                                        value={1}
                                        className={classes.Tab}
                                        label="Sign Up"
                                        wrapped
                                        {...a11yProps("one")}
                                    />
                                </Tabs>
                            </AppBar>
                            <TabPanel
                                value={value}
                                index={0}
                                className={classes.formStyle}
                            >
                                <Login {...props} type="default" />
                            </TabPanel>
                            <TabPanel
                                value={value}
                                index={1}
                                className={classes.formStyle2}
                            >
                                <SignUp {...props} />
                            </TabPanel>
                        </MuiThemeProvider>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={5}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderTopRightRadius: "1em",
                        borderBottomRightRadius: "1em",
                        background:
                            "linear-gradient(to bottom, #dbeeff, #ebf5ff)",
                    }}
                >
                    <Grid container alignItems="center">
                        <div className={classes.descriptionSection}>
                            <img
                                src={loginImage}
                                alt="aumart-graphic-map"
                                style={{ height: "200px", width: "200px" }}
                            />

                            <Typography
                                style={{
                                    width: "200px",
                                    textAlign: "center",
                                    marginTop: "1.5em",
                                    fontSize: "1.2em",
                                    color: "#019eff",
                                }}
                            >
                                Mua sắm tại Aumart - Mua hàng online giá tốt,
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
};

const ModalComment = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const [text, setText] = useState("");
    const labels = {
        0.5: "Rất không hài lòng",
        1: "Rất không hài lòng",
        1.5: "Không hài lòng",
        2: "Không hài lòng",
        2.5: "Sản phẩm ổn",
        3: "Sản phẩm tốt",
        3.5: "Sản phẩm tốt",
        4: "Rất tốt",
        4.5: "Rất tốt",
        5: "Tuyệt vời",
    };
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleChangeText = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating review!", 0);
        let review = { title, text, rating };
        await dispatch(reviewActions.addNewReview(review, props.productId));
        await dispatch(productActions.getProductById(props.productId));
        props.onClose();
        setTimeout(msg, 1);
        setIsLoading(false);
    };
    const handleDiscard = () => {
        props.onClose();
    };

    return (
        <Grid
            item
            xl={12}
            md={12}
            sm={12}
            xs={12}
            style={{
                padding: "10%",
                minWidth: "520px",
                height: "100%",
                position: "relative",
            }}
        >
            <Typography variant="h5" style={{ marginBottom: "1em" }}>
                Đánh giá sản phẩm
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl fullWidth={true}>
                        <TextValidator
                            size="small"
                            label="Tiêu đề"
                            placeholder="Bạn nghĩ gì về sản phẩm này?"
                            value={title}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChangeTitle}
                            variant="standard"
                            validators={["required"]}
                            errorMessages={["Enter your comment title"]}
                            fullWidth
                        />
                    </FormControl>
                    <InputLabel
                        htmlFor="my-input2"
                        style={{ marginTop: "1em", fontSize: "0.8em" }}
                    >
                        Đánh giá
                    </InputLabel>

                    <FormControl>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1em",
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                size={"large"}
                                style={{ display: "inline-flex" }}
                                value={rating}
                                precision={0.5}
                                onChange={(e, newValue) => {
                                    newValue > 0.5 && setRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            <Box ml={2}>
                                {labels[hover !== -1 ? hover : rating]}
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField
                            minRows={4}
                            placeholder="Thêm đánh giá của bạn về sản phẩm này"
                            multiline
                            onChange={handleChangeText}
                            value={text}
                            required
                            variant="filled"
                            style={{ borderColor: "#303F9F" }}
                        />
                    </FormControl>
                    <div
                        style={{
                            height: "64px",
                            display: "flex",
                            position: "absolute",
                            bottom: "5%",
                            right: "5%",
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={handleDiscard}
                            className={classes.button}
                        >
                            Hủy
                        </Button>
                        <Button
                            type={"submit"}
                            color="secondary"
                            disabled={isLoading}
                            className={classes.buttonStyle}
                        >
                            Hoàn thành
                        </Button>
                    </div>
                </FormGroup>
            </ValidatorForm>
        </Grid>
    );
};

const handleModalType = (props, classes) => {
    switch (props.type) {
        case "authModal":
            return (
                <div className={classes.paper}>{ModalTabSection(props)}</div>
            );
        case "commentModal":
            return <div className={classes.paper}>{ModalComment(props)}</div>;
        default:
            return (
                <div className={classes.paper}>{ModalTabSection(props)}</div>
            );
    }
};

// transition modal
const TransitionsModal = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>{handleModalType(props, classes)}</Fade>
            </Modal>
        </div>
    );
};

export default TransitionsModal;
