import React from "react";
import { IImage } from "../../../Helpers/interfaces";
// @ts-ignore
import defaultVacationImage from "../../../Assets/Images/white-background-img.jpg";

ImageComponent.defaultProps = {
  defaultImage: defaultVacationImage,
  height: 100,
  width: 100,
};

export function ImageComponent(props: IImage) {
  const { src, alt } = props;
  const { defaultImage } = ImageComponent.defaultProps;

  return (
    <>
      <img
        src={src ? src : defaultImage}
        alt={alt}
        height={props.height}
        width={props.width}
      />
    </>
  );
}
