import axios from "axios";
import { message } from "antd";
export const GET_RECOMMENDER_LOGS = "GET_RECOMMENDER_LOGS";

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
