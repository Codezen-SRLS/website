import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          keywords
        }
      }
    }
  `);

  const siteTitle = site.siteMetadata?.title;
  const metaDescription = description || site.siteMetadata.description;
  const metaKeywords = site.siteMetadata?.keywords;
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaImage = `${site.siteMetadata.siteUrl}/icons/icon-512x512.png`;
  const siteUrl = site.siteMetadata.siteUrl;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CodezenSRLS" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Codezen",
          url: siteUrl,
          logo: metaImage,
          description: "Expert smart contract audits for Solidity, Rust, Anchor, CosmWasm and Cosmos SDK. Blockchain security consulting for EVM, Solana and Cosmos protocols.",
          email: "info@codezen.tech",
          knowsAbout: [
            "Smart Contract Audits",
            "Blockchain Security",
            "Solidity",
            "Rust",
            "Golang",
            "Anchor",
            "CosmWasm",
            "Cosmos SDK",
            "Substrate",
            "EVM",
            "Solana",
            "Polkadot",
            "Web3 Security",
            "DeFi Security",
          ],
          sameAs: [
            "https://x.com/CodezenSRLS",
            "https://github.com/Codezen-SRLS",
            "https://www.linkedin.com/company/codezensrls",
            "https://www.altairith.capital",
          ],
        })}
      </script>
    </>
  );
};

export default Seo;
