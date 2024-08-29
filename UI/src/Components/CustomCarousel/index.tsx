import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "40vh",
  width: "fitContent",
  color: "#fff",
  lineHeight: "100%",
  textAlign: "center",
  background: "#364d79",
};

interface CustomCarouselProps {
  imgSrc: string[];
}

const CustomCarousel = (props: CustomCarouselProps) => {
  return (
    <>
      <Carousel
        // arrows
        infinite={true}
        fade={true}
        autoplay
        draggable
        pauseOnHover
      >
        {props.imgSrc.map((value) => (
          <div>
            <img key={value} style={contentStyle} src={value} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CustomCarousel;
