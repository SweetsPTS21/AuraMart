// LoadingSpinner.js
import React from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
    loadingSpinner: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
});

const LoadingSpinner = ({ props }) => {
    const classes = useStyle();
    return (
        <div className="loading-spinner">
            <ReactLoading
                {...props}
                height={80}
                width={80}
                type={"spinningBubbles"}
                color={"#189EFF"}
                className={classes.loadingSpinner}
            />
        </div>
    );
};

export default LoadingSpinner;
