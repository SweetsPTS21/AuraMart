import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../UI/ProductCategoryDeal";
import ProductNavigation from "../UI/ProductNavigation";
import Footer from "../layout/Footer";
import Card from "../UI/Card";
import ProductDeal from "../UI/ProductDeal";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import InterestedProducts from "../UI/InterestedProducts";
import HotKeyword from "../UI/HotKeyword";
import ItemContainer from "../UI/ItemContainer";
import { useSelector, useDispatch } from "react-redux";
import * as errorActions from "../../store/actions/errorActions";
import * as addressActions from "../../store/actions/addressActions";
import { getRecommendedProducts } from "../../store/actions/productActions";
import { message } from "antd";
// import "antd/dist/antd.css";

Array.prototype.shuffle = function () {
    let input = this;

    for (let i = input.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

const HomePage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state.products.products);
    const recommendProds = useSelector(
        (state) => state.products.recommendProds
    );
    const [productsWithDiscount, setProductsWithDiscount] = useState([]);
    const [seeMoreDiscountedProd, setSeeMoreDiscountedProd] = useState(10);
    const [loadingDisProd, setLoadingDisProd] = useState(false);
    const [seeMoreProd, setSeeMoreProd] = useState(20);
    const [seeMoreRecommendProd, setSeeMoreRecommendProd] = useState(10);
    const [loadingProd, setLoadingProd] = useState(false);

    const getProductsWithDiscount = async () => {
        if (products === null) return;
        const filtered = await products.filter(
            (product) => product.discount !== undefined
        );
        setProductsWithDiscount(filtered.shuffle());
    };
    // const errors = useSelector(state => state.errors);
    // const [errors_, setErrors_] = useState([]);
    const errors = useSelector((state) => {
        // transform the object of object to array of object
        const transformedErrors = [];
        for (let key in state.errors) {
            transformedErrors.push(state.errors[key]);
        }
        return transformedErrors;
    });

    if (errors.length > 0) {
        errors.map((error) => {
            message.error(error);
            return null;
        });
        dispatch(errorActions.clearErrors());
    }

    useEffect(() => {
        setTimeout(() => getProductsWithDiscount(), 1000);
    }, [products]);

    useEffect(() => {
        if (user && user.id !== undefined) {
            dispatch(getRecommendedProducts(user.id));
        }
    }, [user]);

    // using dispatch to get user address
    // useEffect(() => {
    //     dispatch(addressActions.getUserAddress(user.id));
    // }, [user.id]);

    const renderDiscountedProd = () => {
        return (
            productsWithDiscount.length > 0 &&
            productsWithDiscount.map(
                (prod, index) =>
                    prod.discount !== undefined &&
                    index < seeMoreDiscountedProd && (
                        <Card
                            key={index}
                            type={"deal"}
                            id={prod.id}
                            slug={prod.slug}
                            price={prod.price}
                            discount={prod.discount}
                            title={prod.name}
                            image={
                                prod.photo === "no-photo.jpg"
                                    ? BottleWarmer
                                    : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                            }
                            sold={Math.floor(Math.random() * 50) + 50} // picking random num since this feature isn't implemented yet
                            hot={true}
                            timeInMilliSec={
                                (Math.floor(Math.random() * 10) + 2) * 100000
                            } // 50 seconds
                            link={true}
                            style={{ height: "330px", width: "170px" }}
                        />
                    )
            )
        );
    };

    const renderProd = () => {
        return (
            products !== null &&
            products.map(
                (prod, index) =>
                    index < seeMoreProd && (
                        <Card
                            key={prod.id}
                            id={prod.id}
                            type={"review"}
                            slug={prod.slug}
                            price={prod.price}
                            discount={
                                prod.discount !== undefined ? prod.discount : 0
                            }
                            title={prod.name}
                            image={
                                prod.photo === "no-photo.jpg"
                                    ? BottleWarmer
                                    : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                            }
                            rating={prod.averageRating}
                            link={true}
                            style={{ height: "330px", width: "170px" }}
                        />
                    )
            )
        );
    };

    const renderRecommendProd = () => {
        return (
            recommendProds &&
            recommendProds.length > 0 &&
            recommendProds.map(
                (prod, index) =>
                    //just to make sure that the product is not null and the index is less than 10
                    index < seeMoreRecommendProd &&
                    prod && (
                        <Card
                            key={prod.id}
                            id={prod.id}
                            type={"review"}
                            slug={prod.slug}
                            price={prod.price}
                            discount={
                                prod.discount !== undefined ? prod.discount : 0
                            }
                            title={prod.name}
                            image={
                                prod.photo === "no-photo.jpg"
                                    ? BottleWarmer
                                    : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                            }
                            rating={prod.averageRating}
                            link={true}
                            style={{ height: "330px", width: "170px" }}
                        />
                    )
            )
        );
    };

    return (
        <div
            style={{
                width: "100%",
                minWidth: "1300px",
                height: "100%",
                backgroundColor: "#F4F4F4",
                overflowX: "visible",
            }}
        >
            <NavBar {...props} />
            <div
                style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        maxWidth: "1200px",
                        padding: "0.5em",
                    }}
                >
                    <div
                        style={{
                            width: "20%",
                            maxWidth: "235px",
                            position: "relative",
                        }}
                    >
                        <ProductNavigation />
                    </div>
                    <div
                        style={{
                            width: "80%",
                            paddingLeft: "25px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ProductCategoryDeal />
                        <ProductDeal />

                        <div style={{ margin: "0" }}>
                            <ItemContainer
                                length={3}
                                title={"PRODUCTS YOU HAVE LOOKED FOR"}
                                gridStyle={{ maxWidth: "100%" }}
                            >
                                <Card
                                    type={"default"}
                                    price={990000}
                                    discount={62}
                                    title={
                                        "Sanity multifunctional bottle warmer"
                                    }
                                    image={BottleWarmer}
                                    link={false}
                                />
                                <Card
                                    type={"default"}
                                    price={990000}
                                    title={"Test product"}
                                    image={BottleWarmer}
                                    link={false}
                                />
                                <Card
                                    type={"default"}
                                    price={990000}
                                    discount={62}
                                    title={
                                        "Sanity multifunctional bottle warmer"
                                    }
                                    image={BottleWarmer}
                                    link={false}
                                />
                            </ItemContainer>
                            <ItemContainer
                                length={productsWithDiscount.length}
                                type={"slider"}
                                seeMore={() => {
                                    setSeeMoreDiscountedProd((val) => val + 10);
                                    setLoadingDisProd(true);
                                    setTimeout(
                                        () => setLoadingDisProd(false),
                                        500
                                    );
                                }}
                                loading={loadingDisProd}
                                timeInMilliSec={
                                    (Math.floor(Math.random() * 10) + 2) *
                                    100000
                                } // 50 seconds
                                todayOnly={true}
                                itemWidth={"170px"}
                            >
                                {renderDiscountedProd()}
                            </ItemContainer>

                            <InterestedProducts />
                            <HotKeyword />
                            {products !== null && (
                                <ItemContainer
                                    length={products.length}
                                    type={"slider"}
                                    title={"All products you might like"}
                                    seeMore={() => {
                                        setSeeMoreProd((val) => val + 10);
                                        setLoadingProd(true);
                                        setTimeout(
                                            () => setLoadingProd(false),
                                            500
                                        );
                                    }}
                                    loading={loadingProd}
                                    itemWidth={"170px"}
                                >
                                    {renderProd()}
                                </ItemContainer>
                            )}
                            {recommendProds ? (
                                <div>
                                    <ItemContainer
                                        length={recommendProds.length}
                                        type={"container"}
                                        title={"Recommended for you"}
                                        seeMore={() => {
                                            setSeeMoreProd((val) => val + 10);
                                            setLoadingProd(true);
                                            setTimeout(
                                                () => setLoadingProd(false),
                                                500
                                            );
                                        }}
                                        loading={loadingProd}
                                        itemWidth={"170px"}
                                    >
                                        {renderRecommendProd()}
                                    </ItemContainer>
                                </div>
                            ) : (
                                <p>no recommend product</p>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
                {/*Item container takes a list of products as an array*/}
            </div>
            {/* <div style={{margin: '0 8%'}}>
                
            </div> */}
        </div>
    );
};

export default HomePage;
