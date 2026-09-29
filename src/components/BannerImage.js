import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

// Project banners come in many shapes (16:9, 3:1, square...). Instead of
// cropping, show the whole banner and fill the rest of the frame with a
// blurred, enlarged copy of it, so no logo or text gets cut off.
const BannerImage = ({ image, alt, opacity = 1 }) => (
  <>
    <GatsbyImage
      image={image}
      alt=""
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      imgStyle={{ filter: "blur(24px) saturate(1.1)", transform: "scale(1.2)", opacity: 0.7 * opacity }}
      objectFit="cover"
    />
    <GatsbyImage
      image={image}
      alt={alt}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      imgStyle={{ opacity }}
      objectFit="contain"
    />
  </>
);

export default BannerImage;
