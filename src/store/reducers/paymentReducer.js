import { CHECK_MOMO_PAYMENT, CHECK_VNPAY_PAYMENT } from "../actions/paymentActions";

const initialState = {
    vnpayStatus: null,
    momoStatus: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_VNPAY_PAYMENT:
            return {
                ...state,
                vnpayStatus: action.status,
            };
        case CHECK_MOMO_PAYMENT:
            return {
                ...state,
                momoStatus: action.status,
            };
        default:
            return state;
    }
}

export default paymentReducer;