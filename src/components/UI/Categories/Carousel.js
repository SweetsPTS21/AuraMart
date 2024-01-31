import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";

const DemoCarousel = (props) => {
    const { banner, style } = props;

    return (
        <div style={style}>
            <Carousel dynamicHeight showThumbs={false}>
                {banner?.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={"banner" + index} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

DemoCarousel.propTypes = {
    banner: PropTypes.array,
    style: PropTypes.object,
};

export default DemoCarousel;
