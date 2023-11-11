import {
    GET_SINGLE_STOCK_BY_ID,
    GET_ALL_STOCKS_OF_A_SHOP,
    GET_ALL_STOCKS,
    GET_MY_STOCKS,
} from "../actions/stockActions";

const initialState = {
    allStocks: null,
    allShopStocks: null,
    currentStock: null,
    myStocks: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STOCKS_OF_A_SHOP:
            return {
                ...state,
                allShopStocks: action.stocks,
            };
        case GET_SINGLE_STOCK_BY_ID:
            return {
                ...state,
                currentStock: action.order,
            };
        case GET_ALL_STOCKS:
            return {
                ...state,
                allStocks: action.stocks,
            };
        case GET_MY_STOCKS:
            return {
                ...state,
                myStocks: action.stocks,
            };

        default:
            return state;
    }
}
