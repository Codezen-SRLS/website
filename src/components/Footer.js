import * as React from "react";
import { Link } from "gatsby";
import markLogo from "../assets/logos/mark-white.svg";
import wordmarkLogo from "../assets/logos/wordmark-white.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import { useForm } from "../context/FormContext";

const NAV_SECTIONS = [
  {
    heading: "Company",
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Our Work", href: "#work" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Smart Contract Audits", href: "#services" },
      { label: "Blockchain Consulting", href: "#services" },
      { label: "Disaster Recovery", href: "#services" },
    ],
  },
];

const Footer = () => {
  const { openForm } = useForm();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        marginTop: 72,
        borderTop: "1px solid var(--glass-line)",
        background: "rgba(7,8,13,0.5)",
      }}
    >
      <div className="cz-container" style={{ padding: "56px 32px 28px" }}>
        <div
          style={{
            display: "grid",
            gap: 32,
          }}
          className="cz-footer-grid"
        >
          {/* Brand col */}
          <div>
            <Link
              to="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none" }}
            >
              <img src={markLogo} alt="" aria-hidden="true" style={{ height: 34, width: "auto" }} />
              <img src={wordmarkLogo} alt="Codezen" style={{ height: 20, width: "auto" }} />
            </Link>
            <p className="cz-text-muted" style={{ margin: "18px 0 0", maxWidth: 300 }}>
              Smart contract security audits and consulting for EVM, Solana, and Cosmos. We review Solidity, Rust, Anchor, CosmWasm, and Substrate protocols.
            </p>
            <p className="cz-text-muted" style={{ margin: "12px 0 0" }}>
              An{" "}
              <a
                href="https://www.altairith.capital"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--cz-cyan-soft)", textDecoration: "none" }}
              >
                Altairith Capital
              </a>{" "}
              company
            </p>
          </div>

          {NAV_SECTIONS.map(({ heading, links }) => (
            <div key={heading}>
              <div className="cz-mono-label" style={{ marginBottom: 16, letterSpacing: "0.16em" }}>
                {heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map(({ label, href }) =>
                  href.startsWith("/") ? (
                    <Link key={label} to={href} className="cz-flink">{label}</Link>
                  ) : (
                    <a key={label} href={href} className="cz-flink">{label}</a>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Contact col */}
          <div>
            <div className="cz-mono-label" style={{ marginBottom: 16, letterSpacing: "0.16em" }}>
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <a href="mailto:info@codezen.tech" className="cz-flink">
                info@codezen.tech
              </a>
              <button
                onClick={openForm}
                className="cz-flink"
                style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
              >
                Request an audit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: "1px solid var(--glass-line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span className="cz-mono-label" suppressHydrationWarning>
            © {new Date().getFullYear()} Codezen · codezen.tech
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a
              href="https://x.com/CodezenSRLS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--glass-line)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color var(--dur-fast) var(--ease)",
              }}
            >
              <img
                src={twitterIcon}
                alt=""
                aria-hidden="true"
                style={{ width: 16, height: 16, filter: "brightness(0) invert(1)", opacity: 0.7 }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/codezensrls"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--glass-line)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color var(--dur-fast) var(--ease)",
              }}
            >
              <img
                src={linkedinIcon}
                alt=""
                aria-hidden="true"
                style={{ width: 16, height: 16, filter: "brightness(0) invert(1)", opacity: 0.7 }}
              />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cz-footer-grid {
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
        }
        @media (max-width: 1023px) {
          .cz-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 767px) {
          .cz-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
