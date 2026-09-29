import * as React from "react";
import auditIcon from "../assets/icons/smart-contract-audits.svg";
import consultingIcon from "../assets/icons/blockchain-consulting.svg";
import recoveryIcon from "../assets/icons/disaster-recovery.svg";

const SERVICES = [
  {
    icon: auditIcon,
    title: "Smart Contract Audits",
    description:
      "Line-by-line review of Solidity, Rust, Anchor, CosmWasm, and Golang code. We identify vulnerabilities and harden your protocol before mainnet.",
  },
  {
    icon: consultingIcon,
    title: "Blockchain Consulting",
    description:
      "Expert guidance on EVM, Solana, and Cosmos SDK architectures. From protocol design to deployment and ongoing security hardening.",
  },
  {
    icon: recoveryIcon,
    title: "Disaster Recovery",
    description:
      "Rapid incident response plans that protect users, minimize downtime, and restore operations when exploits strike.",
  },
];

const ServiceCard = ({ icon, title, description }) => (
  <div
    style={{
      padding: "28px 24px 32px",
      background: "var(--glass)",
      border: "1px solid var(--glass-line)",
      borderRadius: "var(--radius-lg)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      transition: "border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)",
    }}
    className="cz-service-card"
  >
    <div
      style={{
        width: 48,
        height: 48,
        marginBottom: 24,
        borderRadius: "var(--radius-md)",
        background: "rgba(4,217,255,0.07)",
        border: "1px solid rgba(4,217,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
          <img src={icon} alt="" aria-hidden="true" style={{ width: 26, height: 26 }} />
    </div>
    <h3 className="cz-card-heading" style={{ lineHeight: "var(--lh-snug)" }}>{title}</h3>
    <p className="cz-text-sm" style={{ marginTop: 12 }}>{description}</p>
  </div>
);

const Services = () => (
  <section
    id="services"
    data-reveal
    className="cz-section"
    style={{ paddingTop: 24, scrollMarginTop: 80 }}
  >
    <h2 className="cz-section-heading">
      Comprehensive security for decentralized systems
    </h2>
    <div className="cz-services-grid">
      {SERVICES.map((s) => (
        <ServiceCard key={s.title} {...s} />
      ))}
    </div>
    <style>{`
      .cz-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 44px; }
      .cz-service-card:hover {
        border-color: var(--glass-line-strong);
        box-shadow: var(--glow-cyan);
      }
      @media (max-width: 1023px) {
        .cz-services-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 767px) {
        .cz-services-grid { grid-template-columns: 1fr; }
      }
    `}</style>
  </section>
);

export default Services;
