import * as React from "react";
import { Link } from "gatsby";
import { acceptAnalytics, getConsent, onOpenCookieSettings, rejectAnalytics } from "../lib/consent";

const CookieBanner = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!getConsent()) setOpen(true);
    return onOpenCookieSettings(() => setOpen(true));
  }, []);

  if (!open) return null;

  const choose = (accept) => {
    setOpen(false);
    if (accept) acceptAnalytics();
    else rejectAnalytics();
  };

  return (
    <section aria-label="Cookie consent" className="cz-cookie-banner">
      <p style={{ margin: 0, color: "var(--text-body)", fontSize: "var(--fs-small)", lineHeight: 1.6 }}>
        We'd like to use analytics cookies (Google Analytics and Microsoft Clarity) to understand how
        the site is used. They're only set if you accept. You can change your choice at any time from
        the footer. <Link to="/privacy-policy/" style={{ color: "var(--cz-cyan-soft)" }}>Privacy policy</Link>
      </p>
      <div className="cz-cookie-actions">
        <button type="button" onClick={() => choose(false)} className="cz-btn cz-btn--ghost cz-btn--md">
          Reject
        </button>
        <button type="button" onClick={() => choose(true)} className="cz-btn cz-btn--ghost cz-btn--md">
          Accept
        </button>
      </div>
      <style>{`
        .cz-cookie-banner {
          position: fixed;
          left: 50%;
          bottom: 20px;
          z-index: 90;
          transform: translateX(-50%);
          width: min(760px, calc(100% - 32px));
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 24px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-line-strong);
          background: rgba(12,14,23,0.96);
          box-shadow: var(--shadow-float);
        }
        .cz-cookie-actions { display: flex; gap: 10px; flex-shrink: 0; }
        @media (max-width: 767px) {
          .cz-cookie-banner { flex-direction: column; align-items: stretch; gap: 16px; bottom: 16px; padding: 18px; }
          .cz-cookie-actions .cz-btn { flex: 1; }
        }
      `}</style>
    </section>
  );
};

export default CookieBanner;
