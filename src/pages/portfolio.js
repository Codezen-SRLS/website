import React, { useMemo, useState } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Stats from "../components/Stats";
import WorkCard from "../components/WorkCard";

const PAGE_SIZE = 12;

const PortfolioPage = ({ data }) => {
  const headingData = data?.allSrcJson?.edges?.[0]?.node?.banner?.work;
  const audits = useMemo(() => data?.allAuditHistoryJson?.edges ?? [], [data]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleAudits = audits.slice(0, visibleCount);
  const hasMore = visibleCount < audits.length;

  return (
    <Layout>
      <Seo title="Portfolio" />
      <div className="work-grid-page">
        <section className="work-grid-hero container text-center">
          {headingData?.subHeading && (
            <p className="sub-text text-decoration-underline m-auto">
              {headingData.subHeading}
            </p>
          )}
          <h1 className="main-heading mt-3 mb-4 m-auto">
            {headingData?.heading || "Our Work"}
          </h1>
          <p className="text m-auto work-grid-description">
            Explore the complete portfolio of audits and security engagements
            our team has delivered across ecosystems, chains, and protocols.
          </p>
        </section>

        <Stats />

        <section className="container work-grid-section">
          <div className="work-grid">
            {visibleAudits.map(({ node }, index) => (
              <WorkCard
                key={node?.id || index}
                item={node}
                className="work-card"
                openInNewTab
              />
            ))}
          </div>
          {hasMore && (
            <div className="work-grid-controls text-center">
              <button
                className="btn"
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                <span className="text">
                  <span className="square"></span>
                </span>
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioPage;

export const query = graphql`
  {
    allAuditHistoryJson {
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
`;
