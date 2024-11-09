import React from "react";
import first from "../images/ethereum.svg";
import solana from "../images/solana.svg";
import polkadot from "../images/polkadot.svg";
import bitcoin from "../images/bitcoin.svg";
import cosmos from "../images/cosmos.svg";
import "./Partners.css";
import Slider from "react-infinite-logo-slider";

const Partners = () => {
  const logos = [first, solana, polkadot, bitcoin, cosmos];

  return (
    <>
      <div className="logo-carousel">
        <Slider
          // width="250px"
          duration={40}
          pauseOnHover={false}
          blurBorders={false}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <Slider.Slide key={index}>
              <div className="logo-placeholder">
                <img src={logo} alt={`Logo ${index + 1}`} />
              </div>
            </Slider.Slide>
          ))}
        </Slider>
      </div>

      <hr />
    </>
  );
};

export default Partners;
