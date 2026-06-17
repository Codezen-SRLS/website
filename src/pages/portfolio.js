import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import WorkCard from "../components/WorkCard";

const PAGE_SIZE = 12;

const PortfolioPage = ({ data }) => {
  const audits = data?.allAuditHistoryJson?.nodes ?? [];
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);


  const visible = audits.slice(0, visibleCount);
  const hasMore = visibleCount < audits.length;

  return (
    <Layout>
      <div className="cz-container" style={{ paddingTop: 0 }}>
        {/* Page header */}
        <section style={{ padding: "72px 0 56px" }}>
          <span className="cz-eyebrow">Our Work</span>
          <h1
            style={{
              margin: "16px 0 0",
              color: "var(--text-strong)",
              fontWeight: 700,
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--ls-tight)",
            }}
            className="cz-portfolio-h1"
          >
            {audits.length}+ audits across
            <br />
            <span className="cz-iris-anim">every major blockchain</span>
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              maxWidth: 520,
              color: "var(--text-body)",
              fontSize: "var(--fs-body-lg)",
              fontWeight: "var(--fw-light)",
              lineHeight: "var(--lh-relaxed)",
            }}
          >
            Smart contracts, consensus protocols, and runtime environments. A complete track record of security engagements across Solidity, Rust, Anchor, CosmWasm, and Substrate.
          </p>
        </section>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gap: 22,
            paddingBottom: 80,
          }}
          className="cz-portfolio-grid"
        >
          {visible.map((audit, i) => (
            <WorkCard key={i} {...audit} imageData={audit.image?.childImageSharp?.gatsbyImageData} />
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
        .cz-portfolio-h1 { font-size: clamp(40px, 5vw, var(--fs-h1)); }
        .cz-portfolio-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
        @media (max-width: 767px) {
          .cz-portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
};

export const Head = () => (
  <Seo
    title="Portfolio"
    description="Browse 100+ blockchain security audits across EVM, Solana and Cosmos. Solidity, Rust, Anchor, CosmWasm and Substrate protocol reviews by Codezen."
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
      }
    }
  }
`;

export default PortfolioPage;
