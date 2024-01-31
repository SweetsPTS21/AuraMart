import axios from "axios";
import { message } from "antd";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";

const api_url = process.env.REACT_APP_API;

// 🔒 admin
export const getAllUsers = (query) => async (dispatch) => {
    const url = `${api_url}/api/v1/users${query || ""}`;

    await axios
        .get(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error getting all users");
            }
            dispatch({
                type: GET_ALL_USERS,
                users: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error getting all users");
        });
};

// 🔒 admin
export const getUserById = (id) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${id}`;
    await axios
        .get(url)
        .then((res) => {
            if (!res.data.success) {
                return message.error("Error getting user");
            }
            dispatch({
                type: GET_USER_BY_ID,
                user: res.data.data,
            });
        })
        .catch(() => {
            return message.error("Error getting user");
        });
};

// 🔒 admin
export const createNewUser = (user) => async (dispatch) => {
    const url = `${api_url}/api/v1/users`;
    await axios
        .post(url, user)
        .then((res) => {
            if (!res.data.success) {
                if (res.data.error === "Duplicated field value in body") {
                    // username already exists
                    message.destroy();
                    return message.error("Username/Email already exists!");
                }
                message.destroy();
                return message.error("Error creating user");
            }
            dispatch(getAllUsers("?limit=100&sort=-createdAt"));
            message.destroy();
            return message.success("User created successfully");
        })
        .catch(() => {
            message.destroy();
            return message.error("Error creating user");
        });
};

// 🔒 admin
export const updateUserById = (user, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}`;
    await axios
        .put(url, user)
        .then(async (res) => {
            console.log(res);
            if (!res.data.success) {
                message.destroy();
                return message.error("Error updating User");
            }
            await dispatch(getAllUsers("?limit=100&sort=-createdAt"));
            message.destroy();
            message.success("User updated successfully");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.destroy();
            message.error("Error updating User");
        });
};

// 🔒 admin
export const deleteUserById = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}`;
    await axios
        .delete(url)
        .then((res) => {
            if (!res.data.success) {
                message.destroy();
                return message.error("Error deleting user");
            }
            dispatch(getAllUsers("?limit=100&sort=-createdAt"));
            message.destroy();
            message.success("User deleted successfully");
        })
        .catch((err) => {
            console.log("Error" + err);
            message.destroy();
            message.error("Error deleting user");
        });
};
