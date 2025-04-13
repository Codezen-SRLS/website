import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import hero from "../images/partner.mp4";
import heroLight from "../images/partner-alt.mp4";
import { useTheme } from "../context/ThemeContext";
import RequestForm from "./RequestForm";

const WhoWeAre = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              whoweare {
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
    }
  `);

  const { isDarkMode } = useTheme();
  const heroVideo = isDarkMode ? hero : heroLight;

  const newData = data.allSrcJson.edges[0].node.banner.whoweare;

  const openForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div id="whoweare" className="container">
      <div className="row align-items-center justify-content-between banner">
        <div className="col-xl-3 col-12 whoweare-video">
          <video
            key={isDarkMode ? "dark" : "light"}
            className="w-100 video"
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

        <div className="col-xl-7 col-12 mt-xl-0 mt-5">
          <p className="sub-text text-decoration-underline">
            {newData?.subHeading}{" "}
          </p>
          <h3 className="sub-heading mt-3 mb-0">{newData?.heading} </h3>
          <p className="text banner-text mt-3">{newData?.text}</p>
          <Link to={newData?.buttonLink}>
            <button
              className="btn mt-4"
              style={{ "--width": "165px" }}
              onClick={(e) => {
                e.preventDefault();
                openForm();
              }}
            >
              <span className="text">
                <span className="square"></span>
              </span>
              {newData?.buttonText}
            </button>
          </Link>
        </div>
      </div>
      <RequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default WhoWeAre;
