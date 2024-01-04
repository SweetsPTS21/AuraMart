import {
    GET_RECOMMENDER_LOGS,
    GET_SYSTEM_BANNERS,
} from "../actions/settingActions";

const initialState = {
    logs: null,
};

export default function settingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECOMMENDER_LOGS:
            return {
                ...state,
                logs: action.logs,
            };
        case GET_SYSTEM_BANNERS:
            return {
                ...state,
                banners: action.banners,
            };
        default:
            return {
                ...state,
            };
    }
}
