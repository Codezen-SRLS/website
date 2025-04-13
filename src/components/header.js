import React, { useState } from "react";
import "./Header.css";
import { useStaticQuery, graphql, Link } from "gatsby";
import toggleicon from "../images/toggle.svg";
import toggleiconLight from "../images/toggle-alt.svg";
import { StaticImage } from "gatsby-plugin-image";
import { useTheme } from "../context/ThemeContext";
import RequestForm from "./RequestForm";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openForm = () => {
    setIsFormOpen(true);
    setMenuOpen(false);
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
        <div className="logo" key={isDarkMode ? "dark" : "light"}>
          {isDarkMode ? (
            <StaticImage
              src="../images/logo-alt.png"
              alt="Codezen Logo Dark"
              className="logo-img"
              placeholder="none"
            />
          ) : (
            <StaticImage
              src="../images/logo.png"
              alt="Codezen Logo"
              className="logo-img"
              placeholder="none"
            />
          )}
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
                stroke={isDarkMode ? "white" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.1275 17.1275L6.87305 6.87305"
                stroke={isDarkMode ? "white" : "black"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          <div className="theme-toggle-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={!isDarkMode}
                onChange={toggleTheme}
              />
              <div className="slider round">
                <svg
                  className="sun-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="5" fill="#131313" />
                  <path
                    d="M12 2V4M12 20V22M2 12H4M20 12H22M5.93 5.93L7.34 7.34M18.07 5.93L16.66 7.34M5.93 18.07L7.34 16.66M18.07 18.07L16.66 16.66"
                    stroke="#131313"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="moon-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.53 15.93C20.07 17.28 18.11 18 16 18C11.03 18 7 13.97 7 9C7 6.89 7.72 4.93 9.07 3.47C9.24 3.29 9.31 3.04 9.26 2.8C9.2 2.55 9.03 2.35 8.8 2.24C8.57 2.13 8.3 2.13 8.07 2.23C4.99 3.69 3 6.65 3 10C3 15.52 7.48 20 13 20C16.35 20 19.31 18.01 20.77 14.93C20.87 14.7 20.87 14.43 20.76 14.2C20.65 13.97 20.45 13.8 20.2 13.74C19.96 13.69 19.71 13.76 19.53 13.93C19.53 13.93 21.53 15.93 21.53 15.93Z"
                    fill="white"
                  />
                </svg>
              </div>
            </label>
          </div>
          <Link to={newData?.buttonLink}>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                openForm();
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
          <img
            loading="lazy"
            src={isDarkMode ? toggleicon : toggleiconLight}
            alt="toggleicon"
          />
        </div>
        <div
          className={`overlay ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        ></div>
      </div>
      <RequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </header>
  );
};

export default Header;
