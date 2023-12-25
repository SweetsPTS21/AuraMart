import { GET_RECOMMENDER_LOGS } from "../actions/settingActions"

const initialState = {
    logs: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECOMMENDER_LOGS:
            return {
                ...state,
                logs: action.logs,
            }
        default:
            return {
                ...state,
            }
    }
}