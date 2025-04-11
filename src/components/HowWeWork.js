import React from "react";
import workDark from "../images/work.mp4";
import workLight from "../images/work-alt.mp4";
import { useStaticQuery, graphql } from "gatsby";
import { useTheme } from "../context/ThemeContext";

const HowWeWork = () => {
  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              howwework {
                firstDescription
                firstTitle
                fourthDescription
                fourthTitle
                heading
                secondDescription
                secondTitle
                subHeading
                thirdDescription
                thirdTitle
              }
            }
          }
        }
      }
    }
  `);

  const { isDarkMode } = useTheme();
  const work = isDarkMode ? workDark : workLight;

  const newData = data.allSrcJson.edges[0].node.banner.howwework;
  return (
    <>
      <div className="banner">
        <div className="container ">
          <div className="row align-items-center w-100 text-center">
            <p className="sub-text text-decoration-underline m-auto">
              {newData?.subHeading}
            </p>
            <h2 className="sub-heading mt-3 mb-5">{newData?.heading}</h2>
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col">
                  <h3 className="work-heading primary-color text-lg-end text-start">
                    01
                  </h3>
                  <h3
                    className="text-lg-end text-start"
                    style={{ "--size": "32px" }}
                  >
                    {newData?.firstTitle}
                  </h3>
                  <p className="text text-lg-end text-start">
                    {newData?.firstDescription}
                  </p>
                </div>
              </div>
              <div className="row pt-6">
                <div className="col-12">
                  <h3 className="work-heading primary-color text-lg-end text-start">
                    02
                  </h3>
                  <h3
                    className="text-lg-end text-start"
                    style={{ "--size": "32px" }}
                  >
                    {newData?.secondTitle}
                  </h3>
                  <p className="text text-lg-end text-start mb-0">
                    {newData?.secondDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 my-lg-0 my-5">
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
                <source src={work} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-lg-4 col-12">
              <div className="row">
                <div className="col">
                  <h3 className="work-heading primary-color text-start">03</h3>
                  <h3 className="text-start" style={{ "--size": "32px" }}>
                    {newData?.thirdTitle}
                  </h3>
                  <p className="text text-start">{newData?.thirdDescription}</p>
                </div>
              </div>
              <div className="row pt-6">
                <div className="col-12">
                  <h3 className="work-heading primary-color text-start">04</h3>
                  <h3 className="text-start" style={{ "--size": "32px" }}>
                    {newData?.fourthTitle}
                  </h3>
                  <p className="text text-start mb-0">
                    {newData?.fourthDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default HowWeWork;
