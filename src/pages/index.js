import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Banner from "../components/Banner";
import Stats from "../components/Stats";
import WhoWeAre from "../components/WhoWeAre";
import Partners from "../components/Partners";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";

const IndexPage = () => (
	<Layout>
		<Banner />
		<Stats />
		<WhoWeAre />
		<Partners />
		<WhatWeDo />
		<HowWeWork />
	</Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
