import * as React from "react";
import ethereumIcon from "../assets/icons/chains/ethereum.svg";
import solanaIcon from "../assets/icons/chains/solana.svg";
import cosmosIcon from "../assets/icons/chains/cosmos.svg";
import polkadotIcon from "../assets/icons/chains/polkadot.svg";
import bitcoinIcon from "../assets/icons/chains/bitcoin.svg";

const CHAINS = [
  { src: ethereumIcon, alt: "Ethereum", height: 26 },
  { src: solanaIcon, alt: "Solana", height: 24 },
  { src: cosmosIcon, alt: "Cosmos", height: 26 },
  { src: polkadotIcon, alt: "Polkadot", height: 24 },
  { src: bitcoinIcon, alt: "Bitcoin", height: 28 },
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
      {CHAINS.map(({ src, alt, height }) => (
        <img
          key={alt}
          src={src}
          alt={alt}
          style={{
            height,
            filter: "brightness(0) invert(1)",
            opacity: 0.72,
          }}
        />
      ))}
    </div>
    <style>{`
      @media (max-width: 767px) {
        .cz-chain-strip { flex-direction: column; align-items: flex-start; gap: 20px; }
        .cz-chain-logos { gap: 28px; }
      }
    `}</style>
  </section>
);

export default ChainStrip;
