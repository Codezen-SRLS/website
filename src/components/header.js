import * as React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import markLogo from "../assets/logos/mark-white.svg";
import wordmarkLogo from "../assets/logos/wordmark-white.svg";
import { useForm } from "../context/FormContext";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Reports", href: "#report" },
  { label: "Work", href: "#work" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { openForm } = useForm();
  const location = useLocation();
  const isPortfolio = location?.pathname?.startsWith("/portfolio");

  const closeMenu = () => setMenuOpen(false);
  const handleAuditClick = () => { openForm(); closeMenu(); };

  const navHref = (href) => isPortfolio ? `/${href}` : href;

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(10,11,18,0.72)",
          borderBottom: "1px solid var(--glass-line)",
        }}
      >
        <div
          className="cz-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 32px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 11,
              textDecoration: "none",
            }}
          >
            <img src={markLogo} alt="" aria-hidden="true" style={{ height: 34, width: "auto" }} />
            <img src={wordmarkLogo} alt="Codezen" style={{ height: 20, width: "auto" }} />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: 30 }}
            className="cz-header-nav"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={navHref(href)} className="cz-navlink">
                {label}
              </a>
            ))}
            <button
              className="cz-btn cz-btn--primary cz-btn--md"
              onClick={handleAuditClick}
              style={{ border: "none" }}
            >
              Get an audit
            </button>
          </nav>

          {/* Hamburger */}
          <button
            className="cz-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--glass-line)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 10px",
              color: "var(--text-strong)",
              cursor: "pointer",
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(10,11,18,0.96)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid var(--glass-line)",
            padding: "24px 24px 32px",
            animation: "cz-menu-in 0.2s var(--ease) both",
          }}
        >
          <nav
            aria-label="Mobile navigation"
            style={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={navHref(href)}
                className="cz-navlink"
                onClick={closeMenu}
                style={{ padding: "12px 0", borderBottom: "1px solid var(--glass-line)" }}
              >
                {label}
              </a>
            ))}
            <button
              className="cz-btn cz-btn--primary cz-btn--md"
              onClick={handleAuditClick}
              style={{ marginTop: 16, border: "none", width: "100%", justifyContent: "center" }}
            >
              Get an audit
            </button>
          </nav>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      )}

      <style>{`
        @media (max-width: 767px) {
          .cz-header-nav { display: none !important; }
          .cz-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
