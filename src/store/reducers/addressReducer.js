import {
    GET_ALL_ADDRESS,
    GET_SINGLE_ADDRESS_BY_ID,
    GET_USER_ADDRESS,
} from "../actions/addressActions";

const initialState = {
    address: null,
    currentAddress: null,
    defaultAddress: null,
    userAddress: null,
};

export default function addressReducer (state = initialState, action) {
    let st_ =  {};
    let defaultAddress = null;

    switch (action.type) {
        case GET_ALL_ADDRESS:
            return {
                ...state,
                address: action.address,
            };
        case GET_USER_ADDRESS:
            defaultAddress = action.address.filter(
                (address) => address.default === true
            )[0];
            st_ = {
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
