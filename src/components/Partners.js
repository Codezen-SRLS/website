import React from "react";
import first from "../images/ethereum.svg";
import solana from "../images/solana.svg";
import polkadot from "../images/polkadot.svg";
import bitcoin from "../images/bitcoin.svg";
import cosmos from "../images/cosmos.svg";
import "./Partners.css";
import Marquee from "react-marquee-slider";

const Partners = () => {
  const logos = [first, solana, polkadot, bitcoin, cosmos];

  return (
    <>
      <div className="logo-carousel">
        <Marquee velocity={50} scatterRandomly={false}>
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="logo-placeholder">
              <img src={logo} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </Marquee>
      </div>
      <hr />
    </>
  );
};

export default Partners;
