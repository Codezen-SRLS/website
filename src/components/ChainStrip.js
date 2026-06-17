import * as React from "react";
import ethereumIcon from "../assets/icons/chains/ethereum.svg";
import solanaIcon from "../assets/icons/chains/solana.svg";
import cosmosIcon from "../assets/icons/chains/cosmos.svg";
import polkadotIcon from "../assets/icons/chains/polkadot.svg";
import bitcoinIcon from "../assets/icons/chains/bitcoin.svg";

const CHAINS = [
  { src: ethereumIcon, alt: "Ethereum" },
  { src: solanaIcon, alt: "Solana" },
  { src: cosmosIcon, alt: "Cosmos" },
  { src: polkadotIcon, alt: "Polkadot" },
  { src: bitcoinIcon, alt: "Bitcoin" },
];

const ChainStrip = () => (
  <section
    data-reveal
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
      flexWrap: "wrap",
      padding: "26px 0",
      borderTop: "1px solid var(--glass-line)",
      borderBottom: "1px solid var(--glass-line)",
    }}
    className="cz-chain-strip"
  >
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono-sm)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
      }}
    >
      Audited across every major ecosystem
    </span>
    <div
      style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}
      className="cz-chain-logos"
    >
      {CHAINS.map(({ src, alt }) => (
        <img
          key={alt}
          src={src}
          alt={alt}
          className="cz-chain-logo"
        />
      ))}
    </div>
    <style>{`
      .cz-chain-logo {
        height: 26px;
        width: auto;
        max-width: 120px;
        object-fit: contain;
        filter: brightness(0) invert(1);
        opacity: 0.72;
        flex-shrink: 0;
      }
      @media (max-width: 767px) {
        .cz-chain-strip { flex-direction: column; align-items: flex-start; gap: 18px; }
        .cz-chain-logos {
          gap: 32px;
          flex-wrap: nowrap;
          overflow-x: auto;
          width: 100%;
          padding-bottom: 4px;
          scrollbar-width: none;
        }
        .cz-chain-logos::-webkit-scrollbar { display: none; }
      }
    `}</style>
  </section>
);

export default ChainStrip;
