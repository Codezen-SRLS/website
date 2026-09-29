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
  <section data-reveal className="cz-chain-strip">
    <span style={{ fontSize: "var(--fs-small)", color: "var(--text-body)" }}>
      Audited across every major ecosystem
    </span>
    <div className="cz-chain-logos">
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
      .cz-chain-strip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 32px;
        padding: 26px 0;
        border-top: 1px solid var(--glass-line);
        border-bottom: 1px solid var(--glass-line);
      }
      .cz-chain-logos { display: flex; align-items: center; gap: 48px; }
      .cz-chain-logo {
        height: 26px;
        width: auto;
        max-width: 120px;
        object-fit: contain;
        filter: brightness(0) invert(1);
        opacity: 0.72;
        flex-shrink: 0;
      }
      /* Below desktop the caption and logos no longer fit on one line:
         stack them and let the logos flow into as many columns as fit */
      @media (max-width: 1199px) {
        .cz-chain-strip { flex-direction: column; align-items: flex-start; gap: 18px; }
        .cz-chain-logos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
          align-items: center;
          gap: 22px 24px;
          width: 100%;
        }
        .cz-chain-logo { height: 22px; max-width: 100%; }
      }
    `}</style>
  </section>
);

export default ChainStrip;
