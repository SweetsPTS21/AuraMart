import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const DemoCarousel = (props) => {
    const { banner, style } = props;

    return (
        <div style={style}>
            <Carousel dynamicHeight showThumbs={false}>
                {banner && banner.map((item, index) => (
                    <div>
                        <img src={item} alt={"banner" + index} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default DemoCarousel;
