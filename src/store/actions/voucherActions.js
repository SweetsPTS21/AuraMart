import axios from "axios";
import { message } from "antd";

const api_url = process.env.REACT_APP_API;

export const GET_ALL_VOUCHERS = "GET_ALL_VOUCHERS";
export const GET_VOUCHER_BY_ID = "GET_VOUCHER_BY_ID";
export const GET_VOUCHERS_BY_SHOP_ID = "GET_VOUCHERS_BY_SHOP_ID";
export const GET_VOUCHERS_BY_USER_ID = "GET_VOUCHERS_BY_USER_ID";
export const GET_VOUCHER_BY_CODE = "GET_VOUCHER_BY_CODE";

// 🔓

export const getAllVouchers = () => async (dispatch) => {
    const url = `${api_url}/api/v1/vouchers`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_VOUCHERS,
                vouchers: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error getting vouchers");
        });
};

// 🔓

export const getVoucherById = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/vouchers/${id}`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_VOUCHER_BY_ID,
                voucher: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error getting voucher");
        });
};

// 🔓
export const getVoucherByCode = (code, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/vouchers/q?code=${code}`;
    await axios
        .get(url)
        .then((res) => {
            if (res.data.success) {
                dispatch({
                    type: GET_VOUCHER_BY_CODE,
                    voucher: res.data.data,
                });
                // If success save voucher to user
                if (userId) {
                    dispatch(addUserVoucherByUserId(userId, res.data.data._id));
                }
                
                message.success("Success");
            } else {
                message.error(res.data.error);
            }
        })
        .catch(() => {
            message.error("Error getting voucher");
        });
};

export const checkVoucherStatus = (userId, id) => async () => {
    const url = `${api_url}/api/v1/users/${userId}/vouchers/${id}`;
    await axios
        .get(url)
        .then((res) => {
            if (res.data.success) {
                return res.data.count > 0;
            }
            return false;
        })
        .catch(() => {
            message.error("Error getting voucher");
        });
};

// 🔒

export const getVouchersByShopId = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${id}/vouchers`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_VOUCHERS_BY_SHOP_ID,
                vouchers: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error getting vouchers");
        });
};

export const getVouchersByUserId = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${id}/vouchers`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_VOUCHERS_BY_USER_ID,
                vouchers: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error getting vouchers");
        });
};

export const addUserVoucherByUserId = (id, voucherId) => async () => {
    const url = `${api_url}/api/v1/users/${id}/vouchers/${voucherId}`;
    await axios
        .post(url)
        .then((res) => {
            if (res.data.success) {
                message.success("Added voucher");
            } else {
                message.error(res.data.error);
            }
        })
        .catch(() => {
            message.error("Error adding voucher");
        });
};

// 🔒

export const createNewVoucher = (voucher, id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${id}/vouchers`;
    await axios
        .post(url, voucher)
        .then((res) => {
            if (res.data.success) {
                message.success("Created voucher");
            } else {
                message.error(res.data.error);
            }
            dispatch(getVouchersByShopId(id));
        })
        .catch(() => {
            message.error("Error creating voucher");
        });
};

// 🔒

export const updateVoucher = (voucher, id) => async (dispatch) => {
    const url = `${api_url}/api/v1/vouchers/${id}`;
    await axios
        .put(url, voucher)
        .then((res) => {
            if (res.data.success) {
                message.success("Voucher updated");
            } else {
                message.error(res.data.error);
            }
            dispatch(getVouchersByShopId(id));
        })
        .catch(() => {
            message.error("Error updating voucher");
        });
};

// 🔒

export const deleteVoucher = (shopId, id) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/vouchers/${id}`;
    await axios
        .delete(url)
        .then((res) => {
            if (res.data.success) {
                message.success("Deleted voucher");
            } else {
                message.error(res.data.error);     
            }
            dispatch(getVouchersByShopId(shopId));
        })
        .catch(() => {
            message.error("Error deleting voucher");
        });
};
