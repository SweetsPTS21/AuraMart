import {
    GET_ALL_SHOPS,
    GET_SHOP_BY_ID,
    GET_SHOP_BY_USER_ID,
} from "../actions/shopActions";

const CLEAR_SHOP = "CLEAR_SHOP";

const initialState = {
    shops: null,
    currentShop: {},
    userShop: null,
};

export default function shopReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SHOPS:
            return {
                ...state,
                shops: action.shops,
            };
        case GET_SHOP_BY_ID:
            return {
                ...state,
                currentShop: action.shop,
            };
        case GET_SHOP_BY_USER_ID:
            return {
                ...state,
                userShop: action.shops,
            };
        case CLEAR_SHOP:
            return {
                ...state,
                currentShop: {},
                userShop: null,
            };
        default:
            return state;
    }
}
