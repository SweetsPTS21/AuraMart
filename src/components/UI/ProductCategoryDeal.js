import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    const banners = useSelector((state) => state.settings.banners);
    const [home1, setHome1] = useState(null);

    useEffect(() => {
        setHome1(banners && banners[0].home1);
    }, [banners]);

    const bannerImages = [
        Banner1,
        Banner2,
        Banner3,
        Banner4,
        Banner5,
        Banner6,
        Banner7,
    ];

    return (
        <Grid
            container
            className={classes.container}
            style={{ marginBottom: "1em" }}
        >
            <Grid item xs={9} style={{ height: "100%", paddingRight: "1em" }}>
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
                    {home1 &&
                        bannerImages?.map((banner, index) => (
                            <Link to={"#"} key={index}>
                                <img
                                    src={banner}
                                    alt=""
                                    className={classes.banner}
                                />
                            </Link>
                        ))}
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
