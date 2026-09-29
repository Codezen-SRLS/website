import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <div className="cz-container">
      <section style={{ padding: "120px 0 80px", maxWidth: 620 }}>
        <p className="cz-mono-value" style={{ margin: 0, color: "var(--cz-cyan-soft)" }}>
          404
        </p>
        <h1 className="cz-page-heading">This page doesn't exist</h1>
        <p className="cz-page-lead">
          The link may be broken or the page may have moved. Head back to the home page or browse
          our audit portfolio.
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
          <Link to="/" className="cz-btn cz-btn--primary cz-btn--lg">
            Go to home page
          </Link>
          <Link to="/portfolio/" className="cz-btn cz-btn--ghost cz-btn--lg">
            Browse audits
          </Link>
        </div>
      </section>
    </div>
  </Layout>
);

export const Head = ({ location }) => (
  <Seo title="Page not found" pathname={location.pathname} noindex />
);

export default NotFoundPage;
