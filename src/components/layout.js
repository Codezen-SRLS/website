/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Header from "./header";
import "./layout.css";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

// Inner layout component that can use the theme context
const InnerLayout = ({ children, siteTitle }) => {
  const { isDarkMode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && isDarkMode ? (
        <StaticImage
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "100%",
            zIndex: -1,
            objectFit: "fill",
          }}
          layout="fullWidth"
          alt="background"
          src={"../images/bg.png"}
          formats={["auto", "webp", "avif"]}
          placeholder="blurred"
          backgroundColor="#131313"
        />
      ) : null}

      <Header siteTitle={siteTitle} />
      {children}
      <Footer />
    </>
  );
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider>
      <InnerLayout siteTitle={data.site.siteMetadata?.title || `Title`}>
        {children}
      </InnerLayout>
    </ThemeProvider>
  );
};

export default Layout;
