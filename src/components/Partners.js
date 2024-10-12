import React from "react";
import first from "../images/ethereum.svg";
import solana from "../images/solana.svg";
import polkadot from "../images/polkadot.svg";
import bitcoin from "../images/bitcoin.svg";
import cosmos from "../images/cosmos.svg";

const Partners = () => {
  const logos = [first, solana, polkadot, bitcoin, cosmos];

  return (
    <>
      <div className="logo-carousel">
        <div className="logos">
          {logos.map((logo, index) => (
            <div key={index} className="logo-placeholder">
              <img src={logo} alt={`Logo ${index + 1}`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Partners;
