import * as React from "react";
import emailjs from "@emailjs/browser";
import { useForm as useFormCtx } from "../context/FormContext";

const INPUT_STYLE = {
  display: "block",
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--glass-line)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text-strong)",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  padding: "11px 14px",
  outline: "none",
  transition: "border-color var(--dur-fast) var(--ease)",
};

const LABEL_STYLE = {
  display: "block",
  marginBottom: 6,
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

const RequestForm = () => {
  const { isOpen, closeForm } = useFormCtx();
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    project: "",
    details: "",
  });

  React.useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setSent(false);
        setFields({ name: "", email: "", project: "", details: "" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeForm(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeForm]);

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        process.env.GATSBY_EMAILJS_SERVICE_ID,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.name,
          from_email: fields.email,
          project: fields.project,
          message: fields.details,
        },
        process.env.GATSBY_EMAILJS_PUBLIC_KEY
      );
    } catch (_) {}
    setSending(false);
    setSent(true);
  };

  if (!isOpen) return null;

  const firstName = (fields.name || "").trim().split(/\s+/)[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request an audit"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(5,6,11,0.66)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Backdrop click target */}
      <div
        aria-hidden="true"
        onClick={closeForm}
        style={{ position: "fixed", inset: 0, zIndex: -1 }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--glass-line-strong)",
          background: "rgba(12,14,23,0.96)",
          boxShadow: "var(--shadow-float)",
          padding: 40,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={closeForm}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 34,
            height: 34,
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--glass-line)",
            background: "var(--glass)",
            color: "var(--text-body)",
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                margin: "0 auto",
                borderRadius: "50%",
                border: "1px solid rgba(47,212,138,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 28px -6px rgba(47,212,138,0.5)",
              }}
            >
              <span style={{ color: "var(--status-success)", fontSize: 30 }}>✓</span>
            </div>
            <h3
              style={{
                margin: "24px 0 0",
                color: "var(--text-strong)",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Request received
            </h3>
            <p style={{ margin: "12px 0 0", color: "var(--text-body)", fontSize: 15, lineHeight: 1.6 }}>
              Thanks{firstName ? `, ${firstName}` : ""}. We will scope your audit and reply within one business day.
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
              <button onClick={closeForm} className="cz-btn cz-btn--ghost cz-btn--md">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="cz-eyebrow">Request an Audit</span>
            <h3
              style={{
                margin: "16px 0 0",
                color: "var(--text-strong)",
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Let's secure your project
            </h3>
            <p style={{ margin: "10px 0 0", color: "var(--text-body)", fontSize: 15, lineHeight: 1.6 }}>
              Share a few details and we'll get back within one business day.
            </p>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26 }}
            >
              <div>
                <label htmlFor="rf-name" style={LABEL_STYLE}>Name *</label>
                <input
                  id="rf-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={fields.name}
                  onChange={set("name")}
                  style={INPUT_STYLE}
                />
              </div>
              <div>
                <label htmlFor="rf-email" style={LABEL_STYLE}>Email *</label>
                <input
                  id="rf-email"
                  type="email"
                  required
                  placeholder="you@project.xyz"
                  value={fields.email}
                  onChange={set("email")}
                  style={INPUT_STYLE}
                />
              </div>
              <div>
                <label htmlFor="rf-project" style={LABEL_STYLE}>Project / Protocol</label>
                <input
                  id="rf-project"
                  type="text"
                  placeholder="Protocol name & chain"
                  value={fields.project}
                  onChange={set("project")}
                  style={INPUT_STYLE}
                />
              </div>
              <div>
                <label htmlFor="rf-details" style={LABEL_STYLE}>Request Details</label>
                <textarea
                  id="rf-details"
                  rows={4}
                  placeholder="Codebase, scope, timeline…"
                  value={fields.details}
                  onChange={set("details")}
                  style={{ ...INPUT_STYLE, resize: "vertical", lineHeight: 1.5 }}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="cz-btn cz-btn--primary cz-btn--lg"
                style={{ marginTop: 6, width: "100%", justifyContent: "center", border: "none" }}
              >
                {sending ? "Sending…" : "Submit your request"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestForm;
