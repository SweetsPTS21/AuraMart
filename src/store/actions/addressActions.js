import axios from "axios";
import { message } from "antd";
export const GET_ALL_ADDRESS = "GET_ALL_ADDRESS";
export const GET_USER_ADDRESS = "GET_USER_ADDRESS";
export const GET_ALL_USER_ADDRESS = "GET_ALL_ADDRESS";
export const GET_SINGLE_ADDRESS_BY_ID = "GET_SINGLE_ADDRESS_BY_ID";

const api_url = process.env.REACT_APP_API;

// 🔓
export const getAllAddress = () => async (dispatch) => {
    const url = `${api_url}/api/v1/address`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_ADDRESS, //this call test dispatch. to dispsatch to our reducer
                address: res.data.data,
            });
            // message.success("Got reviews");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting address");
        });
};

export const getUserAddress = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}/address`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_USER_ADDRESS, //this call test dispatch. to dispsatch to our reducer
                address: res.data.data,
            });

            // message.success("Got reviews");
        })
        .catch((err) => {
            message.error("Error getting user address");
        });
};

// 🔒
export const getAddressById = (addressId) => async (dispatch) => {
    const url = `${api_url}/api/v1/address/${addressId}`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_SINGLE_ADDRESS_BY_ID, //this call test dispatch. to dispsatch to our reducer
                address: res.data.data,
            });

            // message.success("Got review");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting review");
        });
};

// 🔒
export const addNewAddress = (address, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}/address`;

    await axios
        .post(url, address)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error adding address");
            }
            dispatch(getUserAddress(userId));
            // message.success("Got review");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error adding address");
        });
};

// 🔒
export const updateAddressById =
    (address, addressId, userId) => async (dispatch) => {
        const url = `${api_url}/api/v1/address/${addressId}`;

        await axios
            .put(url, address)
            .then((res) => {
                // axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
                if (!res.data.success) {
                    return message.error("Error updating address");
                }
                if (userId !== undefined) {
                    dispatch(getUserAddress(userId));
                }
                message.success("Updated address");
            })
            .catch((err) => {
                // axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
                console.log("Error" + err);
                message.error("Error updating review");
            });
    };

// 🔒
export const deleteAddressById = (addressId, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/address/${addressId}`;
    await axios
        .delete(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error deleting address");
            }
            if (userId !== undefined) {
                dispatch(getUserAddress(userId));
            }
            message.success("Deleted review");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error deleting review");
        });
};
