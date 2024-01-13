import axios from "axios";
import { message } from "antd";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_MY_ORDERS = "GET_MY_ORDERS";
export const GET_ALL_ORDERS_OF_A_SHOP = "GET_ALL_ORDERS_OF_A_SHOP";
export const GET_SINGLE_ORDER_BY_ID = "GET_SINGLE_ORDER_BY_ID";

const api_url = process.env.REACT_APP_API;

// 🔒 admin
export const getAllOrders = () => async (dispatch) => {
    const url = `${api_url}/api/v1/orders`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_ORDERS, //this call test dispatch. to dispsatch to our reducer
                orders: res.data.data,
            });

            // message.success("Got all orders");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting orders");
        });
};

// 🔓
export const getAllOrdersOfAShop = (shopId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/orders`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_ORDERS_OF_A_SHOP, //this call test dispatch. to dispsatch to our reducer
                orders: res.data.data,
            });
            // message.success("Got orders");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting orders");
        });
};

// 🔓
export const getOrderById = (orderId) => async (dispatch) => {
    const url = `${api_url}/api/v1/orders/${orderId}`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_SINGLE_ORDER_BY_ID, //this call test dispatch. to dispsatch to our reducer
                order: res.data.data,
            });

            // message.success("Got order");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting order");
        });
};

// 🔓
export const getOrdersByUserId = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}/orders`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_MY_ORDERS, //this call test dispatch. to dispsatch to our reducer
                orders: res.data.data,
            });

            // message.success("Got orders");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting orders");
        });
};

// 🔒
export const addNewOrder = (order, total, payment) => async (dispatch) => {
    const url = `${api_url}/api/v1/orders/checkout`;

    await axios
        .post(url, order)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error making order");
            }
            dispatch(getAllOrders());
            order.id = res.data?.data[0]?.id;
            // message.info(order.id);
        })
        .catch((err) => {
            console.log("Error" + err);
            return message.error("Error making order");
        });

    // Redirect to payment gateway
    if (payment === "COD") {
        console.log(order);
    }
    if (payment === "MOMO") {
        const url = `${api_url}/api/v1/payment/momo/create`;
        const data = {
            amount: total,
            order: order.id,
            orderInfo: `Thanh toan cho don hang ${order.id}`,
        };
        try {
            const response = await axios.post(url, data);
            console.log(response);
            if (response.data.code === "00" || response.data.code === 0) {
                const redirectUrl = response.data.data;
                window.location.href = redirectUrl;
            } else {
                message.error("Error making order");
            }
        } catch (err) {
            console.log("Error", err);
            message.error("Error making order");
        }
    }

    if (payment === "VNPAY") {
        const url = `${api_url}/api/v1/payment/vnpay/create`;

        const data = {
            amount: total,
            bankCode: "",
            orderDescription: `Thanh toan cho don hang ${order.id}`,
            orderType: "other",
            language: "vn",
            orderId: order.id,
        };

        try {
            const response = await axios.post(url, data);
            console.log(response);
            if (response?.data?.code === "00") {
                const redirectUrl = response?.data?.data;
                window.location.href = redirectUrl;
            } else {
                message.error("Error making order");
            }
        } catch (err) {
            console.log("Error", err);
            message.error("Error making order");
        }
    }
};

export const cancelOrder = (orderId, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/orders/${orderId}/cancel`;
    await axios
        .put(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error cancelling order");
            }
            dispatch(getOrdersByUserId(userId));
            message.success("Cancelled order");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error cancelling order");
        });
};

export const confirmReceivedOrder = (orderId, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/orders/${orderId}/confirm`;
    await axios
        .put(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error confirming order");
            }
            dispatch(getOrdersByUserId(userId));
            message.success("Confirmed order");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error confirming order");
        });
};

// 🔒
export const updateOrderById = (order, orderId) => async (dispatch) => {
    const url = `${api_url}/api/v1/orders/${orderId}`;
    await axios
        .put(url, order)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error updating order");
            }
            dispatch(getAllOrdersOfAShop(order.shop));
            message.success("Updated order");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error updating order");
        });
};

// 🔒
export const deleteOrderById = (orderId) => async () => {
    const url = `${api_url}/api/v1/orders/${orderId}`;
    await axios
        .delete(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error deleting order");
            }
            // dispatch(getAllOrdersOfAShop(order.shop));
            message.success("Deleted order");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error deleting order");
        });
};
