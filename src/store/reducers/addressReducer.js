import {
    GET_USER_ADDRESS,
    GET_ALL_ADDRESS,
    GET_SINGLE_ADDRESS_BY_ID,
} from "../actions/addressActions";

const initialState = {
    address: null,
    currentAddress: null,
    defaultAddress: null,
    userAddress: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ADDRESS:
            return {
                ...state,
                address: action.address,
            };
        case GET_USER_ADDRESS:
            const defaultAddress = action.address.filter(
                (address) => address.default === true
            )[0];
            let st_ = {
                ...state,
                userAddress: action.address,
                defaultAddress: defaultAddress,
            };
            sessionStorage.setItem("address", JSON.stringify(st_));
            return st_;
        case GET_SINGLE_ADDRESS_BY_ID:
            return {
                ...state,
                currentAddress: action.address,
            };
        default:
            return state;
    }
}
