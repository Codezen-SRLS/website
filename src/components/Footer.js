import React, { useState } from "react";
import "./Footer.css";
import { useStaticQuery, graphql } from "gatsby";
import RequestForm from "./RequestForm";

const Footer = () => {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              footer {
                twitter
                linkedin
                note
                buttonText
              }
            }
          }
        }
      }
    }
  `);

  const footerData = data.allSrcJson.edges[0].node.banner;
  const { twitter, linkedin, buttonText } = footerData.footer;

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
            <div className="footer-contact-buttons">
              {/* <a href={mailtoLink} className="footer-email">
                {email.to}
              </a> */}
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRequestFormOpen(true);
                }}
              >
                <span className="text">
                  <span className="square"></span>
                </span>
                {buttonText}
              </button>
            </div>
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
      <RequestForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
      />
    </div>
  );
};

export default Footer;
