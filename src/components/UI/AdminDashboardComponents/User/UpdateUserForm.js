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
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { message } from "antd";
import * as userActions from "../../../../store/actions/userActions";

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
    formControl: {
        width: "100%",
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
    "@global .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop" : {
        backgroundColor: "rgb(0 0 0 / 32%) !important",
    },
}));

const UpdateUserForm = (props) => {
    const { user, style } = props;
    const classes = userStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [newPassword, setNewPassword] = useState(user.password);
    const [retypePassword, setRetypePassword] = useState(user.password);
    const [selectedDate, setSelectedDate] = useState(user.dob);

    const [gender, setGender] = useState(user.gender);
    const [role, setRole] = useState(user.role);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        ValidatorForm.addValidationRule(
            "isPasswordMatch",
            (value) => newPassword === retypePassword
        );
    }, [retypePassword, newPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating user!", 0);
        let user_;
        if (checked) {
            user_ = {
                newName: name,
                newPassword: newPassword,
                newRole: role,
                newGender: gender,
                newPhone: phone,
                newAddress: address,
                newDob: selectedDate,
            };
        } else {
            user_ = {
                newName: name,
                newRole: role,
                newGender: gender,
                newPhone: phone,
                newAddress: address,
                newDob: selectedDate,
            };
        }
        await dispatch(userActions.updateUserById(user_, user._id));

        props.setShowUserCard((val) => !val);
        setTimeout(msg, 1);
        setIsLoading(false);
    };

    return (
        <div style={style}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ margin: "0 auto", width: "420px" }}
                >
                    <Card>
                        <CardHeader color="tiki">
                            <h4 className={classes.cardTitleWhite}>
                                Update User
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Update a user's profile
                            </p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Full Name"
                                            style={{ margin: 8 }}
                                            placeholder="User's full name"
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
                                                "Enter Your Full Name",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Email"
                                            style={{ margin: 8 }}
                                            placeholder="Email"
                                            disabled
                                            type={"email"}
                                            value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required", "isEmail"]}
                                            errorMessages={[
                                                "Enter an email",
                                                "Enter a valid email address",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Phone"
                                            style={{ margin: 8 }}
                                            placeholder="Phone Number"
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
                                            errorMessages={[
                                                "Enter user's you phone number",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Address"
                                            style={{ margin: 8 }}
                                            placeholder="User's Address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={[
                                                "Enter user's address",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                        style={{
                                            marginLeft: "0.6em",
                                            marginTop: "0.5em",
                                        }}
                                    >
                                        <FormLabel component="legend">
                                            Gender
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender1"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            row
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </RadioGroup>
                                        <FormLabel component="legend">
                                            Role
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="role"
                                            name="role1"
                                            value={role}
                                            onChange={(e) =>
                                                setRole(e.target.value)
                                            }
                                            row
                                        >
                                            <FormControlLabel
                                                value="user"
                                                control={<Radio />}
                                                label="User"
                                            />
                                            <FormControlLabel
                                                value="seller"
                                                control={<Radio />}
                                                label="Seller"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                        style={{
                                            marginLeft: "0.8em",
                                            marginRight: "0.5em",
                                        }}
                                    >
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                size="small"
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                label="Date of birth"
                                                value={selectedDate}
                                                onChange={(date) =>
                                                    setSelectedDate(date)
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        <FormControlLabel
                                            style={{
                                                color: "rgb(153, 153, 153)",
                                                marginLeft: "0.1em",
                                            }}
                                            control={
                                                <Checkbox
                                                    style={{ width: "2em" }}
                                                    checked={checked}
                                                    onChange={() =>
                                                        setChecked(
                                                            (val) => !val
                                                        )
                                                    }
                                                    value="primary"
                                                    inputProps={{
                                                        "aria-label":
                                                            "primary checkbox",
                                                    }}
                                                />
                                            }
                                            label="Change user's password"
                                        />
                                    </FormControl>
                                    {checked && (
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <TextValidator
                                                size="small"
                                                label="New Password"
                                                style={{ margin: 8 }}
                                                placeholder="Password from 6 to 32 characters"
                                                maxLength={6}
                                                minLength={32}
                                                value={newPassword}
                                                margin="normal"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                onChange={(e) =>
                                                    setNewPassword(
                                                        e.target.value
                                                    )
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={["required"]}
                                                errorMessages={[
                                                    "Enter your new password",
                                                ]}
                                                variant="standard"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        (val) =>
                                                                            !val
                                                                    )
                                                                }
                                                                onMouseDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
                                                                }
                                                                edge="end"
                                                            >
                                                                {showPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextValidator
                                                size="small"
                                                label="Retype"
                                                style={{ margin: 8 }}
                                                placeholder="Enter a new password"
                                                maxLength={6}
                                                minLength={32}
                                                value={retypePassword}
                                                margin="normal"
                                                onChange={(e) =>
                                                    setRetypePassword(
                                                        e.target.value
                                                    )
                                                }
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                validators={[
                                                    "required",
                                                    "isPasswordMatch",
                                                ]}
                                                errorMessages={[
                                                    "Retype you new password",
                                                    "Password does not match",
                                                ]}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        (val) =>
                                                                            !val
                                                                    )
                                                                }
                                                                onMouseDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
                                                                }
                                                                edge="end"
                                                            >
                                                                {showPassword ? (
                                                                    <VisibilityOff />
                                                                ) : (
                                                                    <Visibility />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}

                                    <Button
                                        color="tiki"
                                        type={"submit"}
                                        style={{ marginTop: "1em" }}
                                        disabled={isLoading}
                                    >
                                        Update user
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

export default UpdateUserForm;
