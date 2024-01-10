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
        <div
            className="loading-animation"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgb(0 0 0 / 32%)", // Transparent white background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "0.5em",
                zIndex: 9999,
            }}
        >
            <ReactLoading
                {...props}
                height={80}
                width={80}
                type={"spinningBubbles"}
                color={"#189EFF"}
                className={classes.loadingSpinner}
            />                     
        </div>
    )

};

export default LoadingSpinner;
