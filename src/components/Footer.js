import React from "react";
import "./Footer.css";
import { Link, useStaticQuery, graphql } from "gatsby";

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
                  subject
                  body
                }
                twitter
                linkedin
              }
            }
          }
        }
      }
    }
  `);

  const footerData = data.allSrcJson.edges[0].node.banner;
  const { email, twitter, linkedin } = footerData.footer;

  const mailtoLink = `mailto:${email.to}?subject=${encodeURIComponent(
    email.subject
  )}&body=${encodeURIComponent(email.body)}`;

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
            <p className="footer-note">
              Codezen Delivers Top-Tier Blockchain And Web3 Security Solutions,
              With A Strong Focus On Securing Decentralized Applications. They
              Specialize In Comprehensive Smart Contract Audits, Risk
              Assessment, And Cybersecurity Consulting To Ensure Safe, Reliable,
              And Compliant Blockchain Ecosystems.
            </p>
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
              <img src="/images/twitter.svg" alt="Twitter" />
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <img src="/images/linkedin.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
