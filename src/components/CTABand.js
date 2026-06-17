import * as React from "react";
import { useForm } from "../context/FormContext";

const CTABand = () => {
  const { openForm } = useForm();

  return (
    <section data-reveal style={{ padding: "104px 0 24px" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--glass-line)",
          padding: "72px 48px",
          textAlign: "center",
          background:
            "radial-gradient(120% 140% at 50% 0%, rgba(4,217,255,0.16), transparent 60%), radial-gradient(120% 160% at 50% 120%, rgba(49,46,129,0.5), transparent 60%), var(--glass)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "var(--shadow-card)",
        }}
        className="cz-cta-inner"
      >
        <span className="cz-eyebrow" style={{ display: "block", marginBottom: 18 }}>
          Ready When You Are
        </span>
        <h2
          style={{
            margin: "0 auto",
            maxWidth: 680,
            color: "var(--text-strong)",
            fontWeight: "var(--fw-bold)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
          className="cz-cta-heading"
        >
          Secure your protocol before{" "}
          <span className="cz-iris-anim">someone else finds the bug.</span>
        </h2>
        <p
          style={{
            margin: "20px auto 0",
            maxWidth: 520,
            color: "var(--text-body)",
            fontSize: 18,
            fontWeight: "var(--fw-light)",
            lineHeight: "var(--lh-relaxed)",
          }}
        >
          Tell us about your project and we'll scope an audit within one business day.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 34 }}>
          <button
            onClick={openForm}
            className="cz-btn cz-btn--primary cz-btn--lg"
            style={{ border: "none" }}
          >
            Let's get an audit
          </button>
        </div>
      </div>
      <style>{`
        .cz-cta-heading { font-size: 48px; }
        @media (max-width: 1023px) {
          .cz-cta-heading { font-size: 38px; }
        }
        @media (max-width: 767px) {
          .cz-cta-heading { font-size: clamp(28px, 7vw, 36px); }
          .cz-cta-inner { padding: 48px 24px; }
        }
      `}</style>
    </section>
  );
};

export default CTABand;
