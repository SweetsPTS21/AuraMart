import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import Card from "../UI/Card";
import {useSelector, useDispatch} from "react-redux";
import ItemContainer from "../UI/ItemContainer";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import { getRecommendedProducts } from "../../store/actions/productActions";



const RecommendProduct = (props) => {
    const { user, itemWidth, type } = props;
    const dispatch = useDispatch();

    const recommendProds = useSelector(
        (state) => state.products.recommendProds
    );
    const [seeMoreProd, setSeeMoreProd] = useState(20);
    const [seeMoreRecommendProd, setSeeMoreRecommendProd] = useState(10);
    const [loadingProd, setLoadingProd] = useState(false);

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
        recommendProds ? (
            <div>
                <ItemContainer
                    length={recommendProds.length}
                    type={type}
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
                    itemWidth={itemWidth}
                >
                    {renderRecommendProd()}
                </ItemContainer>
            </div>
        ) : (
            <p>no recommend product</p>
        )
    )
}

export default RecommendProduct;
