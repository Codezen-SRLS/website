import * as React from "react";

const STEPS = [
  {
    index: "01",
    title: "Discovery",
    description:
      "We analyze your project's requirements and unique challenges, laying the foundation for a customized security strategy.",
  },
  {
    index: "02",
    title: "Audit",
    description:
      "We perform an exhaustive security audit, pinpointing vulnerabilities across contracts, architecture, and critical components.",
  },
  {
    index: "03",
    title: "Reporting",
    description:
      "We deliver an in-depth report with actionable solutions to mitigate risks and fortify your project.",
  },
  {
    index: "04",
    title: "Support",
    description:
      "We provide continuous support through implementation and keep your project protected over time.",
  },
];

const NODE_STYLE = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "var(--cz-base)",
  border: "1px solid var(--cz-cyan)",
  boxShadow: "0 0 12px rgba(4,217,255,0.7)",
};

const Process = () => (
  <section
    id="process"
    data-reveal
    style={{ padding: "104px 0 0", scrollMarginTop: 90 }}
  >
    <span className="cz-eyebrow">How We Work</span>
    <h2 className="cz-section-heading">A proven approach to securing blockchain projects</h2>

    {/* Desktop: horizontal timeline */}
    <div style={{ position: "relative", marginTop: 52 }} className="cz-process-desktop">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 7,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--iris-rule)",
        }}
      />
      <div className="cz-process-grid">
        {STEPS.map(({ index, title, description }) => (
          <div key={index} style={{ position: "relative", paddingTop: 34 }}>
            <span aria-hidden="true" style={NODE_STYLE} />
            <div className="cz-mono-accent" style={{ letterSpacing: "0.18em" }}>{index}</div>
            <h3 className="cz-card-heading" style={{ marginTop: 12 }}>{title}</h3>
            <p className="cz-text-sm" style={{ marginTop: 10 }}>{description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Mobile: vertical timeline */}
    <div className="cz-process-mobile" style={{ marginTop: 40, display: "none" }}>
      {STEPS.map(({ index, title, description }, i) => (
        <div
          key={index}
          style={{
            position: "relative",
            paddingLeft: 32,
            paddingBottom: i < STEPS.length - 1 ? 36 : 0,
          }}
        >
          {/* Vertical line */}
          {i < STEPS.length - 1 && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 7,
                top: 15,
                bottom: 0,
                width: 1,
                background: "var(--iris-rule)",
              }}
            />
          )}
          <span aria-hidden="true" style={{ ...NODE_STYLE, top: 0, left: 0 }} />
          <div className="cz-mono-accent" style={{ letterSpacing: "0.18em" }}>{index}</div>
          <h3 className="cz-card-heading" style={{ marginTop: 10 }}>{title}</h3>
          <p className="cz-text-sm" style={{ marginTop: 8 }}>{description}</p>
        </div>
      ))}
    </div>

    <style>{`
      .cz-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
      @media (max-width: 1023px) {
        .cz-process-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 767px) {
        .cz-process-desktop { display: none; }
        .cz-process-mobile { display: block !important; }
      }
    `}</style>
  </section>
);

export default Process;
