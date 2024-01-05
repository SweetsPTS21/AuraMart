import axios from "axios";
import { message } from "antd";
export const GET_RECOMMENDER_LOGS = "GET_RECOMMENDER_LOGS";
export const GET_SYSTEM_BANNERS = "GET_SYSTEM_BANNERS";

const api_url = process.env.REACT_APP_API;

export const updateRecommenderSystem = () => async () => {
    const url = `${api_url}/api/v1/recommend/build`;

    await axios
        .post(url)
        .then(() => {
            message.success("Build recommender system successfully");
        })
        .catch(() => {
            message.error("Error build recommender system");
        });
};

export const getRecommenderLogs = () => async (dispatch) => {
    const url = `${api_url}/api/v1/settings/logs`;

    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_RECOMMENDER_LOGS,
                logs: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error get recommender logs");
        });
};

export const setSystemBanners = (banners) => async () => {
    const url = `${api_url}/api/v1/settings/banners`;

    await axios
        .post(url, banners)
        .then(() => {
            message.success("Cập nhật banner thành công");
        })
        .catch(() => {
            message.error("Có lỗi xảy ra khi cập nhật banner");
        });
};

export const getSystemBanners = () => async (dispatch) => {
    const url = `${api_url}/api/v1/settings/banners`;

    await axios
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_SYSTEM_BANNERS,
                banners: res.data.data,
            });
        })
        .catch(() => {
            message.error("Error get system banners");
        });
};
