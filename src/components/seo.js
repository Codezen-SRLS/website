/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

function Seo({ children, article, keywords, pathname }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const canonical = pathname
    ? `${site.siteMetadata.siteUrl}${pathname}`
    : site.siteMetadata.siteUrl;
  const metaImage = `${site.siteMetadata.siteUrl}/icons/icon-512x512.png`;

  return (
    <>
      <title>{defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={metaImage} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      {metaImage && <meta property="og:image" content={metaImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}

      {/* Add structured data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: defaultTitle,
          url: site.siteMetadata.siteUrl,
          logo: `${site.siteMetadata.siteUrl}/icons/icon-512x512.png`,
          description: metaDescription,
          sameAs: [
            "https://twitter.com/@CodezenSRLS",
            "https://github.com/Codezen-SRLS",
            "https://www.linkedin.com/company/codezensrls",
          ],
        })}
      </script>
      {children}
    </>
  );
}

export default Seo;
