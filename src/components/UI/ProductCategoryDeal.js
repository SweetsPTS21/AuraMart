import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userStyles from "../../styles/ProductCategoryDealStyles";
import Grid from "@material-ui/core/Grid";
import Carousel from "react-material-ui-carousel";
import { getSystemBanners } from "../../store/actions/settingActions";

import Banner8 from "../../image/banner8.jpg";

const ProductCategoryDeal = () => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.settings.banners);

    useEffect(() => {
        dispatch(getSystemBanners());
    }, []);

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
                    {banners &&
                        banners[0].home1.map((banner, index) => (
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
