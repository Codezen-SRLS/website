import React, { useEffect, useRef } from "react";
import heroDark from "../images/hero.mp4";
import heroLight from "../images/hero-alt.mp4";
import { useTheme } from "../context/ThemeContext";

import { useStaticQuery, graphql, Link } from "gatsby";

const Banner = () => {
  const { isDarkMode } = useTheme();
  const heroVideo = isDarkMode ? heroDark : heroLight;

  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              subHeading
              buttonLink
              buttonText
              heading
              text
            }
          }
        }
      }
    }
  `);

  const newData = data.allSrcJson.edges[0].node.banner;

  return (
    <div className="container">
      <div className="row align-items-center banner">
        <div className="col-xl-7 col-12">
          <p className="sub-text text-decoration-underline">
            {newData?.subHeading}
          </p>
          <h1 className="main-heading mt-3 mb-0">{newData?.heading} </h1>
          <p className="text banner-text mt-3">{newData?.text}</p>
          <Link to={newData?.buttonLink}>
            <button className="btn mt-4">
              <span className="text">
                <span className="square"></span>
              </span>
              {newData?.buttonText}
            </button>
          </Link>
        </div>
        <div className="col-xl-3 col-12 mt-xl-0 mt-5">
          <video
            className="w-100 videos-banner"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            controlsList="nodownload"
            loading="lazy"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Banner;
