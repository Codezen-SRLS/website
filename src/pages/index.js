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
        <Hero auditCount={auditCount} vulnCount={vulnCount} />
        <ChainStrip />
        <Stats
          auditCount={auditCount}
          vulnCount={vulnCount}
          assetsProtected="$1.2B+"
          criticalCount={criticalCount}
        />
        <Services />
        <Process />
        <FeaturedReport audit={featuredAudit} />
        <Work audits={audits} />
        <Team members={teamMembers} />
        <CTABand />
      </div>
    </Layout>
  );
};

export const Head = () => (
  <Seo description="Smart contract security audits for EVM, Solana and Cosmos. We audit Solidity, Rust, Anchor and CosmWasm protocols to find vulnerabilities before mainnet." />
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
        image {
          childImageSharp {
            gatsbyImageData(width: 400, height: 160, placeholder: BLURRED, transformOptions: { fit: COVER })
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
