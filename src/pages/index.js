import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Hero from "../components/Hero";
import ChainStrip from "../components/ChainStrip";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Process from "../components/Process";
import FeaturedReport from "../components/FeaturedReport";
import Work from "../components/Work";
import Team from "../components/Team";
import CTABand from "../components/CTABand";

// Languages and frameworks shown in the lead auditor's breakdown
const EXPERTISE_TAGS = ["Rust", "Golang", "CosmWasm", "Cosmos SDK", "Solidity", "Substrate", "Solana", "Move"];

// Rounds down so the published figure never overstates the data, e.g. 2.99e9 -> "$2.9B+"
const formatUsdFloor = (usd) => {
  if (usd >= 1e9) return `$${Math.floor(usd / 1e8) / 10}B+`;
  if (usd >= 1e6) return `$${Math.floor(usd / 1e5) / 10}M+`;
  return null;
};

const IndexPage = ({ data }) => {
  const audits = data.allAuditHistoryJson.nodes;
  const siteData = data.allSrcJson.edges[0]?.node?.banner || {};
  const teamMembers = siteData?.team?.members || [];


  const auditCount = audits.length;
  const vulnCount = audits.reduce((sum, a) => {
    if (!a.issues) return sum;
    return sum + (a.issues.critical || 0) + (a.issues.major || 0) + (a.issues.minor || 0) + (a.issues.informational || 0);
  }, 0);
  const criticalCount = audits.reduce((sum, a) => sum + (a.issues?.critical || 0), 0);
  const tvlTotal = audits.reduce((sum, a) => sum + (a.tvlUsd || 0), 0);
  const assetsProtected = formatUsdFloor(tvlTotal);

  const expertise = EXPERTISE_TAGS.map((tag) => ({
    tag,
    count: audits.filter((a) => a.tags?.includes(tag)).length,
  }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const featuredAudit = audits
    .filter((a) => a.featured && a.issues)
    .sort((a, b) => {
      const total = (x) =>
        (x.issues?.critical || 0) + (x.issues?.major || 0) + (x.issues?.minor || 0) + (x.issues?.informational || 0);
      return total(b) - total(a);
    })[0];

  return (
    <Layout>
      <div className="cz-container" style={{ paddingTop: 0 }}>
        <Hero />
        <ChainStrip />
        <Stats
          auditCount={auditCount}
          vulnCount={vulnCount}
          assetsProtected={assetsProtected}
          criticalCount={criticalCount}
        />
        <Services />
        <Process />
        <FeaturedReport audit={featuredAudit} />
        <Work audits={audits} />
        <Team members={teamMembers} expertise={expertise} />
        <CTABand />
      </div>
    </Layout>
  );
};

export const Head = ({ location }) => (
  <>
    <Seo pathname={location.pathname} description="Smart contract security audits for EVM, Solana and Cosmos. We audit Solidity, Rust, Anchor and CosmWasm protocols to find vulnerabilities before mainnet." />
    {/* Lets Google show "Codezen" as the site name in results */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Codezen",
        url: "https://www.codezen.tech/",
      })}
    </script>
  </>
);

export const query = graphql`
  query IndexPageQuery {
    allAuditHistoryJson {
      nodes {
        title
        description
        tags
        partner
        github
        website
        featured
        pagePath
        image {
          childImageSharp {
            gatsbyImageData(width: 640, placeholder: BLURRED)
          }
        }
        issues {
          critical
          major
          minor
          informational
        }
        tvlUsd
      }
    }
    allSrcJson {
      edges {
        node {
          banner {
            team {
              members {
                name
                role
                description
                website
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
