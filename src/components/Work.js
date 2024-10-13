import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useMediaQuery } from "../utils";

const Work = () => {
  const data = useStaticQuery(graphql`
    {
      allAuditHistoryJson(filter: { featured: { eq: true } }) {
        edges {
          node {
            id
            title
            description
            extendedDescription
            website
            github
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
        }
      }
      allSrcJson {
        edges {
          node {
            banner {
              work {
                heading
                subHeading
              }
            }
          }
        }
      }
    }
  `);

  const is768 = useMediaQuery("(min-width: 768px)");
  const is1024 = useMediaQuery("(min-width: 1440px)");

  const columns = is1024 ? 3 : is768 ? 2 : 1;
  const rows = 2;

  const newData = data.allAuditHistoryJson.edges;

  var settings = {
    dots: true,
    arrows: false,
    slidesToShow: columns,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div id="work" className="banner">
      <div className="container ">
        <div className="row align-items-center w-100 text-center">
          <p className="sub-text text-decoration-underline m-auto">
            {data?.allSrcJson.edges[0]?.node?.banner.work.subHeading}
          </p>
          <h1 className="sub-heading mt-3 mb-5">
            {data?.allSrcJson.edges[0]?.node?.banner.work.heading}
          </h1>
        </div>
      </div>
      <div className="slider-container work-large">
        <Slider {...settings}>
          {newData?.map((data, i) => (
            <a
              href={
                data?.node?.github ? data?.node?.github : data?.node?.website
              }
              target="_blank"
              key={i}
            >
              <div className="work-section">
                <GatsbyImage
                  className="work-image"
                  image={data?.node?.image.childImageSharp.gatsbyImageData}
                  alt={data?.node?.title}
                />
                <div className="tag">{data?.node?.description}</div>

                <div className="work-details">
                  <h3>{data?.node?.title}</h3>
                  <p className="text mb-0">{data?.node?.extendedDescription}</p>
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Work;
