import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import DemoCarousel from "../UI/Categories/Carousel";
import SideBar from "../UI/Categories/SideBar";
import Grid from "@material-ui/core/Grid";
import ItemContainer from "../UI/ItemContainer";
import Card from "../UI/Card";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../layout/Footer";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../store/actions/productActions";

import banner1 from "../../image/banner_search1.jpg";
import banner2 from "../../image/banner_search2.jpg";
import banner3 from "../../image/banner_search3.jpg";

if (!String.prototype.contains) {
    String.prototype.contains = function (s) {
        return this.indexOf(s) > -1;
    };
}

const items = [
    {
        name: "danh mục sản phẩm",
        label: "Theo danh mục",
        items: [
            { name: "beauty", label: "Làm đẹp" },
            { name: "family", label: "Gia đình" },
            { name: "electronic", label: "Điện tử" },
            { name: "momandbaby", label: "Mẹ và bé" },
            { name: "sport", label: "Thể thao" },
            { name: "assesories", label: "Phụ kiện & trang sức" },
        ],
    },
];

const brand = [
    { name: "apple", label: "Apple" },
    { name: "unilever", label: "Unilever" },
    { name: "bitis", label: "Bitis" },
    { name: "cocolux", label: "Cocolux" },
    { name: "lamia365", label: "Lamia365" },
    { name: "logitech", label: "Logitech Official" },
];

const address = [
    { name: "hcm", label: "Hồ Chí Minh" },
    { name: "hn", label: "Hà Nội" },
    { name: "dn", label: "Đà Nẵng" },
    { name: "hp", label: "Hải Phòng" },
    { name: "ct", label: "Cần Thơ" },
    { name: "bd", label: "Bình Dương" },
];

const ProductCategoryPage = (props) => {
    const { type } = useParams();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    const banner = [banner1, banner2, banner3];

    useEffect(() => {
        if (products.length === 25) {
            dispatch(getAllProducts("?limit=80"));
        }
    }, []);

    const handleSearch = async (returnResult = false) => {
        // setFilteredProducts(
        const filtered = await products.filter((product) => {
            if (product.name === type) return true; // product name matches search

            let isMatchesWord = false;
            type.split(" ").forEach((word) => {
                // if product name matches a word in search
                if (product.name.contains(word)) {
                    isMatchesWord = true;
                }
            });
            if (isMatchesWord) return true;

            // category
            product.category.map((category) => {
                // if search is based on category
                if (type.contains(category)) isMatchesWord = true;
            });
            if (isMatchesWord) return true;

            // description
            if (type.split(" ").length > 1) {
                // if type is two words or more
                if (product.description.contains(type)) return true;
            }

            // branch
            if (product.branch.contains(type)) return true;

            return isMatchesWord; // if all other conditions where not met
        });

        // )
        await setFilteredProducts(filtered);
        if (returnResult) return filtered;
    };

    if (firstLoad && products !== null && type !== null && type.length > 0) {
        setTimeout(handleSearch, 1000);
        setFirstLoad(false);
    }
    useEffect(() => {
        if (
            !firstLoad &&
            products !== null &&
            type !== null &&
            type.length > 0
        ) {
            handleSearch();
        }
    }, [type]);

    const handleFilter = async (isComplexSearch, filterType, min, max) => {
        const filteredProducts_ = await handleSearch(true);
        switch (isComplexSearch) {
            case "both":
                let filtered = await handleRatingFilter(
                    filterType,
                    filteredProducts_
                );
                filtered = await handlePriceFilter(min, max, filtered);
                setFilteredProducts(filtered);
                return;
            case "rating":
                let filtered_ = await handleRatingFilter(
                    filterType,
                    filteredProducts_
                );
                setFilteredProducts(filtered_);
                return;

            case "price":
                let filtered__ = await handlePriceFilter(
                    min,
                    max,
                    filteredProducts_
                );
                setFilteredProducts(filtered__);
                return;
        }
    };

    const handleRatingFilter = async (filterType, filteredProducts_) => {
        switch (filterType.toString()) {
            case "5":
                const filtered = await filteredProducts_.filter(
                    (product) =>
                        product.averageRating !== undefined &&
                        product.averageRating >= 5
                );
                setFilteredProducts(filtered);
                return filtered;
            case "4":
                const filtered_ = await filteredProducts_.filter(
                    (product) =>
                        product.averageRating !== undefined &&
                        product.averageRating >= 4
                );
                setFilteredProducts(filtered_);
                return filtered_;
            case "3":
                const filtered__ = await filteredProducts_.filter(
                    (product) =>
                        product.averageRating !== undefined &&
                        product.averageRating >= 3
                );
                return filtered__;
            default:
                return await handleSearch(true);
        }
    };
    const handlePriceFilter = async (min, max, filteredProducts_) => {
        let min_ = min == null || isNaN(min) ? 0 : parseInt(min);
        let max_ = max == null || isNaN(max) ? Infinity : parseInt(max);
        const filtered = await filteredProducts_.filter(
            (product) => product.price >= min_ && product.price <= max_
        );
        return filtered;
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#F4F4F4",
            }}
        >
            <NavBar {...props} />
            <div style={{ padding: "2% 10%" }}>
                <Grid
                    container
                    style={{
                        padding: "0.5em",
                        // boxShadow:
                        //     "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Grid
                        item
                        xs={3}
                        style={{ borderRadius: "0.5em", paddingRight: "1em" }}
                    >
                        <SideBar
                            items={items}
                            item={brand}
                            item2={address}
                            handleFilter={handleFilter}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "0.5em",
                        }}
                    >
                        <div style={{ fontSize: "1.3em", margin: "1em" }}>
                            <span style={{ fontWeight: 600 }}>
                                Search results for{" "}
                                <span style={{ fontWeight: 400, color: "grey" }}>
                                    '{type}'
                                </span>
                            </span>
                            <span style={{ color: "grey", float: "right", fontSize: "0.6em" }}>
                                {props.results ? props.results : 0} results
                            </span>
                        </div>
                        <DemoCarousel
                            {...props}
                            results={
                                filteredProducts !== null
                                    ? filteredProducts.length
                                    : 0
                            }
                            banner={banner}
                            style={{marginBottom: "2em", padding: "1em"}}
                        />
                        {filteredProducts !== null &&
                        filteredProducts.length > 0 ? (
                            <ItemContainer
                                title={""}
                                type={"container"}
                                gridStyle={{
                                    boxShadow:
                                        "0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    borderRadius: 0,
                                }}
                                itemWidth={"180px"}
                            >
                                {filteredProducts !== null &&
                                    filteredProducts.map((prod, index) => (
                                        <Card
                                            key={prod.id}
                                            id={prod.id}
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
                                                    ? BottleWarmer
                                                    : prod.photo
                                            }
                                            rating={prod.averageRating}
                                            link={true}
                                            slug={prod.slug}
                                            style={{
                                                width: "180px",
                                                height: "330px",
                                            }}
                                        />
                                    ))}
                            </ItemContainer>
                        ) : (
                            <section
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    width: "100%",
                                    height: "20%",
                                }}
                            >
                                <p
                                    style={{
                                        padding: "10% auto",
                                        fontSize: "3em",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        marginTop: "2em",
                                        color: "rgba(149, 149, 149, 1)",
                                    }}
                                >
                                    {"No products found :(("}
                                </p>
                            </section>
                        )}
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default ProductCategoryPage;
