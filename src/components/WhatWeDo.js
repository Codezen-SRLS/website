import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "../context/ThemeContext";

const WhatWeDo = () => {
  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              whatwedo {
                heading
                subHeading
                data {
                  description
                  title
                  video {
                    light {
                      publicURL
                    }
                    dark {
                      publicURL
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const { isDarkMode } = useTheme();

  const newData = data.allSrcJson.edges[0].node.banner.whatwedo;

  return (
    <>
      <div id="whatwedo" className="banner">
        <div className="container ">
          <div className="row align-items-center mb-5 w-100 text-center">
            <p className="sub-text text-decoration-underline m-auto">
              {newData?.subHeading}{" "}
            </p>
            <h2 className="sub-heading mt-3 mb-0">{newData?.heading} </h2>
          </div>
          <div className="row align-items-center">
            {newData?.data?.map((data, index) => (
              <div className="col-lg-4 col-12 mt-5" key={index}>
                <div className="work">
                  <div className="d-flex align-items-center">
                    <div className="square"></div>
                    <p className="text primary-color mb-0 fw-500">
                      0{index + 1}/0{newData?.data?.length}
                    </p>
                  </div>
                  <video
                    key={isDarkMode ? "dark" : "light"}
                    className="mt-4 video"
                    width="100%"
                    height={"234px"}
                    autoPlay
                    muted
                    playsInline
                    webkit-playsinline="true"
                    controlsList="nodownload"
                    loading="lazy"
                  >
                    <source
                      src={
                        isDarkMode
                          ? data?.video?.dark?.publicURL
                          : data?.video?.light?.publicURL
                      }
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <h3 className="mt-4 text-lg-start text-center">
                    {data.title}
                  </h3>
                  <p className="text mb-0 text-lg-start text-center what-we-do-text">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default WhatWeDo;
