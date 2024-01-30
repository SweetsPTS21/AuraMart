import axios from "axios";
import { message } from "antd";

export const CHECK_VNPAY_PAYMENT = "CHECK_VNPAY_PAYMENT";
export const CHECK_MOMO_PAYMENT = "CHECK_MOMO_PAYMENT";

const api_url = process.env.REACT_APP_API;

export const checkVnpayPayment = (query) => async (dispatch) => {
    const url = `${api_url}/api/v1/payment/vnpay/vnpay_ipn?` + query;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: CHECK_VNPAY_PAYMENT, 
                status: res.data,
            });
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting orders");
        });
};

export const checkMomoPayment = (query) => async (dispatch) => {
    const url = `${api_url}/api/v1/payment/momo/momo_ipn?` + query;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: CHECK_MOMO_PAYMENT, 
                status: res.data,
            });
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting orders");
        });
};
