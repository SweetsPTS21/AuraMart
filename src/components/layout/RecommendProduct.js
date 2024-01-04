import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import ItemContainer from "../UI/ItemContainer";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import { getRecommendedProducts } from "../../store/actions/productActions";

const RecommendProduct = (props) => {
    const { user, itemWidth, type, rerender } = props;
    const dispatch = useDispatch();

    const recommendProds = useSelector(
        (state) => state.products.recommendProds
    );
    const [loadingProd] = useState(false);

    useEffect(() => {
        if (user && user.id !== undefined) {
            dispatch(getRecommendedProducts(user.id));
        }
    }, [user]);

    const renderRecommendProd = () => {
        return (
            recommendProds &&
            recommendProds.length > 0 &&
            recommendProds.map(
                (prod) =>
                    prod && (
                        <Card
                            key={prod.id}
                            id={prod.id}
                            type="review"
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
                            rerender={rerender}
                        />
                    )
            )
        );
    };

    return recommendProds ? (
        <div style={{ marginTop: "1.5em", marginBottom: "0.6em" }}>
            <ItemContainer
                length={recommendProds.length}
                type={type}
                title={"Gợi ý cho bạn"}
                loading={loadingProd}
                itemWidth={itemWidth}
            >
                {renderRecommendProd()}
            </ItemContainer>
        </div>
    ) : (
        <div></div>
    );
};

export default RecommendProduct;
