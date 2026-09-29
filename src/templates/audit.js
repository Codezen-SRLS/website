import * as React from "react";
import { graphql, Link } from "gatsby";
import { getSrc } from "gatsby-plugin-image";
import BannerImage from "../components/BannerImage";
import Layout from "../components/layout";
import Seo from "../components/seo";
import WorkCard from "../components/WorkCard";
import { useForm } from "../context/FormContext";

const GENERIC_TAGS = ["Audit", "Blockchain"];

const SEVERITIES = [
  { key: "critical", label: "Critical", color: "#ff5c5c" },
  { key: "major", label: "Major", color: "#f5b945" },
  { key: "minor", label: "Minor", color: "var(--cz-cyan)" },
  { key: "informational", label: "Info", color: "rgba(232,238,255,0.45)" },
];

const totalFindings = (issues) =>
  issues ? SEVERITIES.reduce((sum, s) => sum + (issues[s.key] || 0), 0) : 0;

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const joinList = (items) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const Fact = ({ label, children }) => (
  <div className="cz-audit-fact">
    <dt>{label}</dt>
    <dd>{children}</dd>
  </div>
);

// Separate component so useForm runs inside Layout's FormProvider
const AuditCta = () => {
  const { openForm } = useForm();
  return (
    <section className="cz-audit-cta">
      <h2 className="cz-audit-h2" style={{ marginTop: 0 }}>
        Need an audit for your protocol?
      </h2>
      <p className="cz-audit-text">
        Tell us about your project and we'll scope an audit within one business day.
      </p>
      <button onClick={openForm} className="cz-btn cz-btn--primary cz-btn--lg" style={{ marginTop: 24 }}>
        Request an audit
      </button>
    </section>
  );
};

const AuditPage = ({ data }) => {
  const audit = data.auditHistoryJson;
  const related = data.related.nodes;
  const techTags = (audit.tags || []).filter((t) => !GENERIC_TAGS.includes(t));
  const total = totalFindings(audit.issues);
  const reportDate = audit.fields.reportDate;
  const image = audit.image?.childImageSharp?.gatsbyImageData;

  return (
    <Layout>
      <div className="cz-container">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 48, fontSize: "var(--fs-small)" }}>
          <Link to="/portfolio/" className="cz-flink">
            Portfolio
          </Link>
          <span style={{ color: "var(--text-muted)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--text-body)" }}>{audit.title}</span>
        </nav>

        <article className="cz-audit">
          <header className="cz-audit-head">
            <div>
              <h1 className="cz-page-heading">{audit.title} security audit</h1>
              <p className="cz-page-lead">{audit.extendedDescription}</p>
              <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                {audit.github && (
                  <a
                    href={audit.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cz-btn cz-btn--primary cz-btn--lg"
                  >
                    Read the full report
                  </a>
                )}
                {audit.website && (
                  <a
                    href={audit.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cz-btn cz-btn--ghost cz-btn--lg"
                  >
                    Visit {audit.title}
                  </a>
                )}
              </div>
            </div>
            {image && (
              <div className="cz-audit-image">
                <BannerImage image={image} alt={`${audit.title} logo`} />
              </div>
            )}
          </header>

          <div className="cz-audit-body">
            <section>
              <h2 className="cz-audit-h2">About this audit</h2>
              <p className="cz-audit-text">
                Codezen audited {audit.title}
                {audit.partner ? ` together with ${audit.partner}` : ""}.
                {techTags.length > 0 && ` Technologies in scope: ${joinList(techTags)}.`}
                {total > 0 &&
                  ` We reported ${total} findings: ${joinList(
                    SEVERITIES.filter((s) => audit.issues[s.key] > 0).map(
                      (s) => `${audit.issues[s.key]} ${s.key}`
                    )
                  )}.`}
              </p>

              {total > 0 && (
                <>
                  <h2 className="cz-audit-h2">Findings by severity</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
                    {SEVERITIES.map(({ key, label, color }) => {
                      const count = audit.issues[key] || 0;
                      return (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ width: 64, fontSize: "var(--fs-small)", color: "var(--text-body)" }}>
                            {label}
                          </span>
                          <div
                            aria-hidden="true"
                            style={{
                              flex: 1,
                              height: 8,
                              borderRadius: "var(--radius-pill)",
                              background: "rgba(255,255,255,0.05)",
                            }}
                          >
                            <div
                              style={{
                                width: `${(count / total) * 100}%`,
                                height: "100%",
                                borderRadius: "var(--radius-pill)",
                                background: color,
                              }}
                            />
                          </div>
                          <span className="cz-mono-value" style={{ width: 28, textAlign: "right" }}>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            <aside>
              <dl className="cz-audit-facts">
                <Fact label="Audit type">{audit.description}</Fact>
                {techTags.length > 0 && <Fact label="Technologies">{techTags.join(", ")}</Fact>}
                {audit.partner && <Fact label="Delivered with">{audit.partner}</Fact>}
                {reportDate && (
                  <Fact label="Report date">
                    <time dateTime={reportDate}>{formatDate(reportDate)}</time>
                  </Fact>
                )}
                {total > 0 && <Fact label="Findings">{total}</Fact>}
              </dl>
            </aside>
          </div>

          <AuditCta />

          {related.length > 0 && (
            <section style={{ paddingTop: 80 }}>
              <h2 className="cz-audit-h2" style={{ marginTop: 0 }}>
                Related audits
              </h2>
              <div className="cz-audit-related">
                {related.map((r) => (
                  <WorkCard
                    key={r.pagePath}
                    {...r}
                    slug={r.pagePath}
                    imageData={r.image?.childImageSharp?.gatsbyImageData}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      <style>{`
        .cz-audit { padding-bottom: 80px; }
        .cz-audit-head {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: center;
          padding: 40px 0 56px;
        }
        .cz-audit-image {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--glass-line);
          aspect-ratio: 16 / 9;
        }
        .cz-audit-body {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          padding-top: 48px;
          border-top: 1px solid var(--glass-line);
        }
        .cz-audit-h2 {
          margin: 40px 0 0;
          color: var(--text-strong);
          font-size: var(--fs-h4);
          font-weight: var(--fw-semibold);
        }
        .cz-audit-body section > .cz-audit-h2:first-child { margin-top: 0; }
        .cz-audit-text {
          margin: 14px 0 0;
          max-width: 640px;
          color: var(--text-body);
          font-size: var(--fs-body);
          line-height: var(--lh-relaxed);
        }
        .cz-audit-facts {
          margin: 0;
          padding: 24px 28px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-line);
          background: var(--glass);
        }
        .cz-audit-fact {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: var(--fs-small);
        }
        .cz-audit-fact:last-child { border-bottom: none; }
        .cz-audit-fact dt { color: var(--text-muted); }
        .cz-audit-fact dd { margin: 0; color: var(--text-strong); text-align: right; }
        .cz-audit-cta {
          margin-top: 64px;
          padding: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-line);
          background: radial-gradient(120% 140% at 0% 0%, rgba(4,217,255,0.12), transparent 60%), var(--glass);
        }
        .cz-audit-related {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-top: 24px;
        }
        @media (max-width: 1023px) {
          .cz-audit-head, .cz-audit-body { grid-template-columns: 1fr; }
          .cz-audit-related { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .cz-audit-related { grid-template-columns: 1fr; }
          .cz-audit-cta { padding: 28px 24px; }
        }
      `}</style>
    </Layout>
  );
};

export const Head = ({ data, location }) => {
  const audit = data.auditHistoryJson;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const total = totalFindings(audit.issues);
  const ogImage = audit.image?.childImageSharp?.og ? `${siteUrl}${getSrc(audit.image.childImageSharp.og)}` : undefined;
  const pageUrl = `${siteUrl}${location.pathname}`;
  // Google truncates titles past ~60 chars; " | Codezen" adds 10
  const title = [`${audit.title} Security Audit`, `${audit.title} Audit`, audit.title].find(
    (t) => t.length + 10 <= 60
  ) || audit.title;
  const description = `${audit.title} security audit by Codezen (${audit.description})${
    audit.partner ? ` with ${audit.partner}` : ""
  }${total > 0 ? `: ${total} findings reported` : ""}. ${audit.extendedDescription}`.slice(0, 160);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Report",
      name: `${audit.title} Security Audit`,
      headline: `${audit.title} Security Audit`,
      description,
      url: pageUrl,
      about: { "@type": "Thing", name: audit.title, ...(audit.website ? { url: audit.website } : {}) },
      keywords: (audit.tags || []).join(", "),
      author: { "@type": "Organization", name: "Codezen", url: siteUrl },
      publisher: { "@type": "Organization", name: "Codezen", url: siteUrl },
      ...(audit.fields.reportDate ? { datePublished: audit.fields.reportDate } : {}),
      ...(ogImage ? { image: ogImage } : {}),
      ...(audit.github ? { associatedMedia: { "@type": "MediaObject", contentUrl: audit.github } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: `${siteUrl}/portfolio/` },
        { "@type": "ListItem", position: 2, name: audit.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        pathname={location.pathname}
        image={ogImage}
        imageAlt={`${audit.title} logo`}
        type="article"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
};

export const query = graphql`
  query AuditPage($id: String!, $related: [String]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    auditHistoryJson(id: { eq: $id }) {
      title
      description
      extendedDescription
      tags
      partner
      github
      website
      issues {
        critical
        major
        minor
        informational
      }
      fields {
        reportDate
      }
      image {
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: BLURRED)
          og: gatsbyImageData(width: 1200, height: 630, layout: FIXED, transformOptions: { fit: COVER })
        }
      }
    }
    related: allAuditHistoryJson(filter: { id: { in: $related } }) {
      nodes {
        title
        description
        tags
        partner
        github
        website
        pagePath
        image {
          childImageSharp {
            gatsbyImageData(width: 640, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export default AuditPage;
