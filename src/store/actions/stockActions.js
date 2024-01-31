import axios from "axios";
import { message } from "antd";
export const GET_ALL_STOCKS = "GET_ALL_STOCKS";
export const GET_MY_STOCKS = "GET_MY_STOCKS";
export const GET_ALL_STOCKS_OF_A_SHOP = "GET_ALL_STOCKS_OF_A_SHOP";
export const GET_SINGLE_STOCK_BY_ID = "GET_SINGLE_STOCK_BY_ID";

const api_url = process.env.REACT_APP_API;

// 🔒 admin
export const getAllStocks = () => async (dispatch) => {
    const url = `${api_url}/api/v1/stocks`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_STOCKS, 
                stocks: res.data.data,
            });

        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting stocks");
        });
};

// 🔓
export const getAllStocksOfAShop = (shopId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/stocks`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_ALL_STOCKS_OF_A_SHOP, 
                stocks: res.data.data,
            });
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting stocks");
        });
};

// 🔓
export const getStockById = (stockId) => async (dispatch) => {
    const url = `${api_url}/api/v1/stocks/${stockId}`;
    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_SINGLE_STOCK_BY_ID, 
                stock: res.data.data,
            });

        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting stock");
        });
};

// 🔓
export const getStocksByUserId = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/stocks`;
    await axios
        .get(url)
        .then((res) => {
            const myStocks = res.data.data.filter(
                (stock) => stock.user === userId
            );
            dispatch({
                type: GET_MY_STOCKS, 
                stocks: myStocks,
            });
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error getting stocks");
        });
};

// 🔒
export const addNewStock = (shopId, stock) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/stocks`;
    await axios
        .post(url, stock)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error making stock");
            }
            dispatch(getAllStocksOfAShop(shopId));
            message.success("Stock added!");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error making stock");
        });
};

// 🔒
export const updateStockById = (shopId, stock, stockId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/stocks/${stockId}`;
    await axios
        .put(url, stock)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error updating stock");
            }
            dispatch(getAllStocksOfAShop(shopId));
            message.success("Updated stock");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error updating stock");
        });
};

// 🔒
export const deleteStockById = (shopId, stockId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/stocks/${stockId}`;
    await axios
        .delete(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error deleting stock");
            }
            dispatch(getAllStocksOfAShop(shopId));
            message.success("Deleted stock");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.error("Error deleting stock");
        });
};
