import React, { useEffect } from "react";
import userStyles from "../styles/AllUsersStyles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../../Card";
import NoPhoto from "../../../../image/nophoto.png";
import LoadingSpinner from "../../../layout/LoadingSpinner";

import * as statsActions from "../../../../store/actions/statsActions";
import ShopStats from "./ShopStats";
import UserStats from "./UserStats";
import ProductStats from "./ProductStats";

const Stats = () => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.products);
    const topProducts = useSelector((state) => state.stats.topProducts); // all users

    useEffect(() => {
        dispatch(statsActions.getTopSoldProducts());
    }, []);

    const getProductDetails = (id) =>
        allProducts.find((prod) => prod._id === id);

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <Grid container style={{ paddingLeft: "1em" }}>
                {allProducts && (
                    <>
                        <Grid
                            item
                            xs={4}
                            md={4}
                            lg={4}
                            className={classes.card}
                            style={{ marginTop: "2em" }}
                        >
                            <UserStats fullwidth noLoading />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            md={4}
                            lg={4}
                            className={classes.card}
                            style={{ marginTop: "2em" }}
                        >
                            <ProductStats noLoading products={allProducts} />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            md={4}
                            lg={4}
                            className={classes.card}
                            style={{ marginTop: "2em" }}
                        >
                            <ShopStats noLoading />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            style={{
                                fontSize: "1.5em",
                                marginLeft: "1em",
                                marginBottom: "1.5em",
                                fontWeight: 600,
                            }}
                        >
                            Top Sold Products
                        </Grid>
                    </>
                )}
                <div style={{ padding: "1em" }}>
                    {topProducts !== null &&
                    allProducts !== null &&
                    topProducts.length > 0
                        ? topProducts.map((product) => {
                              let prod = getProductDetails(product._id);
                              return (
                                  prod && (
                                      <ProductCard
                                          style={{
                                              width: "180px",
                                              backgroundColor: "#fff",
                                              margin: "0.5em",
                                          }}
                                          key={prod.id}
                                          id={prod.id}
                                          slug={
                                              prod.slug !== undefined
                                                  ? prod.slug
                                                  : ""
                                          }
                                          type={"review"}
                                          price={prod.price}
                                          discount={
                                              prod.discount !== undefined
                                                  ? prod.discount
                                                  : 0
                                          }
                                          title={prod.name}
                                          image={
                                              prod.photo === "no-photo.jpg"
                                                  ? NoPhoto
                                                  : prod.photo
                                          }
                                          rating={prod.averageRating}
                                          link={true}
                                          count={product.count}
                                      />
                                  )
                              );
                          })
                        : null}
                </div>            
            </Grid>
            {!topProducts && <LoadingSpinner />}   
        </div>
    );
};

export default Stats;
