import * as React from "react";

const StatCard = ({ value, label }) => (
  <div
    style={{
      padding: "28px 24px",
      background: "var(--glass)",
      border: "1px solid var(--glass-line)",
      borderTop: "1px solid rgba(4,217,255,0.38)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "0 -6px 24px -10px rgba(4,217,255,0.28)",
    }}
  >
    <div
      className="cz-stat-value cz-iris-anim"
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </div>
    <div
      style={{
        marginTop: 10,
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono-sm)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        lineHeight: 1.4,
      }}
    >
      {label}
    </div>
  </div>
);

const Stats = ({ auditCount, vulnCount, assetsProtected, criticalCount }) => (
  <section data-reveal style={{ padding: "72px 0" }}>
    <div className="cz-stats-grid">
      <StatCard value={`${auditCount}+`} label="Completed audits" />
      <StatCard value={`${vulnCount}+`} label="Vulnerabilities found" />
      <StatCard value={assetsProtected || "$1.2B+"} label="Assets protected" />
      <StatCard value={`${criticalCount}+`} label="Critical findings" />
    </div>
    <style>{`
      .cz-stat-value { font-size: var(--fs-stat); }
      .cz-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
      @media (max-width: 1023px) {
        .cz-stats-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 767px) {
        .cz-stat-value { font-size: 40px; }
        .cz-stats-grid { grid-template-columns: repeat(2, 1fr); }
      }
    `}</style>
  </section>
);

export default Stats;
