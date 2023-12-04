import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Button from "../CustomButtons/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { message } from "antd";
import * as orderActions from "../../../../store/actions/orderActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {
    blackColor,
    hexToRgb,
    tikiCardHeader,
    tikiColor,
    whiteColor,
} from "../Card/styles/material-dashboard-react.js";
import TextField from "@material-ui/core/TextField";
import "@progress/kendo-theme-default/dist/all.css";

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
            ...tikiCardHeader,
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
        backgroundColor: tikiColor[0],
        backgroundImage: "none",
        border: "none",
        boxShadow:
            "0 2px 2px 0 rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.14), 0 3px 1px -2px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2), 0 1px 5px 0 rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.12)",
    },
    "@global .k-button.k-upload-button:hover": {
        backgroundColor: tikiColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2)",
    },
    "@global .k-button.k-upload-button&:focus": {
        backgroundColor: tikiColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2)",
    },
    "@global .k-widget.k-upload.k-header": {
        border: "none",
        borderRadius: "4px",
        color: "white !important",
        borderColor: "transparent",
        minHeight: "6em",
        ...tikiCardHeader,
    },
    "@global .k-upload-files.k-reset": {
        backgroundColor: "white !important",
    },
    "@global .MuiDialog-paperWidthSm.css-1t1j96h-MuiPaper-root-MuiDialog-paper":
        {
            maxWidth: "600px !important",
        },
    "@global .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
        backgroundColor: "rgb(0 0 0 / 32%) !important",
    },
}));

const UpdateOrderForm = ({ order, setShowUpdateForm, style }) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const [currentState, setCurrentState] = useState(order.currentState);
    const [quantity, setQuantity] = useState(order.quantity);
    const [phone, setPhone] = useState(order.phone);
    const [address, setAddress] = useState(order.address);
    const [total, setTotal] = useState(order.total);

    const productCost = order.total / order.quantity;

    const [isLoading, setIsLoading] = useState(false);

    const currentStateOptions = [
        "Ordered Successfully",
        "Tiki Received",
        "Getting Product",
        "Packing",
        "Shipping",
        "Delivered",
    ];

    useEffect(() => {
        ValidatorForm.addValidationRule(
            "isCategoryEmpty",
            () => currentState !== null
        );
    }, [currentState]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating order!", 0);
        let order_ = {
            currentState,
            quantity,
            phone,
            address,
            total,
        };

        dispatch(await orderActions.updateOrderById(order_, order._id));

        setTimeout(msg, 1);

        setIsLoading(false);
        setAddress("");
        setPhone("");
        setCurrentState([]);
        setTotal("");
        setShowUpdateForm((val) => !val);
    };

    return (
        <div style={style}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} style={{ margin: "0 auto", width: "420px" }}>
                    <Card>
                        <CardHeader color="tiki">
                            <h4 className={classes.cardTitleWhite}>
                                Update An Order
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                From {order.user.name}
                            </p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl>
                                        <Autocomplete
                                            // multiple
                                            style={{ width: "100%" }}
                                            id="size-small-outlined-multi"
                                            size="small"
                                            onChange={(e, value) => {
                                                setCurrentState(value);
                                            }}
                                            defaultValue={currentState}
                                            options={currentStateOptions}
                                            getOptionLabel={(option) => option}
                                            renderOption={(option) => (
                                                <p
                                                    style={{
                                                        padding: "0.1em",
                                                        margin: "0",
                                                        width: "300",
                                                        height: "100% !important",
                                                        color: "#000",
                                                        overflowX: "hidden",
                                                    }}
                                                >
                                                    {option}
                                                </p>
                                            )}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        size={"large"}
                                                        label={option}
                                                        {...getTagProps({
                                                            index,
                                                        })}
                                                    />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    label="Product category"
                                                    style={{
                                                        margin: 8,
                                                        paddingRight: "1em",
                                                    }}
                                                    placeholder="Enter product's currentState"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    validators={[
                                                        "isCategoryEmpty",
                                                    ]}
                                                    errorMessages={[
                                                        "Enter product's currentState",
                                                    ]}
                                                />
                                            )}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Address"
                                            style={{ margin: 8 }}
                                            placeholder="Enter shop's address"
                                            value={address}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={[
                                                "Enter Your shop's address",
                                            ]}
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginTop: "1.5em",
                                        }}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Quantity"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="Enter order's Quantity"
                                            value={quantity}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                                setTotal(
                                                    e.target.value * productCost
                                                );
                                            }}
                                            variant="standard"
                                            validators={[
                                                "required",
                                                "isNumber",
                                                "minNumber:1",
                                            ]}
                                            errorMessages={[
                                                "Enter Your product quantity",
                                                "Must be a number",
                                                "Minimum product quantity is 1",
                                            ]}
                                        />
                                        <TextField
                                            size="small"
                                            label="Total"
                                            disabled
                                            style={{ margin: 8, width: "45%" }}
                                            type={"text"}
                                            value={total}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Phone"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="Enter a phoneNo for your order"
                                            type={"text"}
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={["Enter a phoneNo"]}
                                        />
                                    </FormControl>
                                    <Button
                                        color="tiki"
                                        type={"submit"}
                                        style={{ marginTop: "1em" }}
                                        disabled={isLoading}
                                    >
                                        Update Order
                                    </Button>
                                </FormGroup>
                            </ValidatorForm>
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default UpdateOrderForm;
