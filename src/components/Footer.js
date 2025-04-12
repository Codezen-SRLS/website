import React from "react";
import "./Footer.css";
import { useStaticQuery, graphql } from "gatsby";
import twitterIcon from "../images/twitter.svg";
import linkedinIcon from "../images/linkedin.svg";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              footer {
                email {
                  to
                }
                twitter
                linkedin
                note
              }
            }
          }
        }
      }
    }
  `);

  const footerData = data.allSrcJson.edges[0].node.banner;
  const { email, twitter, linkedin } = footerData.footer;

  const mailtoLink = `mailto:${email.to}}`;

  return (
    <div id="contact" className="footer-container">
      <footer className="container">
        <div className="row">
          {/* Company Section */}
          <div className="col-md-4">
            <h3>Company</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#whoweare">About Me</a>
              </li>
              <li>
                <a href="#whatwedo">Services</a>
              </li>
              <li>
                <a href="#work">Portfolio</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Note Section */}
          <div className="col-md-4">
            <h3>Note</h3>
            <p className="footer-note">{footerData.footer.note}</p>
          </div>

          {/* Ready For Action Section */}
          <div className="col-md-4">
            <h3>Ready For Action</h3>
            <a href={mailtoLink} className="footer-email">
              {email.to}
            </a>
          </div>
        </div>

        {/* Copyright and Social Links */}
        <div className="footer-bottom">
          <div className="copyright">
            <span>©</span> 2025 Codezen SRLS. All Rights Reserved.
          </div>
          <div className="social-links">
            <a href={twitter} target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
