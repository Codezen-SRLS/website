import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStaticQuery, graphql } from "gatsby";
import { useMediaQuery } from "react-responsive";
import WorkCard from "./WorkCard";

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
            partner
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

  const is768 = useMediaQuery({ query: "(min-width: 740px)" });
  const is1024 = useMediaQuery({ query: "(min-width: 1400px)" });

  //Hydrate fix
  const [isHydrated, setIsHydrated] = useState();
  useEffect(() => {
    setIsHydrated(true);
  }, [setIsHydrated]);

  const newData = data.allAuditHistoryJson.edges;

  var settings = {
    dots: false,
    arrows: false,
    slidesToShow: isHydrated ? (is1024 ? 3 : is768 ? 2 : 1) : 0,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div id="work" className="banner">
      <div className="container">
        <div className="row align-items-center w-100 text-center">
          <p className="sub-text text-decoration-underline m-auto">
            {data?.allSrcJson.edges[0]?.node?.banner.work.subHeading}
          </p>
          <h2 className="sub-heading mt-3 mb-5">
            {data?.allSrcJson.edges[0]?.node?.banner.work.heading}
          </h2>
          <div className="work-banner-actions">
            <a className="btn" href="/portfolio" rel="noreferrer">
              <span className="text">
                <span className="square"></span>
              </span>
              View All Our Work
            </a>
          </div>
        </div>
      </div>
      <div className="slider-container work-large">
        {isHydrated && (
          <Slider {...settings}>
            {newData?.map(({ node }, i) => (
              <WorkCard key={node?.id || i} item={node} openInNewTab />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Work;
