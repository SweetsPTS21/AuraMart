import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { Facebook, GitHub } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { message } from "antd";
import { Grid, IconButton, Typography } from "@material-ui/core";

const userStyles = makeStyles(() => ({
    groupButton: {
        display: "flex !important",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    button: {
        marginTop: "15px",
    },
}));

const Login = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const [email, setEmailState] = useState("");
    const [password, setPasswordState] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailInputChange = (e) => {
        setEmailState(e.target.value);
    };

    const handlePasswordInputChange = (e) => {
        setPasswordState(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const msg = message.loading("Logging in user!", 0);

        const text = { email, password };

        await dispatch(
            authActions.loginUser(text, props.history, props.closeModal)
        );
        setTimeout(msg, 1);
        setLoading(false);
    };

    // form login in checkout page
    const form1 = (
        <div style={{ width: "100%", borderRadius: "4px" }}>
            <FormGroup
                onSubmit={handleSubmit}
                fullWidth="true"
                onKeyPress={(e) => {
                    e.charCode === 13 && handleSubmit(e); // if enter key is pressed redirect to product category and search
                }}
            >
                <FormControl margin="normal">
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        name="email"
                        onChange={handleEmailInputChange}
                    />
                    {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input
                        id="my-input2"
                        type="password"
                        aria-describedby="my-helper-text"
                        name="password"
                        onChange={handlePasswordInputChange}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    size={"small"}
                    style={{
                        backgroundColor: "#ff424e",
                        height: "3em",
                        color: "#fff",
                        fontSize: "1.2em",
                        textTransform: "none",
                    }}
                    className={classes.button}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Login
                </Button>
            </FormGroup>
        </div>
    );

    // form login in main page
    const form2 = (
        <Grid
            container
            style={{
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <Grid item xs={12}>
                <FormGroup onSubmit={handleSubmit}>
                    <FormControl margin="normal">
                        <InputLabel htmlFor="my-input">
                            Email address
                        </InputLabel>
                        <Input
                            id="my-input"
                            aria-describedby="my-helper-text"
                            name="email"
                            onChange={handleEmailInputChange}
                        />
                        {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    <FormControl margin="normal">
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input
                            id="my-input2"
                            type="password"
                            aria-describedby="my-helper-text"
                            name="password"
                            onChange={handlePasswordInputChange}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        size={"small"}
                        style={{
                            backgroundColor: "#ff424e",
                            height: "3em",
                            color: "#fff",
                            fontSize: "1.2em",
                            textTransform: "none",
                        }}
                        className={classes.button}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Đăng nhập
                    </Button>
                </FormGroup>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                }}
            >
                <Typography
                    variant="body2"
                    style={{
                        textAlign: "center",
                        fontSize: "1.2em",
                        color: "#bbb",
                    }}
                >
                    Hoặc tiếp tục bằng
                </Typography>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "1em 0",
                    }}
                >
                    <IconButton
                        style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#3b5998",
                            margin: "0 0.5em",
                            color: "#fff",
                            boxShadow: "0 0 5px #bbb",
                        }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#fff",
                            margin: "0 0.5em",
                            boxShadow: "0 0 5px #bbb",
                        }}
                    >
                        <GitHub />
                    </IconButton>
                </div>
                <Typography
                    variant="body2"
                    style={{
                        textAlign: "left",
                        fontSize: "0.7em",
                        color: "#bbb",
                    }}
                >
                    Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử dụng và Chính sách bảo mật thông tin cá nhân của Aumart
                </Typography>
            </Grid>
        </Grid>
    );

    const handleForm = (type) => {
        switch (type) {
            case "default ":
                return form2;
            case "checkout":
                return form1;
            default:
                return form2;
        }
    };
    return <>{handleForm(props.type)}</>;
};

export default Login;
