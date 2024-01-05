import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardBody from "../../../layout/Card/CardBody";
import Button from "../../../layout/CustomButtons/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch } from "react-redux";
import { message } from "antd";
import * as shopActions from "../../../../store/actions/shopActions";
import {
    aumartCardHeader,
    aumartColor,
    blackColor,
    hexToRgb,
    whiteColor,
} from "../../../layout/Card/styles/material-dashboard-react";
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
}));

const UpdateAShopForm = ({ shop, setShowUpdateForm }) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const [name, setName] = useState(shop.name);
    const [description, setDescription] = useState(shop.description);
    const [phone, setPhone] = useState(shop.phone);
    const [address, setAddress] = useState(shop.address);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Creating shop!", 0);
        let shop_ = {
            name,
            description,
            phone,
            address,
        };

        dispatch(await shopActions.updateShopById(shop_, shop._id));

        setTimeout(msg, 1);

        setIsLoading(false);
        setAddress("");
        setPhone("");
        setDescription("");
        setName("");
        setShowUpdateForm((val) => !val);
    };

    return (
        <div style={{ width: "100%" }}>
            <Grid container style={{ marginTop: "0.7em", marginLeft: "0.5em" }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card style={{ marginLeft: "3vw" }}>
                        <CardHeader color="aumart">
                            <h4 className={classes.cardTitleWhite}>
                                Update A Shop
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Update {shop.name}
                            </p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Shop Name"
                                            style={{ margin: 8 }}
                                            placeholder="Enter shop's name"
                                            value={name}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={[
                                                "Enter Your shop's name",
                                            ]}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <TextValidator
                                            // size="large"
                                            multiline
                                            rows={3}
                                            label="Shop Description"
                                            style={{ margin: 8 }}
                                            placeholder="This cake proudly serves itself for a family gathering, a dinner party, a birthday celebration, a baby christening, and a gift to someone special or simply to have on hand on the cake stand at home served with an ice cold glass of milk!"
                                            value={description}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            variant="standard"
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
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Phone"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="Enter a phoneNo for your shop"
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
                                        color="aumart"
                                        type={"submit"}
                                        style={{ marginTop: "1em" }}
                                        disabled={isLoading}
                                    >
                                        Update Shop
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

export default UpdateAShopForm;
