import React from "react";
import { Link } from "react-router-dom";
import userStyles from "../../styles/ProductCategoryDealStyles";
import Grid from "@material-ui/core/Grid";
import Carousel from "react-material-ui-carousel";

import Banner1 from "../../image/banner1.jpg";
import Banner2 from "../../image/banner2.png";
import Banner3 from "../../image/banner3.png";
import Banner4 from "../../image/banner4.png";
import Banner5 from "../../image/banner5.png";
import Banner6 from "../../image/banner6.png";
import Banner7 from "../../image/banner7.jpg";
import Banner8 from "../../image/banner8.jpg";

const ProductCategoryDeal = () => {
    const classes = userStyles();

    return (
        <Grid container className={classes.container} spacing={2}>
            <Grid item xs={9} spacing={2} style={{ height: "100%" }}>
                <Carousel
                    interval={3000}
                    // IndicatorIcon={<div className={classes.indicator} />}
                    indicatorIconButtonProps={{
                        style: {
                            padding: "5px", // 1
                        },
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {},
                    }}
                    indicatorContainerProps={{
                        style: {
                            position: "absolute",
                            bottom: "0",
                            zIndex: "100",
                        },
                    }}
                >
                    <Link to={"#"}>
                        <img src={Banner1} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner2} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner3} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner4} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner5} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner6} alt="" className={classes.banner} />
                    </Link>
                    <Link to={"#"}>
                        <img src={Banner7} alt="" className={classes.banner} />
                    </Link>
                </Carousel>
            </Grid>
            <Grid item xs={3} spacing={2} style={{ height: "100%" }}>
                <Link to={"#"}>
                    <img src={Banner8} alt="" className={classes.banner} />
                </Link>
            </Grid>
        </Grid>
    );
};

export default ProductCategoryDeal;
