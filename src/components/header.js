import React, { useState } from "react";
import "./Header.css";
import { useStaticQuery, graphql, Link } from "gatsby";
import toggleicon from "../images/toggle.svg";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              header {
                buttonLink
                buttonText
              }
            }
          }
        }
      }
    }
  `);

  const newData = data.allSrcJson.edges[0].node.banner.header;

  return (
    <header className="container">
      <div className="header">
        <div className="logo">
          <StaticImage src="../images/logo.png" alt="logo" className="logo" />
        </div>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <div className="close-icon" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.87305 17.1275L17.1275 6.87305"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.1275 17.1275L6.87305 6.87305"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="#whoweare">About</Link>
            </li>
            <li>
              <Link to="#whatwedo">Services</Link>
            </li>
            <li>
              <Link to="#work">Portfolio</Link>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
          </ul>
          <Link to={newData?.buttonLink}>
            <button
              className="btn"
              style={{
                "--btn-bg-color": "white",
                "--text-color": "rgba(19, 19, 19, 1)",
              }}
            >
              <span className="text">
                <span className="square"></span>
              </span>
              {newData?.buttonText}
            </button>
          </Link>
        </nav>
        <div className="hamburger" onClick={toggleMenu}>
          <img loading="lazy" src={toggleicon} alt="toggleicon" />
        </div>
        <div
          className={`overlay ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        ></div>
      </div>
    </header>
  );
};

export default Header;
