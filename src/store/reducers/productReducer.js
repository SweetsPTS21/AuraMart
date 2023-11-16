import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS_BY_SHOP_ID,
    GET_RECOMMEND_PRODUCTS_BY_USER_ID,
} from "../actions/productActions";

const initialState = {
    products: null,
    currentProduct: null,
    productsInShop: null,
    recommendProds: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.products,
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                currentProduct: action.product,
            };
        case GET_PRODUCTS_BY_SHOP_ID:
            return {
                ...state,
                productsInShop: action.products,
            };
        case GET_RECOMMEND_PRODUCTS_BY_USER_ID:
            return {
                ...state,
                recommendProds: action.recommendProds,
            };
        default:
            return state;
    }
}
