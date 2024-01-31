import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Card from "../../../layout/Card/Card";
import CardHeader from "../../../layout/Card/CardHeader";
import CardBody from "../../../layout/Card/CardBody";
import Button from "../../../layout/CustomButtons/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import * as productActions from "../../../../store/actions/productActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {
    aumartCardHeader,
    aumartColor,
    blackColor,
    hexToRgb,
    whiteColor,
} from "../../../layout/Card/styles/material-dashboard-react";
import "@progress/kendo-theme-default/dist/all.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../utils/firebaseConfig";
import { countries, categoryOptions } from "../../../common/Resource";
import PropTypes from "prop-types";

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

const AddANewProduct = (props) => {
    const { style } = props;
    const classes = userStyles();
    const dispatch = useDispatch();
    const allShops = useSelector((state) => state.shops.shops);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(["accessories", "books-gifts"]);
    const [price, setPrice] = useState();
    const [description, setDescription] = useState([
        "11 Programmable Buttons",
        "Ergonomic Design",
    ]); //csv
    const [dimension, setDimension] = useState("");
    const [weight, setWeight] = useState("");
    const [specs, setSpecs] = useState([
        "Connection Type: Wired",
        "Max Speed: 450IPS",
    ]); //csv
    const [branch, setBranch] = useState("");
    const [origin, setOrigin] = useState(""); // get country list
    const [discount, setDiscount] = useState();
    const [colors, setColors] = useState([
        "Black&Red",
        "Black&Green",
        "Black&Blue",
    ]);
    const [quantity, setQuantity] = useState(0);
    const [shop, setShop] = useState("");
    const [photo, setPhoto] = useState(null);


    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ValidatorForm.addValidationRule(
            "isCategoryEmpty",
            () => category.length > 0
        );
        ValidatorForm.addValidationRule("isSpecsEmpty", () => specs.length > 0);
        ValidatorForm.addValidationRule(
            "isDescriptionEmpty",
            () => description.length > 0
        );
        ValidatorForm.addValidationRule(
            "isDiscountNotLowerThanZero",
            () => discount >= 0
        );
        ValidatorForm.addValidationRule(
            "isShopInputEmpty",
            (value) => value.length > 0
        );
    }, [category, specs, description, discount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Creating product!", 0);
        let desc = description.join();
        let specification = specs.join();
        let product = {
            name,
            category,
            price,
            description: desc,
            dimension,
            weight,
            specs: specification,
            branch,
            origin,
            discount: parseInt(discount),
            quantity: quantity,
            colors,
        };

        dispatch(productActions.createProduct(product, shop, "new")).then(r => r);
        setTimeout(msg, 1);

        setIsLoading(false);
        setName("");
        setWeight("");
        setBranch("");
        setPrice("");
        setDiscount("");
        setDimension("");
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        const fileUpload = e.target.files[0];

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
            `images/products/new/photo_${fileUpload.name}`
        );

        const msg = message.loading("Uploading image!", 0);

        try {
            const snapshot = await uploadBytes(storageRef, fileUpload);
            message.success("File uploaded successfully");

            const url = await getDownloadURL(snapshot.ref);
            setPhoto(url);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setTimeout(msg, 1);
        }
    };

    return (
        <div style={style}>
            <Grid container>
                <Grid item style={{ margin: "0 auto", width: "670px" }}>
                    <Card>
                        <CardHeader color="aumart">
                            <h4 className={classes.cardTitleWhite}>
                                Add Product
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Create a new product
                            </p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Product Name"
                                            style={{ margin: 8 }}
                                            placeholder="Enter product's name"
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
                                                "Enter Your product's name",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl style={{ marginTop: "1.5em" }}>
                                        <Autocomplete
                                            multiple
                                            style={{ width: "100%" }}
                                            id="size-small-outlined-multi"
                                            size="small"
                                            onChange={(e, value) => {
                                                setCategory(value);
                                            }}
                                            defaultValue={category}
                                            options={categoryOptions}
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
                                                        size={"small"}
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
                                                    placeholder="Enter your product's category"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    validators={[
                                                        "isCategoryEmpty",
                                                    ]}
                                                    errorMessages={[
                                                        "Enter product category",
                                                    ]}
                                                />
                                            )}
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
                                            label="Price"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="Price"
                                            type={"text"}
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={[
                                                "required",
                                                "isNumber",
                                                "minNumber:1",
                                            ]}
                                            errorMessages={[
                                                "Enter a product price",
                                                "Enter a number",
                                                "Price is to low",
                                            ]}
                                        />
                                        <TextValidator
                                            size="small"
                                            label="Product Dimension"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="11 x 5.2 x 11 inches"
                                            value={dimension}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setDimension(e.target.value)
                                            }
                                            variant="standard"
                                        />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Product Weight"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="50g"
                                            value={weight}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setWeight(e.target.value)
                                            }
                                            variant="standard"
                                        />
                                        <TextValidator
                                            size="small"
                                            label="Product Branch"
                                            style={{ margin: 8, width: "45%" }}
                                            placeholder="Hyper X"
                                            value={branch}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) =>
                                                setBranch(e.target.value)
                                            }
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={[
                                                "Enter Your product's branch",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl style={{ marginTop: "1.5em" }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-fefailled"
                                            options={[]}
                                            freeSolo
                                            defaultValue={specs}
                                            onChange={(e, value) => {
                                                setSpecs(value);
                                            }}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        size={"small"}
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
                                                    label="Product specifications"
                                                    style={{
                                                        margin: 8,
                                                        paddingRight: "1em",
                                                    }}
                                                    placeholder="Press enter key to add more fields"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    validators={[
                                                        "isSpecsEmpty",
                                                    ]}
                                                    errorMessages={[
                                                        "Enter product specs",
                                                    ]}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginTop: "1.5em",
                                        }}
                                    >
                                        <Autocomplete
                                            id="cfd-demofr"
                                            options={countries}
                                            classes={{
                                                option: classes.option,
                                            }}
                                            style={{ width: "50%" }}
                                            noOptionsText={`No country with that name`}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            autoHighlight
                                            onChange={(e, value) => {
                                                setOrigin(value.label);
                                            }}
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
                                                    {option.label}
                                                </p>
                                            )}
                                            renderInput={(params) => (
                                                <TextValidator
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    label="Product Origin"
                                                    style={{ margin: 8 }}
                                                    placeholder="Enter product's origin"
                                                    value={name}
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                    }}
                                                    onChange={(e) =>
                                                        setOrigin(
                                                            e.target.value
                                                        )
                                                    }
                                                    variant="standard"
                                                    validators={["required"]}
                                                    errorMessages={[
                                                        "Enter Your product's origin",
                                                    ]}
                                                />
                                            )}
                                        />
                                        <TextValidator
                                            size="small"
                                            label="Discount %"
                                            style={{ margin: 8, width: "40%" }}
                                            placeholder="Discount percentage"
                                            type={"text"}
                                            value={discount}
                                            onChange={(e) =>
                                                setDiscount(e.target.value)
                                            }
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={[
                                                "isNumber",
                                                "isDiscountNotLowerThanZero",
                                                "maxNumber: 100",
                                            ]}
                                            errorMessages={[
                                                "Enter a number",
                                                "Discount can't be lower than zero",
                                                "Discount can't be higher than 100",
                                            ]}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                        style={{ marginTop: "1.5em" }}
                                    >
                                        <TextValidator
                                            size="small"
                                            label="Quantity"
                                            style={{ margin: 8, width: "40%" }}
                                            placeholder="Number of products"
                                            type={"text"}
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={[
                                                "isNumber",
                                                "isDiscountNotLowerThanZero",
                                                "maxNumber: 1000000",
                                            ]}
                                            errorMessages={[
                                                "Enter a number",
                                                "Quantity can't be lower than zero",
                                                "Discount can't be higher than 1000000",
                                            ]}
                                        />
                                    </FormControl>

                                    <FormControl style={{ marginTop: "1.5em" }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-filled"
                                            options={[]}
                                            freeSolo
                                            defaultValue={colors}
                                            onChange={(e, value) => {
                                                setColors(value);
                                            }}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        size={"small"}
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
                                                    label="Product colors"
                                                    style={{
                                                        margin: 8,
                                                        paddingRight: "1em",
                                                    }}
                                                    placeholder="Press enter key to add more fields"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                />
                                            )}
                                        />
                                        <FormControl>
                                            <Autocomplete
                                                id="edfkadmo"
                                                options={allShops}
                                                classes={{
                                                    option: classes.option,
                                                }}
                                                style={{ width: "100%" }}
                                                noOptionsText={`No shop with that name`}
                                                onChange={(e, value) => {
                                                    setShop(
                                                        value !== null
                                                            ? value._id
                                                            : ""
                                                    );
                                                }}
                                                getOptionLabel={(option) =>
                                                    option.name +
                                                    "  " +
                                                    option._id
                                                }
                                                autoHighlight
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
                                                        {option.name}
                                                        <br />
                                                        {option._id}
                                                    </p>
                                                )}
                                                renderInput={(params) => (
                                                    <TextValidator
                                                        {...params}
                                                        fullWidth
                                                        size="small"
                                                        value={shop}
                                                        label="Product's Shop"
                                                        style={{ margin: 8 }}
                                                        placeholder="Enter product's shop"
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            ...params.inputProps,
                                                        }}
                                                        variant="standard"
                                                        validators={[
                                                            "isShopInputEmpty",
                                                        ]}
                                                        errorMessages={[
                                                            "Enter product's shop",
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </FormControl>
                                    <FormControl style={{ marginTop: "1.5em" }}>
                                        <Autocomplete
                                            multiple
                                            id="lkfjed"
                                            options={[]}
                                            defaultValue={description}
                                            freeSolo
                                            onChange={(e, value) => {
                                                setDescription(value);
                                            }}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <Chip
                                                        variant="outlined"
                                                        size={"small"}
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
                                                    label="Product description"
                                                    style={{
                                                        margin: 8,
                                                        paddingRight: "1em",
                                                    }}
                                                    placeholder="Press enter key to add more fields"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    variant="standard"
                                                    validators={[
                                                        "isDescriptionEmpty",
                                                    ]}
                                                    errorMessages={[
                                                        "Enter product description",
                                                    ]}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormControl
                                        className={classes.formControl}
                                    >
                                        {/*<Input inputProps={{onDrop: onDrop}} placeholder={"blaaaaaaaa"}/>*/}
                                        <p
                                            style={{
                                                color: "rgba(0, 0, 0, 0.54)",
                                                fontSize: "0.9rem",
                                                fontWeight: 400,
                                                marginLeft: "0.6em",
                                                marginBottom: "0.5em",
                                                marginTop: "1em",
                                            }}
                                        >
                                            Product Image
                                        </p>

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <img
                                                src={photo}
                                                alt=""
                                                style={{
                                                    width: "64px",
                                                    height: "64px",
                                                }}
                                            />
                                            <Button
                                                component="label"
                                                variant="contained"
                                                style={{ marginTop: "1em" }}
                                            >
                                                Upload file
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={(e) =>
                                                        uploadImage(e)
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <Button
                                        color="aumart"
                                        type={"submit"}
                                        style={{ marginTop: "1em" }}
                                        disabled={isLoading}
                                    >
                                        Create Product
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

AddANewProduct.propTypes = {
    style: PropTypes.object,
};

export default AddANewProduct;
