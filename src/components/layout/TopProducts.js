import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import ItemContainer from "../UI/ItemContainer";
import NoPhoto from "../../image/nophoto.png";

import * as statsActions from "../../store/actions/statsActions";
import PropTypes from "prop-types";

const TopProducts = (props) => {
    const { itemWidth, type, rerender } = props;
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products.products);
    const topProducts = useSelector((state) => state.stats.topProducts);

    useEffect(() => {
        dispatch(statsActions.getTopSoldProducts());
    }, []);

    const getProductDetails = (id) =>
        allProducts &&
        allProducts.length > 0 &&
        allProducts.find((prod) => prod._id === id);

    const renderTopProducts = () => {
        return (
            topProducts &&
            topProducts.length > 0 &&
            topProducts.map((product) => {
                let prod = getProductDetails(product._id);
                return prod ? (
                    <Card
                        key={prod.id}
                        id={prod.id}
                        slug={prod.slug}
                        type={"review"}
                        price={prod.price}
                        discount={prod.discount}
                        title={prod.name}
                        image={
                            prod.photo === "no-photo.jpg" ? NoPhoto : prod.photo
                        }
                        rating={prod.averageRating}
                        link={true}
                        count={product.count}
                        rerender={rerender}
                        style={{ width: "170px" }}
                    />
                ) : null;
            })
        );
    };
    return topProducts ? (
        <div style={{ marginBottom: "0.6em" }}>
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

TopProducts.propTypes = {
    itemWidth: PropTypes.string,
    type: PropTypes.string,
    rerender: PropTypes.func,
};

export default TopProducts;
