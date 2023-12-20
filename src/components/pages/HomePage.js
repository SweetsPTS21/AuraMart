import React, { useState } from "react";
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../UI/ProductCategoryDeal";
import ProductNavigation from "../UI/ProductNavigation";
import Footer from "../layout/Footer";
import Card from "../UI/Card";
import TopProducts from "../layout/TopProducts";
import TikiInfo from "../UI/TikiInfo";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import InterestedProducts from "../UI/InterestedProducts";
import HotKeyword from "../UI/HotKeyword";
import ItemContainer from "../UI/ItemContainer";
import RecommendProduct from "../layout/RecommendProduct";
import { useDispatch, useSelector } from "react-redux";
import * as errorActions from "../../store/actions/errorActions";
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
    const saleProducts = useSelector((state) => state.products.saleProducts);
    // const [productsWithDiscount, setProductsWithDiscount] = useState([]);
    const [seeMoreDiscountedProd] = useState(10);
    const [loadingDisProd] = useState(false);
    const [seeMoreProd] = useState(20);
    const [loadingProd] = useState(false);

    // const getProductsWithDiscount = async () => {
    //     if (products === null) return;
    //     const filtered = await products.filter(
    //         (product) => product.sale === true
    //     );
    //     setProductsWithDiscount(filtered.shuffle());
    // };
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

    // useEffect(() => {
    //     setTimeout(() => getProductsWithDiscount(), 1000);
    // }, [products]);

    // using dispatch to get user address
    // useEffect(() => {
    //     dispatch(addressActions.getUserAddress(user.id));
    // }, [user.id]);

    const renderDiscountedProd = () => {
        return ( saleProducts &&
            saleProducts.length > 0 &&
            saleProducts.map(
                (prod, index) =>
                    index < seeMoreDiscountedProd && (
                        <Card
                            key={index}
                            type={"deal"}
                            id={prod.product.id}
                            slug={prod.product.slug}
                            price={prod.product.price}
                            discount={prod.product.discount}
                            title={prod.product.name}
                            image={
                                prod.product.photo === "no-photo.jpg"
                                    ? BottleWarmer
                                    : prod.product.photo
                            }
                            sold={Math.floor(Math.random() * 50) + 50}
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
                                    : prod.photo
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
                        <TikiInfo />

                        <div style={{ margin: "0" }}>
                            <TopProducts itemWidth={"170px"} type={"slider"} />
                            <ItemContainer
                                length={10}
                                type={"slider"}
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
                                    length={20}
                                    type={"slider"}
                                    title={"Sản phẩm nổi bật"}
                                    loading={loadingProd}
                                    itemWidth={"170px"}
                                >
                                    {renderProd()}
                                </ItemContainer>
                            )}
                            <RecommendProduct user={user} itemWidth={"170px"} />
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
