import React from "react";
import hero from "../images/hero.mp4";
import heroMobile from "../images/mobile-banner.mp4";

import { useStaticQuery, graphql, Link } from "gatsby";

const Banner = () => {
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

        <div
          dangerouslySetInnerHTML={{
            __html: ` <video class="w-100 videos-banner desktop" autoPlay loop muted playsinline>
      <source src=${hero} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
          }}
          className="col-xl-5 col-12 mt-xl-0 mt-5"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: ` <video class="w-100 videos-banner mobile" autoPlay loop muted playsinline>
      <source src=${heroMobile} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
          }}
          className="col-xl-5 col-12 mt-xl-0 mt-5"
        />
      </div>
    </div>
  );
};

export default Banner;
