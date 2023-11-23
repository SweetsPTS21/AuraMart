import React from "react";
import DemoCarousel from "./Categories/Carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import banner1 from "../../image/mini_banner1.jpg";
import banner2 from "../../image/mini_banner2.jpg";
import banner3 from "../../image/mini_banner3.jpg";


import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const userStyles = makeStyles(() => ({
    // "@global .BrainhubCarousel": {marginLeft: '2em', marginRight: '2em', marginTop: '3em'},
    "@global .BrainhubCarousel__arrows": {
        backgroundColor: "rgba(219, 219, 219, 0.6 )",
        borderRadius: "50%",
    },
    "@global .BrainhubCarousel__arrows:focus": {
        outline: "none",
    },
    "@global .BrainhubCarousel__arrows:hover:enabled": {
        backgroundColor: "rgba(219, 219, 219, 0.6 )",
        borderRadius: "50%",
    },
    "@global .BrainhubCarousel__arrows span": {
        borderColor: "rgba(255, 255, 255, 0.6) !important",
    },
    "@global .BrainhubCarousel__arrows:hover span": {
        borderColor: "rgba(255, 255, 255, 1) !important",
    },
    image: {
        padding: "1.25em",
        textAlign: "center",
        borderRadius: "5px",
        width: "30vw",
        "&:hover": {
            boxShadow:
                "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
            cursor: "pointer",
        },
    },
    removeLinkStyle: {
        textDecoration: "none !important",
        color: "white !important",
    },
}));

const HotKeyword = (props) => {
    const banner = [banner1, banner2, banner3];
    
    return (
        <div
            style={{  margin: "2em 0"}}
        >
            <DemoCarousel  banner={banner} style={{borderRadius: "0.5em"}}/>
        </div>
    );
};

export default HotKeyword;
