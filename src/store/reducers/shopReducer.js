import {
    GET_ALL_SHOPS,
    GET_SHOP_BY_ID,
    GET_SHOP_BY_USER_ID,
} from "../actions/shopActions";

const initialState = {
    shops: null,
    currentShop: null,
    userShop: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SHOPS:
            return {
                ...state,
                shops: action.shops,
            };
        case GET_SHOP_BY_ID:
            return {
                ...state,
                currentShop: action.shops,
            };
        case GET_SHOP_BY_USER_ID:
            return {
                ...state,
                userShop: action.shops,
            };
        default:
            return state;
    }
}
