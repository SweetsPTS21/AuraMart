import axios from "axios";
import { message } from "antd";

const api_url = process.env.REACT_APP_API;

export const GET_ALL_CONFIGS = "GET_ALL_CONFIGS";
export const GET_CONFIG_BY_ID = "GET_CONFIG_BY_ID";
export const GET_CONFIGS_BY_SHOP_ID = "GET_CONFIGS_BY_SHOP_ID";

// 🔓
export const getAllConfigs = () => async (dispatch) => {
    const url = `${api_url}/api/v1/configs`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_CONFIGS, //this call test dispatch. to dispsatch to our reducer
                configs: res.data.data,
            });
            // message.success("Got configs");
        })
        .catch(() => {
            message.error("Error getting configs");
        });
};

// 🔓
export const getConfigById = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/configs/${id}`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_CONFIG_BY_ID, //this call test dispatch. to dispsatch to our reducer
                config: res.data.data,
            });

            // message.success("Got config");
        })
        .catch(() => {
            message.error("Error getting config");
        });
};

// 🔒
export const getConfigsByShopId = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${id}/configs`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_CONFIGS_BY_SHOP_ID, //this call test dispatch. to dispsatch to our reducer
                configs: res.data.data,
            });

            // message.success("Got configs");
        })
        .catch(() => {
            message.error("Error getting configs");
        });
};

// 🔒
export const createNewConfig = (config, id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${id}/configs`;
    await axios
        .post(url, config)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error creating config");
            }
            dispatch(getConfigsByShopId(id));
            message.success("config created successfully");
        })
        .catch(() => {
            message.error("Error creating config");
        });
};

// 🔒
export const updateConfigById = (shopId, config, id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/configs/${id}`;
    await axios
        .put(url, config)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error updating config");
            }
            dispatch(getConfigsByShopId(id));
            message.success("config updated successfully");
        })
        .catch(() => {
            message.error("Error updating config");
        });
};
