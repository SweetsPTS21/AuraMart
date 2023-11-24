import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import * as configActions from "../../../store/actions/configActions";
import { TextField, Typography } from "@material-ui/core";
import { message } from "antd";
import MyVoucher from "../AccountDashboardComponents/MyVoucher";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },

    container: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: "0.5em",
        borderRadius: "0.5em",
    },
    block: {
        marginBottom: "1em",
        padding: "1em",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5em",
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        color: "#ff9100",
        borderColor: "#ff9100",
        marginLeft: "1em",
    },
    title: {
        fontSize: "1.5em",
        fontWeight: 700,
        marginBottom: "1em",
    },
    config__title: {
        fontSize: "1.5em",
        fontWeight: 500,
        marginBottom: "1em",
    },

    config__content: {
        margin: "0 auto",
    },
    config__select: {
        display: "flex",
        marginBottom: "1em",
    },
    config__decor: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1em",
    },
    config__banner: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1em",
    },
    buttonActive: {
        backgroundColor: "#ff9100",
        color: "#ffffff",
        marginLeft: "1em",
    },
}));

const ShopConfig = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const shop = props.shop;
    const intilizeConfigs = [
        {
            name: "",
            description: "",
            address: "",
            phone: "",
            avatar: "",
            decoration: ["decor1", "decor2"],
            banner: ["banner1", "banner2"],
            using: false,
        },
    ];

    const [configs, setConfigs] = useState(
        props.configs.length > 0 ? props.configs : intilizeConfigs
    );
    const [name, setName] = useState(shop.name);
    const [description, setDescription] = useState(shop.description);
    const [address, setAddress] = useState(shop.address);
    const [phone, setPhone] = useState(shop.phone);
    const [avatar, setAvatar] = useState(shop.avatar);
    const [currentConfig, setCurrentConfig] = useState(configs[0]);
    const [configIndex, setConfigIndex] = useState(0);
    const [shopDecorations, setShopDecorations] = useState(
        currentConfig.decoration
    );
    const [shopBanners, setShopBanners] = useState(currentConfig.banner);

    const handleSubmit = () => {};
    const handleChangeConfig = (item, index) => {
        //save change in previous config
        const updateConfig = {
            ...currentConfig,
            banner: shopBanners,
            decoration: shopDecorations,
        };
        configs[configIndex] = updateConfig;
        configs[configIndex].using = false;
        setConfigs(configs);

        //Set current config for shop
        item.using = true;
        setShopDecorations(item.decoration);
        setShopBanners(item.banner);
        setCurrentConfig(item);
        setConfigIndex(index);
    };
    const handleAddBanner = () => {
        const updatedItems = [...shopBanners, ""];
        setShopBanners(updatedItems);
    };

    const handleRemoveBanner = (index) => {
        const updatedItems = [...shopBanners];
        updatedItems.splice(index, 1);
        setShopBanners(updatedItems);
    };

    const handleSaveConfig = async () => {
        const msg = message.loading("Updating configs!", 0);
        const data = {
            ...currentConfig,
            decoration: shopDecorations,
            banner: shopBanners,
            using: true,
        };
        //e.preventDefault();

        if (currentConfig.id) {
            await dispatch(
                configActions.updateConfigById(shop.id, data, currentConfig.id)
            );
        } else {
            await dispatch(configActions.createNewConfig(data, shop.id));
        }

        setTimeout(msg, 1);
    };

    const handleChangeDecor = (event, index) => {
        const updatedItems = [...shopDecorations];
        updatedItems[index] = event.target.value;
        setShopDecorations(updatedItems);
    };

    const handleChangeBanner = (event, index) => {
        const updatedItems = [...shopBanners];
        updatedItems[index] = event.target.value;
        setShopBanners(updatedItems);
    };

    const handleAddConfig = () => {
        const newConfig = {
            name: "",
            description: "",
            address: "",
            phone: "",
            avatar: "",
            decoration: ["decor1", "decor2"],
            banner: ["banner1", "banner2"],
            using: false,
        };
        configs.push(newConfig);
        setConfigs(configs);
    };

    return (
        <>
            <Grid item xs={6} style={{ paddingRight: "1em" }}>
                <div className={classes.block} style={{ padding: "2em" }}>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <FormGroup className={classes.grid}>
                            <FormControl>
                                <div className={classes.config__title}>
                                    Infomation
                                </div>
                                <TextValidator
                                    size="small"
                                    label="Shop name"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="Shop name"
                                    value={name}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Shop name"]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Shop description"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="Shop description"
                                    value={description}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Shop description"]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Shop address"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="Shop address"
                                    value={address}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setAddress(e.target.value)}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Shop address"]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Shop phone"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="Shop phone"
                                    value={phone}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setPhone(e.target.value)}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Shop phone"]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextValidator
                                    size="small"
                                    label="Shop avatar"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="Shop avatar"
                                    value={avatar}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    variant="standard"
                                    validators={["required"]}
                                    errorMessages={["Enter Shop avatar"]}
                                />
                            </FormControl>
                            <Button
                                variant="outlined"
                                type={"submit"}
                                color="secondary"
                                className={classes.button}
                                style={{
                                    fontSize: "0.7em",
                                    margin: 0,
                                    marginLeft: "1em",
                                    marginRight: "0.5em",
                                    marginTop: "2em",
                                }}
                            >
                                Update
                            </Button>
                        </FormGroup>
                    </ValidatorForm>
                </div>
            </Grid>
            <Grid item container xs={6}>
                <div
                    className={classes.block}
                    style={{ width: "100%", padding: "2em" }}
                >
                    <div
                        className={classes.config__title}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <span>Config</span>
                        {configs &&
                            configs.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={() =>
                                        handleChangeConfig(item, index)
                                    }
                                    className={
                                        item.using
                                            ? classes.buttonActive
                                            : classes.button
                                    }
                                >
                                    Config {index}
                                </Button>
                            ))}
                        <Button
                            variant="outlined"
                            className={classes.button}
                            onClick={() => handleAddConfig()}
                        >
                            <Add />
                        </Button>
                    </div>
                    <Grid item xs={12} className={classes.config__decor}>
                        <Typography>Decoration(avatar & background)</Typography>
                        {shopDecorations.map((decor, index) => (
                            <TextField
                                key={index}
                                size="small"
                                label="image link"
                                style={{ width: "600px", margin: 8 }}
                                placeholder="image url"
                                value={decor}
                                margin="normal"
                                variant="standard"
                                onChange={(event) =>
                                    handleChangeDecor(event, index)
                                }
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} className={classes.config__banner}>
                        <Typography>Banner</Typography>
                        {shopBanners.map((banner, index) => (
                            <div style={{ display: "flex" }}>
                                <TextField
                                    size="small"
                                    label="image link"
                                    style={{ width: "600px", margin: 8 }}
                                    placeholder="image url"
                                    value={banner}
                                    margin="normal"
                                    variant="standard"
                                    onChange={(event) =>
                                        handleChangeBanner(event, index)
                                    }
                                />
                                <Button
                                    onClick={() => handleRemoveBanner(index)}
                                    className={classes.button}
                                    style={{ width: "40px" }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => handleAddBanner()}
                            className={classes.button}
                            style={{ width: "80px" }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleSaveConfig()}
                            className={classes.button}
                            style={{ width: "80px" }}
                        >
                            Save
                        </Button>
                    </Grid>
                </div>
            </Grid>
        </>
    );
};

const ShopTags = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.block}>
            <div className={classes.config__header}>Shop tags</div>
        </Grid>
    );
};

const ShopVouchers = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.block}>
            <Grid item xs={12} className={classes.config__header}>
                Shop vouchers
            </Grid>
            <Grid item xs={12} className={classes.config__content}>
                <MyVoucher type={"shop"} />
            </Grid>
        </Grid>
    );
};

const ShopManagement = () => {
    const classes = useStyles();
    const shop = useSelector((state) => state.shops.userShop);
    const configsInShop = useSelector((state) => state.configs.configsInShop);

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {shop ? (
                    configsInShop && (
                        <>
                            <ShopConfig shop={shop} configs={configsInShop} />
                            <ShopTags />
                            <ShopVouchers />
                        </>
                    )
                ) : (
                    <h2>User don't own any shop</h2>
                )}
            </Grid>
        </div>
    );
};

export default ShopManagement;
