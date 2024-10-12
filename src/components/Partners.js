import React, { useEffect, useRef } from "react";
import first from "../images/1.svg";
import mercury from "../images/mercury.svg";
import coinbase from "../images/coinbase.svg";

const Partners = () => {
  const logos = [first, mercury, coinbase];

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
          ))}{" "}
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
          {logos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="logo-placeholder">
              <img src={logo} alt={`Duplicate Logo ${index + 1}`} />
            </div>
          ))}
          {/* Duplicating logos for seamless loop */}
        </div>
      </div>
      <hr />{" "}
    </>
  );
};

export default Partners;
