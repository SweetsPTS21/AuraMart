import { makeStyles } from "@material-ui/core";
import React from "react";

const userStyle = makeStyles(() => ({
    banner: {
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    banner__image: {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
}));
const Banner = (props) => {
    const classes = userStyle();
    const listImage = props.listImage;
    const size = listImage.length;
    return (
        <div className={classes.banner}>
            <Grid container spacing={0}>
                {listImage.map((image, index) => {
                    <Grid item xs={12} className={image.style}>
                        <img src={image.link} alt="banner" />
                    </Grid>;
                })}
            </Grid>
        </div>
    );
};

export default Banner;
