import {
    GET_ALL_CONFIGS,
    GET_CONFIGS_BY_SHOP_ID,
    GET_CONFIG_BY_ID,
} from "../actions/configActions";

const CLEAR_SHOP_CONFIGS = "CLEAR_SHOP_CONFIGS";

const initialState = {
    configs: null,
    currentConfig: null,
    configsInShop: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CONFIGS:
            return {
                ...state,
                configs: action.configs,
            };
        case GET_CONFIG_BY_ID:
            return {
                ...state,
                currentConfig: action.config,
            };
        case GET_CONFIGS_BY_SHOP_ID:
            return {
                ...state,
                configsInShop: action.configs,
            };
        case CLEAR_SHOP_CONFIGS:
            return {
                ...state,
                configsInShop: null,
            };

        default:
            return state;
    }
}
