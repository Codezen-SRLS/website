import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import WorkCard from "../components/WorkCard";

const PAGE_SIZE = 12;

const PortfolioPage = ({ data }) => {
  const audits = data?.allAuditHistoryJson?.nodes ?? [];
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);


  const hasMore = visibleCount < audits.length;

  return (
    <Layout>
      <div className="cz-container" style={{ paddingTop: 0 }}>
        {/* Page header */}
        <section style={{ padding: "72px 0 56px" }}>
          <h1 className="cz-page-heading" style={{ marginTop: 0 }}>
            {audits.length}+ audits across
            <br />
            <span className="cz-iris-anim">every major blockchain</span>
          </h1>
          <p className="cz-page-lead">
            Smart contracts, consensus protocols, and runtime environments. A complete track record of security engagements across Solidity, Rust, Anchor, CosmWasm, and Substrate.
          </p>
        </section>

        {/* Grid */}
        <h2 className="cz-sr-only">All audits</h2>
        <div
          style={{
            display: "grid",
            gap: 22,
            paddingBottom: 80,
          }}
          className="cz-portfolio-grid"
        >
          {/* Every audit is in the HTML so search engines can follow each link;
              cards past the current page are hidden until "Load more". */}
          {audits.map((audit, i) => (
            <div key={audit.pagePath} hidden={i >= visibleCount}>
              <WorkCard
                {...audit}
                slug={audit.pagePath}
                imageData={audit.image?.childImageSharp?.gatsbyImageData}
              />
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 80 }}>
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="cz-btn cz-btn--ghost cz-btn--lg"
            >
              Load more audits
            </button>
          </div>
        )}

        {!hasMore && audits.length > PAGE_SIZE && (
          <p
            style={{
              textAlign: "center",
              paddingBottom: 80,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-mono-sm)",
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
            }}
          >
            All {audits.length} audits shown
          </p>
        )}
      </div>

      <style>{`
        .cz-portfolio-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
        @media (max-width: 767px) {
          .cz-portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export const Head = ({ location }) => (
  <Seo
    pathname={location.pathname}
    title="Smart Contract & Blockchain Audit Portfolio"
    description="Browse 120+ public security audits by Codezen: Stellar, Cosmos SDK, CosmWasm, Solana, EVM and Substrate protocols, with findings and full reports."
  />
);

export const query = graphql`
  query PortfolioQuery {
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
      }
    }
  }
`;

export default PortfolioPage;
