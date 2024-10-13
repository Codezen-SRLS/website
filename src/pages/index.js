import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Banner from "../components/Banner";
import Stats from "../components/Stats";
import WhoWeAre from "../components/WhoWeAre";
import Partners from "../components/Partners";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import Work from "../components/Work";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => (
  <>
    <StaticImage
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100%",
        zIndex: 0,
        objectFit: "fill",
      }}
      layout="fullWidth"
      alt=""
      src={"../images/bg.png"}
      formats={["auto", "webp", "avif"]}
      placeholder="blurred"
    />

    <Layout>
      <Banner />
      <Stats />
      <WhoWeAre />
      <Partners />
      <WhatWeDo />
      <HowWeWork />
      <Work />
    </Layout>
  </>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
