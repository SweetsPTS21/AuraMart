import {
    GET_ALL_VOUCHERS,
    GET_VOUCHERS_BY_SHOP_ID,
    GET_VOUCHERS_BY_USER_ID,
    GET_VOUCHER_BY_CODE,
    GET_VOUCHER_BY_ID,
} from "../actions/voucherActions";

const initialState = {
    vouchers: null,
    shopVouchers: null,
};

export default function voucherReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VOUCHERS:
            return {
                ...state,
                vouchers: action.vouchers,
            };
        case GET_VOUCHER_BY_ID:
            return {
                ...state,
                userVoucher: action.voucher,
            };
        case GET_VOUCHER_BY_CODE:
            return {
                ...state,
                userVoucher: action.voucher,
            };
        case GET_VOUCHERS_BY_SHOP_ID:
            return {
                ...state,
                shopVouchers: action.vouchers,
            };
        case GET_VOUCHERS_BY_USER_ID:
            return {
                ...state,
                userVouchers: action.vouchers,
            };
        default:
            return state;
    }
}
