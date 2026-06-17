import * as React from "react";
import { useForm } from "../context/FormContext";

const Hero = ({ auditCount, vulnCount }) => {
  const { openForm } = useForm();

  return (
    <section
      id="top"
      style={{
        padding: "72px 0 84px",
        scrollMarginTop: 90,
      }}
    >
      <div className="cz-hero-grid">
        {/* Left: copy */}
        <div>
          <span className="cz-eyebrow">Securing Web3 &amp; Blockchain</span>
          <h1
            style={{
              margin: "22px 0 0",
              color: "var(--text-strong)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
            className="cz-hero-h1"
          >
            Security that
            <br />
            reads <span className="cz-iris-anim">every line</span>
            <br />
            of your protocol.
          </h1>
          <p
            style={{
              margin: "28px 0 0",
              color: "var(--text-body)",
              fontSize: "var(--fs-body-lg)",
              fontWeight: "var(--fw-light)",
              lineHeight: "var(--lh-relaxed)",
              maxWidth: 480,
            }}
            className="cz-hero-body"
          >
            Smart contract audits and security consulting for EVM, Solana, and Cosmos protocols. We review Solidity, Rust, Anchor, and CosmWasm code and surface what attackers look for.
          </p>
          <div
            style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}
            className="cz-hero-btns"
          >
            <button
              onClick={openForm}
              className="cz-btn cz-btn--primary cz-btn--lg"
              style={{ border: "none" }}
            >
              Secure your project
            </button>
            <a href="#report" className="cz-btn cz-btn--ghost cz-btn--lg" style={{ textDecoration: "none" }}>
              View audit reports
            </a>
          </div>
          <div
            style={{
              display: "flex",
              gap: 30,
              marginTop: 42,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-mono-sm)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              flexWrap: "wrap",
            }}
          >
            <span>
              <b style={{ color: "var(--cz-cyan-soft)", fontWeight: 600 }}>{auditCount}+</b> audits
            </span>
            <span>
              <b style={{ color: "var(--cz-cyan-soft)", fontWeight: 600 }}>{vulnCount}+</b> vulns found
            </span>
            <span>
              <b style={{ color: "var(--cz-cyan-soft)", fontWeight: 600 }}>$1.2B+</b> protected
            </span>
          </div>
        </div>

        {/* Right: live scan panel */}
        <div
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--glass-line)",
            background: "rgba(7,8,13,0.66)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "var(--glow-cyan)",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "var(--text-body)",
              }}
            >
              <span
                style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }}
              />
              vault.rs
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              AUDIT SESSION
            </span>
          </div>

          {/* Code panel */}
          <div style={{ position: "relative", padding: "20px 18px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 2.0 }}>
            {/* Scan beam */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 64,
                background: "linear-gradient(180deg,transparent,rgba(4,217,255,0.16) 60%,rgba(4,217,255,0.9))",
                borderBottom: "1px solid rgba(4,217,255,0.9)",
                animation: "cz-scan 3.6s var(--ease) infinite",
                pointerEvents: "none",
              }}
            />

            <div style={{ color: "rgba(232,238,255,0.4)" }}>
              <span style={{ color: "rgba(232,238,255,0.25)" }}>01</span>
              &nbsp;&nbsp;#[<span style={{ color: "#9fe6b4" }}>derive</span>(Accounts)]
            </div>
            <div style={{ color: "rgba(232,238,255,0.4)" }}>
              <span style={{ color: "rgba(232,238,255,0.25)" }}>02</span>
              &nbsp;&nbsp;<span style={{ color: "#5be4ff" }}>pub struct</span> Withdraw&lt;<span style={{ color: "#5be4ff" }}>'info</span>&gt; &#123;
            </div>
            <div
              style={{
                position: "relative",
                color: "#ffd2d2",
                background: "rgba(255,92,92,0.1)",
                margin: "0 -18px",
                padding: "0 18px",
                animation: "cz-flag 2.6s var(--ease) infinite",
              }}
            >
              <span style={{ color: "rgba(232,238,255,0.25)" }}>03</span>
              &nbsp;&nbsp;&nbsp;&nbsp;#[<span style={{ color: "#9fe6b4" }}>account</span>(mut)]
            </div>
            <div
              style={{
                position: "relative",
                color: "#ffd2d2",
                background: "rgba(255,92,92,0.1)",
                margin: "0 -18px",
                padding: "0 18px",
                animation: "cz-flag 2.6s var(--ease) infinite",
              }}
            >
              <span style={{ color: "rgba(232,238,255,0.25)" }}>04</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#5be4ff" }}>pub</span> vault: Account&lt;<span style={{ color: "#5be4ff" }}>'info</span>, Vault&gt;,
            </div>
            <div style={{ color: "rgba(232,238,255,0.4)" }}>
              <span style={{ color: "rgba(232,238,255,0.25)" }}>05</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#5be4ff" }}>pub</span> authority: Signer&lt;<span style={{ color: "#5be4ff" }}>'info</span>&gt;,
            </div>
            <div style={{ color: "rgba(232,238,255,0.4)" }}>
              <span style={{ color: "rgba(232,238,255,0.25)" }}>06</span>
              &nbsp;&nbsp;&#125;
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 15,
                  marginLeft: 3,
                  background: "var(--cz-cyan)",
                  verticalAlign: "-2px",
                  animation: "cz-blink 1.1s step-end infinite",
                }}
              />
            </div>
          </div>

          {/* Finding bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 16px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,92,92,0.06)",
            }}
          >
            <span className="cz-badge cz-badge--high" style={{ color: "#ff5c5c" }}>High</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-body)" }}>
              Missing has_one = authority: any signer can drain the vault (L03 to L04)
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .cz-hero-grid {
          display: grid;
          grid-template-columns: 1.18fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .cz-hero-h1 { font-size: var(--fs-display); }

        @media (max-width: 1023px) {
          .cz-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .cz-hero-h1 { font-size: 52px; }
        }
        @media (max-width: 767px) {
          .cz-hero-h1 { font-size: clamp(36px, 9vw, 48px); }
          .cz-hero-body { font-size: var(--fs-body); max-width: 100%; }
          .cz-hero-btns { flex-direction: column; }
          .cz-hero-btns .cz-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
