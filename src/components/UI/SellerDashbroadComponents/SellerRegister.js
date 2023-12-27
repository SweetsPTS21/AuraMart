import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../layout/Card/Card";
import CardHeader from "../../layout/Card/CardHeader";
import CardBody from "../../layout/Card/CardBody";
import Button from "../../layout/CustomButtons/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import * as shopActions from "../../../store/actions/shopActions";
import * as authActions from "../../../store/actions/authActions";
import {
    aumartCardHeader,
    aumartColor,
    blackColor,
    hexToRgb,
    whiteColor,
} from "../../layout/Card/styles/material-dashboard-react.js";
import "@progress/kendo-theme-default/dist/all.css";
import DefaultAvatar from "../../../image/avatar.png";
import { styled } from "@mui/material/styles";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../utils/firebaseConfig";
import { Typography } from "@material-ui/core";

const userStyles = makeStyles(() => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
    "@global .MuiChip-root.MuiAutocomplete-tag.MuiChip-outlined.MuiChip-sizeSmall.MuiChip-deletable":
        {
            color: whiteColor,
            borderColor: "transparent",
            marginBottom: "1em",
            marginTop: "1em",
            ...aumartCardHeader,
        },
    "@global button:focus": {
        outline: "none !important",
    },
    "@global label.Mui-focused": {
        color: "#189EFF !important",
    },
    "@global .MuiRadio-colorSecondary.Mui-checked": {
        color: "#189EFF !important",
    },
    "@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus":
        {
            outline: "none !important",
        },
    "@global .MuiInput-underline:after": {
        borderBottom: "2px solid #189EFF !important",
    },
    "@global .MuiButtonBase-root.MuiIconButton-root": {
        outline: "none !important",
    },
    "@global .MuiPickersDay-daySelected": {
        backgroundColor: "#189EFF!important",
    },
    "@global .MuiCheckbox-colorSecondary.Mui-checked": {
        color: "#189EFF !important",
    },
    "@global .k-file-extension-wrapper": {
        display: "none",
    },
    "@global .k-file-name-size-wrapper": {
        display: "inline-block !important",
        minHeight: "0",
    },
    "@global .k-dropzone": {
        color: "white !important",
        background: "transparent !important",
        height: "6em",
    },
    "@global .k-button.k-upload-button": {
        textTransform: "uppercase",
        padding: "0.5em",
        color: whiteColor,
        backgroundColor: aumartColor[0],
        backgroundImage: "none",
        border: "none",
        boxShadow:
            "0 2px 2px 0 rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.14), 0 3px 1px -2px rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.2), 0 1px 5px 0 rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.12)",
    },
    "@global .k-button.k-upload-button:hover": {
        backgroundColor: aumartColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.2)",
    },
    "@global .k-button.k-upload-button&:focus": {
        backgroundColor: aumartColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(aumartColor[0]) +
            ", 0.2)",
    },
    "@global .k-widget.k-upload.k-header": {
        border: "none",
        borderRadius: "4px",
        color: "white !important",
        borderColor: "transparent",
        minHeight: "6em",
        ...aumartCardHeader,
    },
    "@global .k-upload-files.k-reset": {
        backgroundColor: "white !important",
    },
    "@global .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
        backgroundColor: "rgb(0 0 0 / 32%) !important",
    },
}));

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const SellerRegister = () => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("no-photo.jpg");

    const user = useSelector((state) => state.auth.userData);
    const shops = useSelector((state) => state.shops.shops);
    const userShop = shops.find((shop) => shop.user === user._id);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Creating shop!", 0);
        let shop = {
            name,
            description,
            phone,
            address,
            avatar,
            status: "pending",
            userId: user._id,
        };

        dispatch(await shopActions.registerANewShop(shop));
        dispatch(await authActions.logoutUser());
        window.location.href = "/";
        message.success("Shop created successfully. Please login again");

        setTimeout(msg, 1);

        setIsLoading(false);
        setAddress("");
        setPhone("");
        setDescription("");
        setName("");
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        const fileUpload = e.target.files[0];
        // check file type (only image)
        if (!fileUpload) return;
        if (
            !fileUpload.type.includes("image/jpg") &&
            !fileUpload.type.includes("image/png") &&
            !fileUpload.type.includes("image/jpeg")
        ) {
            message.error("File type must be jpg/jpeg or png");
            return;
        }

        // check file size
        if (fileUpload.size > 3 * 1024 * 1024) {
            message.error("File size cannot exceed more than 3MB");
            return;
        }

        const storageRef = ref(
            storage,
            `images/users/${user._id}/shop_avatar_${fileUpload.name}`
        );
        const msg = message.loading("Uploading image!", 0);

        try {
            const snapshot = await uploadBytes(storageRef, fileUpload);
            message.success("File uploaded successfully");

            const url = await getDownloadURL(snapshot.ref);
            setAvatar(url);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setTimeout(msg, 1);
        }
    };

    return (
        <div style={{ width: "50%", margin: "2em auto" }}>
            {userShop && userShop.status === "pending" && (
                <Typography style={{ color: "#ccc" }}>
                    {" "}
                    Đang chờ duyệt
                </Typography>
            )}
            {!userShop && (
                <Grid container>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader color="aumart">
                                <h4 className={classes.cardTitleWhite}>
                                    Đăng ký cửa hàng
                                </h4>
                                <p className={classes.cardCategoryWhite}>
                                    Đăng ký shop để trở thành người bán hàng.
                                    Tận hưởng dịch vụ tốt nhất từ Aumart
                                </p>
                            </CardHeader>
                            <CardBody style={{ display: "flex" }}>
                                <Grid container xs={12}>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            paddingRight: "1em",
                                            borderRight: "1px solid #e0e0e0",
                                        }}
                                    >
                                        <ValidatorForm onSubmit={handleSubmit}>
                                            <FormGroup>
                                                <FormControl>
                                                    <TextValidator
                                                        size="small"
                                                        label="Tên cửa hàng"
                                                        style={{ margin: 8 }}
                                                        placeholder="Nhập tên cửa hàng"
                                                        value={name}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                        variant="standard"
                                                        validators={[
                                                            "required",
                                                        ]}
                                                        errorMessages={[
                                                            "Tên cửa hàng không được để trống",
                                                        ]}
                                                    />
                                                </FormControl>

                                                <FormControl>
                                                    <TextValidator
                                                        // size="large"
                                                        multiline
                                                        rows={3}
                                                        label="Mô tả"
                                                        style={{ margin: 8 }}
                                                        placeholder="Nhập mô tả cho cửa hàng"
                                                        value={description}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                        variant="standard"
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <TextValidator
                                                        size="small"
                                                        label="Địa chỉ"
                                                        style={{ margin: 8 }}
                                                        placeholder="Địa chỉ cửa hàng"
                                                        value={address}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        variant="standard"
                                                        validators={[
                                                            "required",
                                                        ]}
                                                        errorMessages={[
                                                            "Địa chỉ không được để trống",
                                                        ]}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <TextValidator
                                                        size="small"
                                                        label="Số điện thoại"
                                                        style={{
                                                            margin: 8,
                                                            width: "45%",
                                                        }}
                                                        placeholder="Số điện thoại"
                                                        type={"text"}
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        variant="standard"
                                                        validators={[
                                                            "required",
                                                        ]}
                                                        errorMessages={[
                                                            "Số điện thoại không được để trống",
                                                        ]}
                                                    />
                                                </FormControl>
                                                <Button
                                                    color="aumart"
                                                    type={"submit"}
                                                    style={{ marginTop: "1em" }}
                                                    disabled={isLoading}
                                                >
                                                    Đăng ký
                                                </Button>
                                            </FormGroup>
                                        </ValidatorForm>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <img
                                                src={
                                                    avatar !== "no-photo.jpg"
                                                        ? avatar
                                                        : DefaultAvatar
                                                }
                                                alt={"register"}
                                                style={{
                                                    width: "160px",
                                                    height: "160px",
                                                }}
                                            />
                                            <Button
                                                component="label"
                                                variant="contained"
                                                style={{ marginTop: "1em" }}
                                                // onClick={handleChangeAvatar}
                                            >
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(e) =>
                                                        uploadImage(e)
                                                    }
                                                />
                                                Thay đổi
                                            </Button>
                                            <Typography
                                                style={{
                                                    marginTop: "1em",
                                                    width: "160px",
                                                    fontSize: "0.8em",
                                                    color: "#ccc",
                                                }}
                                            >
                                                Dụng lượng file tối đa 1 MB Định
                                                dạng:.JPEG, .PNG
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardBody>
                        </Card>
                    </Grid>
                </Grid>
            )}
            {user.role !== "user" && (
                <Typography style={{ color: "#ccc" }}>
                    {" "}
                    Bạn đã là người bán hàng
                </Typography>
            )}
        </div>
    );
};

export default SellerRegister;
