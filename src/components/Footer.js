import React from "react"
import "./Footer.css"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <footer className="container">
          <div className="row align-items-center justify-content-center footer-main">
            <div className="col-md-4 ">
              <div className="logo">
                <StaticImage
                  src="../images/logo.png"
                  alt="logo"
                  className="logo"
                />
              </div>
              <p className="footer-text">
                Codezen provides expert blockchain and Web3 security solutions,
                specializing in smart contract audits and cybersecurity
                consulting.
              </p>
            </div>
            <div className="col-md-2">
              <div className="d-flex flex-column social">
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Linkedin</div>
                <div className="insta">Instagram</div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <StaticImage
                src="../images/talk.png"
                alt="logo"
                className="talk"
              />
            </div>
          </div>
        </footer>
      </div>
      <div className="copy-right w-100 container d-flex align-items-center justify-content-between">
        <div className="copy-right-text">© 2024 Logo. All rights reserved</div>
        <ul>
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Services</Link>
          </li>
          <li>
            <Link to="#">Portfolio</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">Blog</Link>
          </li>
        </ul>
      </div>
      <div className="mobile-border-row"></div>
      <div className="mobile-copy-right w-100 container">
        <div className="mobile-copy-right-text">
          © 2024 Logo. All rights reserved
        </div>
      </div>
    </>
  )
}

export default Footer
