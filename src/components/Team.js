import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

const FounderCard = ({ name, role, description, website }) => (
  <div className="cz-founder-card">
    <div className="cz-founder-photo">
      <StaticImage
        src="../images/christianvari.jpeg"
        alt={name}
        style={{ width: "100%", height: "100%" }}
        imgStyle={{ objectFit: "cover", objectPosition: "50% 15%" }}
        placeholder="none"
        layout="fullWidth"
      />
    </div>

    <div className="cz-founder-info">
      <div className="cz-mono-accent" style={{ marginBottom: 14 }}>
        {role}
      </div>

      <h2
        style={{
          margin: 0,
          color: "var(--text-strong)",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700,
          lineHeight: "var(--lh-tight)",
          letterSpacing: "var(--ls-tight)",
        }}
      >
        {name}
      </h2>

      <p
        style={{
          margin: "18px 0 0",
          color: "var(--text-body)",
          fontSize: 15,
          fontWeight: "var(--fw-light)",
          lineHeight: 1.75,
          maxWidth: 480,
        }}
      >
        {description}
      </p>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="cz-flink"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 28,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--cz-cyan-soft)",
          }}
        >
          {website.replace(/^https?:\/\//, "")} →
        </a>
      )}
    </div>

    <style>{`
      .cz-founder-card {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 0;
        align-items: stretch;
        padding: 0;
        background: var(--glass);
        border: 1px solid var(--glass-line);
        border-radius: var(--radius-lg);
        overflow: hidden;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        margin-top: 44px;
        min-height: 380px;
      }
      .cz-founder-photo {
        position: relative;
        overflow: hidden;
      }
      .cz-founder-photo > * {
        position: absolute !important;
        inset: 0;
        width: 100% !important;
        height: 100% !important;
      }
      .cz-founder-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 48px 52px;
        border-left: 1px solid var(--glass-line);
      }
      @media (max-width: 1023px) {
        .cz-founder-card { grid-template-columns: 240px 1fr; min-height: 320px; }
        .cz-founder-info { padding: 36px 40px; }
      }
      @media (max-width: 767px) {
        .cz-founder-card { grid-template-columns: 1fr; min-height: 0; }
        .cz-founder-photo { height: 280px; position: relative; }
        .cz-founder-info { padding: 32px 28px; border-left: none; border-top: 1px solid var(--glass-line); }
      }
    `}</style>
  </div>
);

const GenericMemberCard = ({ name, role, description, website }) => (
  <div
    style={{
      padding: "32px 28px",
      background: "var(--glass)",
      border: "1px solid var(--glass-line)",
      borderRadius: "var(--radius-lg)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid rgba(4,217,255,0.25)",
        background: "var(--glass-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--cz-cyan-soft)",
        fontFamily: "var(--font-mono)",
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 18,
      }}
    >
      {(name || "").charAt(0)}
    </div>
    <h3 style={{ margin: 0, color: "var(--text-strong)", fontSize: 20, fontWeight: 600 }}>{name}</h3>
    <div style={{ marginTop: 5, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-accent)" }}>
      {role}
    </div>
    <p style={{ margin: "12px 0 0", color: "var(--text-body)", fontSize: 14, fontWeight: "var(--fw-light)", lineHeight: 1.7 }}>
      {description}
    </p>
    {website && (
      <a href={website} target="_blank" rel="noopener noreferrer" className="cz-flink"
        style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--cz-cyan-soft)" }}>
        {website.replace(/^https?:\/\//, "")} →
      </a>
    )}
  </div>
);

const Team = ({ members = [] }) => {
  if (!members || members.length === 0) return null;

  const christian = members.find((m) => m.name === "Christian Vari");
  const rest = members.filter((m) => m.name !== "Christian Vari");

  return (
    <section data-reveal style={{ padding: "104px 0 0" }}>
      <span className="cz-eyebrow">Lead Auditor</span>
      <h2 className="cz-section-heading">The expert behind every engagement</h2>

      {christian && (
        <FounderCard {...christian} />
      )}

      {rest.length > 0 && (
        <div className="cz-team-grid" style={{ marginTop: 22 }}>
          {rest.map((member) => (
            <GenericMemberCard key={member.name} {...member} />
          ))}
        </div>
      )}

      <style>{`
        .cz-team-grid { display: grid; gap: 22px; }
        @media (min-width: 768px) { .cz-team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .cz-team-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </section>
  );
};

export default Team;
