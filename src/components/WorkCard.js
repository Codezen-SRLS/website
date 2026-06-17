import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const CHAIN_COLORS = {
  ethereum: "rgba(98,126,234,0.15)",
  solana: "rgba(20,241,149,0.08)",
  cosmos: "rgba(29,102,245,0.12)",
  polkadot: "rgba(230,0,122,0.1)",
  bitcoin: "rgba(247,147,26,0.1)",
};

const getChainKey = (tags = []) => {
  const t = tags.map((s) => s.toLowerCase());
  if (t.includes("solana")) return "solana";
  if (t.includes("cosmos") || t.includes("substrate") || t.includes("cosmwasm")) return "cosmos";
  if (t.includes("polkadot")) return "polkadot";
  if (t.includes("bitcoin")) return "bitcoin";
  return "ethereum";
};

const WorkCard = ({ title, description, tags, partner, github, website, imageData }) => {
  const chainKey = getChainKey(tags);
  const bg = CHAIN_COLORS[chainKey] || CHAIN_COLORS.ethereum;
  const href = github || website || "#";

  return (
    <a
      href={href}
      target={href !== "#" ? "_blank" : undefined}
      rel={href !== "#" ? "noopener noreferrer" : undefined}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      className="cz-work-card"
    >
      <div
        style={{
          background: "var(--glass)",
          border: "1px solid var(--glass-line)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          transition: "border-color var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card image area */}
        <div
          style={{
            height: 160,
            background: `radial-gradient(circle at 50% 45%, rgba(4,217,255,0.14), transparent 62%), radial-gradient(120% 120% at 80% 100%, rgba(49,46,129,0.4), transparent 60%), ${bg}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imageData ? (
            <GatsbyImage
              image={imageData}
              alt={title || ""}
              style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
              imgStyle={{ objectFit: "cover", opacity: 0.7 }}
            />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 28,
                letterSpacing: "0.05em",
                color: "var(--cz-cyan-soft)",
                opacity: 0.35,
              }}
            >
              {(title || "").split(/\s+/).slice(0, 3).map((w) => w[0]).join("").toUpperCase()}
            </span>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span className="cz-tag">{description}</span>
            {partner && (
              <span className="cz-mono-label">{partner}</span>
            )}
          </div>
          <h3 className="cz-card-heading" style={{ flex: 1, fontSize: 20 }}>
            {title}
          </h3>
          {tags && tags.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="cz-mono-label"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "var(--radius-pill)",
                    padding: "3px 9px",
                    border: "1px solid var(--glass-line)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .cz-work-card:hover > div {
          border-color: var(--glass-line-strong);
          transform: translateY(-3px);
          box-shadow: var(--glow-cyan);
        }
      `}</style>
    </a>
  );
};

export default WorkCard;
