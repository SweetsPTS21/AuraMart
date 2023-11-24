import React from "react";
import DemoCarousel from "./Categories/Carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import banner1 from "../../image/mini_banner1.jpg";
import banner2 from "../../image/mini_banner2.jpg";
import banner3 from "../../image/mini_banner3.jpg";

const HotKeyword = () => {
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
