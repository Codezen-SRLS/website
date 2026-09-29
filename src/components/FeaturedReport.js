import * as React from "react";
import { useForm } from "../context/FormContext";

// Severity names follow the audit data: critical, major, minor, informational
const BAR_COLORS = {
  Critical: "#ff5c5c",
  Major: "#f5b945",
  Minor: "var(--cz-cyan)",
  Info: "rgba(232,238,255,0.45)",
};

const SeverityBar = ({ label, count, total, color, delay }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const textColors = {
    Critical: "#ff7a7a",
    Major: "#f5b945",
    Minor: "var(--cz-cyan-soft)",
    Info: "var(--text-muted)",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span
        className="cz-mono-label"
        style={{ width: 74, color: textColors[label] }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 8,
          borderRadius: "var(--radius-pill)",
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: "var(--radius-pill)",
            transformOrigin: "left",
            animation: `cz-bardraw 1s ${delay}s var(--ease) both`,
          }}
        />
      </div>
      <span
        style={{
          width: 28,
          textAlign: "right",
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          color: "var(--text-strong)",
        }}
      >
        {count}
      </span>
    </div>
  );
};

const MetaRow = ({ label, value, valueStyle, last }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
      paddingBottom: last ? 0 : 14,
    }}
  >
    <span className="cz-text-muted">{label}</span>
    <span className="cz-mono-value" style={{ textAlign: "right", ...valueStyle }}>
      {value}
    </span>
  </div>
);

const FeaturedReport = ({ audit }) => {
  const { openForm } = useForm();
  if (!audit) return null;

  const issues = audit.issues || {};
  const total =
    (issues.critical || 0) + (issues.major || 0) + (issues.minor || 0) + (issues.informational || 0);

  return (
    <section
      id="report"
      data-reveal
      className="cz-section"
    >
      <h2 className="cz-section-heading">The depth behind every engagement</h2>

      <div
        style={{
          marginTop: 44,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--glass-line)",
          background: "var(--glass)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            padding: "24px 30px",
            borderBottom: "1px solid var(--glass-line)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div>
            <div className="cz-mono-accent">
              Rust / Solana · Security Audit
            </div>
            <h3 style={{ margin: "8px 0 0", color: "var(--text-strong)", fontSize: 24, fontWeight: 600 }}>
              Smart Contract Security Review
            </h3>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-mono-sm)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--status-success)",
              border: "1px solid rgba(47,212,138,0.4)",
              borderRadius: "var(--radius-pill)",
              padding: "8px 14px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--status-success)",
                boxShadow: "0 0 10px var(--status-success)",
              }}
            />
            Delivered
          </span>
        </div>

        {/* Panel body */}
        <div className="cz-report-cols">
          {/* Engagement col */}
          <div style={{ padding: 30 }} className="cz-report-left">
            <div className="cz-mono-label" style={{ marginBottom: 18 }}>
              Engagement
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <MetaRow
                label="Scope"
                value="Solana Program, Rust, Anchor"
                valueStyle={{ color: "var(--text-strong)" }}
              />
              <MetaRow
                label="Ecosystem"
                value="Solana"
                valueStyle={{ color: "var(--text-strong)" }}
              />
              <MetaRow
                label="Client"
                value="Confidential"
                valueStyle={{ color: "var(--text-muted)" }}
              />
              <MetaRow
                label="Total findings"
                value={`${total} issues`}
                valueStyle={{ color: "var(--text-strong)" }}
              />
              <MetaRow
                label="Resolution"
                value="100% fixed"
                valueStyle={{ color: "var(--status-success)" }}
                last
              />
            </div>
          </div>

          {/* Findings col */}
          <div style={{ padding: 30 }}>
            <div className="cz-mono-label" style={{ marginBottom: 20 }}>
              Findings by severity · {total} total
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SeverityBar label="Critical" count={issues.critical || 0} total={total} color={BAR_COLORS.Critical} delay={0} />
              <SeverityBar label="Major" count={issues.major || 0} total={total} color={BAR_COLORS.Major} delay={0.1} />
              <SeverityBar label="Minor" count={issues.minor || 0} total={total} color={BAR_COLORS.Minor} delay={0.2} />
              <SeverityBar label="Info" count={issues.informational || 0} total={total} color={BAR_COLORS.Info} delay={0.3} />
            </div>

            {/* Sample findings */}
            {issues.critical > 0 && (
              <div style={{ marginTop: 24, borderTop: "1px solid var(--glass-line)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="cz-finding">
                  <span className="cz-badge cz-badge--critical cz-finding-badge">Critical</span>
                  <span className="cz-text-sm cz-finding-text">
                    Missing signer check in <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em", color: "var(--cz-cyan-soft)" }}>#[account]</code> constraint allows privilege escalation
                  </span>
                  <span className="cz-mono-label cz-finding-status">Resolved</span>
                </div>
                <div className="cz-finding">
                  <span className="cz-badge cz-badge--high cz-finding-badge">Major</span>
                  <span className="cz-text-sm cz-finding-text">
                    Integer overflow in token vault via unchecked <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em", color: "var(--cz-cyan-soft)" }}>u64</code> multiplication
                  </span>
                  <span className="cz-mono-label cz-finding-status">Resolved</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            padding: "22px 30px",
            borderTop: "1px solid var(--glass-line)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span className="cz-text-muted">
            Every report includes scope, methodology, proofs of concept and remediation advice.
          </span>
          <button
            onClick={openForm}
            className="cz-btn cz-btn--glass cz-btn--md"
          >
            Get an audit like this
          </button>
        </div>
      </div>

      <style>{`
        .cz-report-cols { display: grid; grid-template-columns: 0.9fr 1.1fr; }
        .cz-report-left { border-right: 1px solid var(--glass-line); }
        .cz-finding {
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-areas: "badge text status";
          align-items: center;
          gap: 8px 12px;
        }
        .cz-finding-badge { grid-area: badge; justify-self: start; }
        .cz-finding-text { grid-area: text; min-width: 0; }
        .cz-finding-status { grid-area: status; color: var(--status-success); }
        @media (max-width: 767px) {
          .cz-report-cols { grid-template-columns: 1fr; }
          .cz-report-left { border-right: none; border-bottom: 1px solid var(--glass-line); }
          .cz-finding {
            grid-template-columns: 1fr auto;
            grid-template-areas: "badge status" "text text";
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedReport;
