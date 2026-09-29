import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import WorkCard from "../components/WorkCard";
import { searchAudits } from "../lib/auditSearch";

const PAGE_SIZE = 12;
const SUGGESTION_COUNT = 6;
// Tags too generic, or topics rather than technologies, to offer as chips
const EXCLUDED_CHIP_TAGS = new Set(["audit", "blockchain", "smart contract", "consensus"]);

// Keep ?q= in the address bar so searches can be shared, without adding history entries
const syncQueryToUrl = (query) => {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set("q", query);
  else url.searchParams.delete("q");
  window.history.replaceState(window.history.state, "", url);
};

const PortfolioPage = ({ data, location }) => {
  const audits = data?.allAuditHistoryJson?.nodes ?? [];
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  // Starts empty so the server-rendered HTML (all audits) matches the first client render
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const initial = new URLSearchParams(location?.search || "").get("q");
    if (initial) setQuery(initial);
  }, [location?.search]);

  const updateQuery = (value) => {
    setQuery(value);
    syncQueryToUrl(value.trim());
  };

  // Most common technologies, offered as one-tap searches
  const suggestions = React.useMemo(() => {
    const counts = {};
    audits.forEach((a) =>
      (a.tags || []).forEach((t) => {
        if (!EXCLUDED_CHIP_TAGS.has(t.toLowerCase())) counts[t] = (counts[t] || 0) + 1;
      })
    );
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, SUGGESTION_COUNT);
  }, [audits]);

  const trimmed = query.trim();
  const searching = trimmed.length > 0;
  const results = React.useMemo(() => searchAudits(audits, trimmed), [audits, trimmed]);
  const matched = React.useMemo(() => new Set(results.map((a) => a.pagePath)), [results]);
  // While searching, show every match in ranked order; otherwise the paged full list
  const ordered = searching ? [...results, ...audits.filter((a) => !matched.has(a.pagePath))] : audits;
  const isVisible = (audit, i) => (searching ? matched.has(audit.pagePath) : i < visibleCount);

  const hasMore = !searching && visibleCount < audits.length;

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

        {/* Search */}
        <div role="search" className="cz-search" aria-label="Search audits">
          <label htmlFor="audit-search" className="cz-sr-only">
            Search audits
          </label>
          <div className="cz-search-field">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="cz-search-icon">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              id="audit-search"
              type="search"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  updateQuery("");
                }
              }}
              placeholder="Search by project, chain, language or partner"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                className="cz-search-clear"
                aria-label="Clear search"
                onClick={() => {
                  updateQuery("");
                  inputRef.current?.focus();
                }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <div className="cz-search-suggestions" role="group" aria-label="Popular technologies">
            {suggestions.map((tag) => (
              <button
                key={tag}
                type="button"
                className="cz-search-chip"
                aria-pressed={trimmed.toLowerCase() === tag.toLowerCase()}
                onClick={() => updateQuery(trimmed.toLowerCase() === tag.toLowerCase() ? "" : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="cz-search-status" role="status">
            {searching && results.length > 0 &&
              `${results.length} ${results.length === 1 ? "audit matches" : "audits match"} “${trimmed}”`}
            {/* The empty state below shows this visually; announce it for screen readers */}
            {searching && results.length === 0 && <span className="cz-sr-only">No audits match “{trimmed}”</span>}
          </p>
        </div>

        {searching && results.length === 0 && (
          <div className="cz-search-empty">
            <p style={{ margin: 0, color: "var(--text-strong)", fontSize: "var(--fs-body-lg)" }}>
              No audits match “{trimmed}”
            </p>
            <p style={{ margin: "8px 0 0", color: "var(--text-body)" }}>
              Try a project name, a chain like Cosmos or Solana, or a language like Rust.
            </p>
            <button type="button" onClick={() => updateQuery("")} className="cz-btn cz-btn--ghost cz-btn--md" style={{ marginTop: 20 }}>
              Clear search
            </button>
          </div>
        )}

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
              cards are hidden by paging ("Load more") or by the search. */}
          {ordered.map((audit, i) => (
            <div key={audit.pagePath} hidden={!isVisible(audit, i)}>
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

        {!searching && !hasMore && audits.length > PAGE_SIZE && (
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
        .cz-search { display: block; margin-bottom: 32px; }
        .cz-search-field { position: relative; max-width: 640px; }
        .cz-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .cz-search-field input {
          width: 100%;
          height: 52px;
          padding: 0 48px 0 48px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--glass-line-strong);
          background: var(--glass);
          color: var(--text-strong);
          font: inherit;
          font-size: var(--fs-body);
          transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease);
        }
        .cz-search-field input::placeholder { color: var(--text-muted); }
        .cz-search-field input:focus { outline: none; border-color: var(--cz-cyan); box-shadow: 0 0 0 3px rgba(4,217,255,0.18); }
        .cz-search-field input::-webkit-search-cancel-button { display: none; }
        .cz-search-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: var(--glass-2);
          color: var(--text-body);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cz-search-clear:hover { color: var(--text-strong); background: var(--glass-3); }
        .cz-search-suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .cz-search-chip {
          min-height: 32px;
          padding: 4px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--glass-line);
          background: transparent;
          color: var(--text-body);
          font-size: 14px;
          transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
        }
        .cz-search-chip:hover { border-color: var(--glass-line-strong); color: var(--text-strong); }
        .cz-search-chip[aria-pressed="true"] {
          border-color: var(--cz-cyan);
          color: var(--cz-cyan-soft);
          background: rgba(4,217,255,0.08);
        }
        .cz-search-status { min-height: 22px; margin: 16px 0 0; color: var(--text-muted); font-size: var(--fs-small); }
        .cz-search-empty {
          padding: 40px 32px;
          margin-bottom: 80px;
          border-radius: var(--radius-lg);
          border: 1px dashed var(--glass-line-strong);
          text-align: center;
        }
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
        extendedDescription
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
