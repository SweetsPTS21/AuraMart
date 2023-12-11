import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import ItemContainer from "../UI/ItemContainer";
import NoPhoto from "../../image/nophoto.png";

import * as statsActions from "../../store/actions/statsActions";

const TopProducts = (props) => {
    const { itemWidth, type } = props;
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.products);
    const topProducts = useSelector((state) => state.stats.topProducts);

    useEffect(() => {
        dispatch(statsActions.getTopSoldProducts());
    }, []);

    const getProductDetails = (id) =>
        allProducts.find((prod) => prod._id === id);

    const renderTopProducts = () => {
        return (
            topProducts &&
            topProducts.length > 0 &&
            topProducts.map((product) => {
                let prod = getProductDetails(product._id);
                return (
                    <Card
                        style={{
                            width: itemWidth,
                            backgroundColor: "#fff",
                            marginRight: "0.5em",
                        }}
                        key={prod ? prod.id : ""}
                        id={prod ? prod.id : ""}
                        slug={prod ? prod.slug : ""}
                        type={"review"}
                        price={prod.price}
                        discount={
                            prod ? prod.discount : 0
                        }
                        title={prod.name}
                        image={
                            prod.photo === "no-photo.jpg" ? NoPhoto : prod.photo
                        }
                        rating={prod.averageRating}
                        link={true}
                        count={product.count}
                    />
                );
            })
        );
    };
    return topProducts ? (
        <div style={{ marginTop: "1.5em", marginBottom: "0.6em" }}>
            <ItemContainer
                length={topProducts.length}
                type={type}
                title={"Sản phẩm bán chạy nhất"}
                itemWidth={itemWidth}
            >
                {renderTopProducts()}
            </ItemContainer>
        </div>
    ) : (
        <p>No items</p>
    );
};

export default TopProducts;
