import { makeStyles } from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";

const userStyle = makeStyles(() => ({
    banner: {
        position: "relative",
        //width: "1000px",
        //height: "550px",
        // overflow: "hidden",
        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
    banner__image: {
        width: "100%",
        height: "100%",
    },
}));
const Banner = (props) => {
    const classes = userStyle();
    const listImage = props.listImage;
    const size = listImage.length;
    return (
        <div className={classes.banner}>
            <Grid container spacing={0} className={classes.container}>
                {listImage ? listImage.map((image, index) => (
                    <Grid item xs={12} className={classes.banner__image}>
                        <img
                            src={image}
                            alt="banner"
                            //style={{ width: "500px", height: "350px" }}
                        />
                    </Grid>
                )): (<p>Không có ảnh</p>)}
            </Grid>
        </div>
    );
};

export default Banner;
