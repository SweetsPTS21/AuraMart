import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_BY_SHOP_ID,
    GET_PRODUCT_BY_ID,
    GET_RECOMMEND_PRODUCTS_BY_USER_ID,
    GET_SALE_PRODUCTS,
} from "../actions/productActions";

const initialState = {
    products: null,
    currentProduct: null,
    productsInShop: [],
    recommendProds: null,
    saleProducts: null,
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.products,
            };
        case GET_SALE_PRODUCTS:
            return {
                ...state,
                saleProducts: action.products,
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
