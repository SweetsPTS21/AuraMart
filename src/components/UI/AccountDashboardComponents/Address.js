import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import AddIcon from "@material-ui/icons/Add";

import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import * as addressActions from "../../../store/actions/addressActions";
import { message } from "antd";
import * as Resource from "../../common/Resource";

const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#ff424e",
        height: "3em",
        color: "#fff",
        fontSize: "1.2em",
        textTransform: "none",
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            backgroundColor: "#ff424e",
        },
    },
    input: {
        height: "1em !important",
    },
    title: {
        fontSize: "1.1em",
        fontWeight: 400,
        marginBottom: "0.3em",
    },
    grid: {
        padding: "2em",
        backgroundColor: "white",
        borderRadius: "0.5em",
    },
    removeLinkStyles: {
        textDecoration: "none !important",
    },
    addAddress: {
        backgroundColor: "white",
        border: "1.2px dotted rgb(153, 153, 153)",
        padding: "1em",
        textAlign: "center",
        color: "#189EFF",
        "&:hover": {
            cursor: "pointer",
        },
    },
    "@global .MuiButton-outlinedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)",
    },
    "@global .MuiOutlinedInput-root fieldset": {
        borderColor: "rgb(153, 153, 153)",
    },
    "@global .Mui-focused fieldset": {
        borderColor: "#29b6f6 !important",
    },
    "@global label.Mui-focused": {
        color: "#29b6f6 !important",
    },
    "@global .MuiRadio-colorSecondary.Mui-checked": {
        color: "#29b6f6 !important",
    },
    "@global .MuiRadio-colorSecondary.Mui-checked:hover ": {
        backgroundColor: "rgba(41,182,246, 0.04) !important",
    },
    "@global .MuiIconButton-colorSecondary:hover": {
        backgroundColor: "rgba(41,182,246, 0.04) !important",
    },
    "@global .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "2px solid rgb(153, 153, 153) !important",
    },
    "@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus":
        {
            outline: "none !important",
        },
    "@global .MuiInput-underline:after": {
        borderBottom: "2px solid #29b6f6 !important",
    },
    "@global .MuiButtonBase-root.MuiIconButton-root": {
        outline: "none !important",
    },
    "@global .MuiPickersDay-daySelected": {
        backgroundColor: "#29b6f6 !important",
    },
    "@global .MuiCheckbox-colorSecondary.Mui-checked": {
        color: "#29b6f6 !important",
    },
}));

const Address = () => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const listAddress = useSelector((state) => state.address.userAddress);

    const [name, setName] = useState("");
    const [addressId, setAddressId] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [checked, setChecked] = useState(false)
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState(false);
    const [formType, setFormType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msg = message.loading("Updating address!", 0);
        const address_ = {
            fullName: name,
            city,
            district,
            ward,
            phone: phoneNo,
            address,
            default: checked,
        };
        switch (formType) {
            case "add":
                await dispatch(addressActions.addNewAddress(address_, user.id));
                break;
            case "edit":
                await dispatch(
                    addressActions.updateAddressById(
                        address_,
                        addressId,
                        user.id
                    )
                );
                break;
            default:
                break;
        }
        setTimeout(msg, 1);
        setIsEditing(false);
        setForm(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const msg = message.loading("Deleting address!", 0);
        await dispatch(addressActions.deleteAddressById(addressId, user.id));
        setTimeout(msg, 1);
        setIsEditing(false);
        setForm(false);
    };

    const removeValue = () => {
        setName("");
        setCity("");
        setDistrict("");
        setWard("");
        setPhoneNo("");
        setAddress("");
        setChecked(false);
    };

    const city_ = Resource.city;
    const district_ = Resource.district;
    const ward_ = Resource.ward;

    const Form = (
        <ValidatorForm onSubmit={handleSubmit} className={classes.grid}>
            <FormGroup
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <FormControl>
                    <TextValidator
                        size="small"
                        label="Full Name"
                        style={{ margin: 8, width: "420px" }}
                        placeholder="Your full name"
                        value={name}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        validators={["required"]}
                        errorMessages={["Enter Your Full Name"]}
                    />
                </FormControl>
                <FormControl>
                    <TextValidator
                        size="small"
                        label="Phone Number"
                        style={{ margin: 8, width: "420px" }}
                        placeholder="Phone No."
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        margin="normal"
                        type={"tel"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        validators={["required"]}
                        errorMessages={["Enter your phone number"]}
                    />
                </FormControl>
                <FormControl>
                    <TextValidator
                        size="small"
                        select
                        label="City/Province"
                        value={city}
                        style={{ margin: 8, width: "420px" }}
                        onChange={(e) => setCity(e.target.value)}
                        // helperText="Please select your city/province"
                        variant="standard"
                        validators={["required"]}
                        errorMessages={["Select a city"]}
                    >
                        {city_.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextValidator>
                </FormControl>
                <FormControl>
                    <TextValidator
                        size="small"
                        select
                        label="District"
                        value={district}
                        style={{ margin: 8, width: "420px" }}
                        onChange={(e) => setDistrict(e.target.value)}
                        // helperText="Please select your city/province"
                        variant="standard"
                        validators={["required"]}
                        errorMessages={["Select a district"]}
                    >
                        {district_.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextValidator>
                </FormControl>
                <FormControl>
                    <TextValidator
                        size="small"
                        select
                        label="Ward"
                        value={ward}
                        style={{ margin: 8, width: "420px" }}
                        onChange={(e) => setWard(e.target.value)}
                        // helperText="Please select your city/province"
                        variant="standard"
                    >
                        {ward_.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextValidator>
                </FormControl>
                <FormControl>
                    <TextValidator
                        size="small"
                        label="Address"
                        value={address}
                        style={{ margin: 8, width: "420px" }}
                        onChange={(e) => setAddress(e.target.value)}
                        // helperText="Please select your city/province"
                        variant="standard"
                        validators={["required"]}
                        errorMessages={["Enter your address"]}
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel
                        style={{
                            color: "rgb(153, 153, 153)",
                            marginLeft: "0.1em",
                        }}
                        control={
                            <Checkbox
                                style={{ width: "2em" }}
                                checked={checked}
                                onChange={() => setChecked((val) => !val)}
                                value="primary"
                                inputProps={{
                                    "aria-label": "primary checkbox",
                                }}
                            />
                        }
                        label="Set as default address"
                    />
                </FormControl>

                <Button
                    variant="contained"
                    type={"submit"}
                    className={classes.button}
                    style={{
                        fontSize: "0.7em",
                        margin: 0,
                        marginLeft: "1em",
                        marginRight: "0.5em",
                        marginTop: "2em",
                        width: "420px",
                    }}
                >
                    Update
                </Button>
                {formType === "edit" && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        style={{
                            fontSize: "0.7em",
                            margin: 0,
                            marginLeft: "1em",
                            marginRight: "0.5em",
                            marginTop: "2em",
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                )}
            </FormGroup>
        </ValidatorForm>
    );

    return (
        <div style={{ width: "80%" }}>
            <div>
                {!form && (
                    <>
                        <div className={classes.title}>Address</div>
                        <div
                            className={classes.addAddress}
                            onClick={() => (
                                setForm(true),
                                setFormType("add"),
                                setIsEditing(true),
                                removeValue()
                            )}
                        >
                            <AddIcon style={{ color: "rgb(153, 153, 153)" }} />{" "}
                            Add a new Address
                        </div>
                    </>
                )}
                {form && (
                    <>
                        <div className={classes.title}>
                            Create an address book
                        </div>
                        {Form}
                    </>
                )}
            </div>
            {!isEditing && (
                <>
                    <div className={classes.title}>My addresses</div>
                    {listAddress !== null &&
                        listAddress.length > 0 &&
                        listAddress.map((address) => (
                            <div
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "0.5em",
                                    marginTop: "0.5em",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        // height: "108px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "1em",
                                    }}
                                >
                                    <div>
                                        {address.fullName}{" "}
                                        <span
                                            style={{
                                                fontSize: "0.8em",
                                                color: "#26bc4e",
                                            }}
                                        >
                                            {address.default
                                                ? "Địa chỉ mặc định"
                                                : ""}
                                        </span>{" "}
                                        <br />
                                        <span style={{ color: "#a1a1a1" }}>
                                            Địa chỉ:{" "}
                                        </span>
                                        <span>
                                            {address.address +
                                                ", " +
                                                address.ward +
                                                ", " +
                                                address.district +
                                                ", " +
                                                address.city}
                                        </span>
                                        <br />
                                        <span style={{ color: "#a1a1a1" }}>
                                            Số điện thoại:{" "}
                                        </span>
                                        <span>{address.phone}</span> <br />
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            type={"submit"}
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<EditIcon />}
                                            style={{
                                                fontSize: "0.7em",
                                                margin: 0,
                                                marginLeft: "1em",
                                                marginRight: "0.5em",
                                                marginTop: "2em",
                                            }}
                                            onClick={() => {
                                                setForm(true);
                                                setFormType("edit");
                                                setIsEditing(true);
                                                setAddressId(address._id);
                                                setName(address.fullName);
                                                setCity(address.city);
                                                setDistrict(address.district);
                                                setWard(address.ward);
                                                setPhoneNo(address.phone);
                                                setAddress(address.address);
                                                setChecked(address.default);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default Address;
