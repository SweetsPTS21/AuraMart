import {GET_ALL_ORDERS, GET_ALL_ORDERS_OF_A_SHOP, GET_MY_ORDERS, GET_SINGLE_ORDER_BY_ID} from "../actions/orderActions";

const CLEAR_SHOP_ORDERS = "CLEAR_SHOP_ORDERS";

const initialState = {
    allOrders: null,
    allShopOrders: null,
    currentOrder: null,
    myOrders: null
};

export default function orderReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ORDERS_OF_A_SHOP:
            return {
                ...state,
                allShopOrders: action.orders
            };
        case GET_SINGLE_ORDER_BY_ID:
            return {
                ...state,
                currentOrder: action.order
            };
        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.orders
            };
        case GET_MY_ORDERS:
            return {
                ...state,
                myOrders: action.orders
            };
        case CLEAR_SHOP_ORDERS:
            return {
                ...state,
                allShopOrders: null
            };
        default:
            return state;
    }
}
