import React, { useEffect, useState } from "react";
import "./Footer.css";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { mail } from "fluent-mailto";
import { AppointletButton } from "gatsby-plugin-appointlet";

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
                telegram
              }
            }
          }
        }
      }
    }
  `);

  //Hydrate fix
  const [isHydrated, setIsHydrated] = useState();
  useEffect(() => {
    setIsHydrated(true);
  });

  const newData = data.allSrcJson.edges[0].node.banner.footer;
  return (
    <>
      <div id="contact" className="footer-container">
        <footer className="container">
          <div className="row align-items-center justify-content-center footer-main">
            <div className="col-md-4 ">
              <div className="logo">
                <StaticImage
                  src="../images/logo.png"
                  alt="Codezen Logo"
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
                <a
                  href={mail
                    .to(newData?.email?.to)
                    .subject(newData?.email?.subject)
                    .body(newData?.email?.body)
                    .build()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>Email</div>
                </a>
                <a href={newData?.linkedin} target="_blank" rel="noreferrer">
                  <div>Linkedin</div>
                </a>
                <a href={newData?.twitter} target="_blank" rel="noreferrer">
                  <div>Twitter</div>
                </a>
                <a href={newData?.telegram} target="_blank" rel="noreferrer">
                  <div className="insta">Telegram</div>
                </a>
              </div>
            </div>
            {!!isHydrated && (
              <AppointletButton tag="div" className="col-md-6 text-center">
                <StaticImage
                  src="../images/talk.png"
                  alt="meeting"
                  className="talk"
                  placeholder="blurred"
                />
              </AppointletButton>
            )}
          </div>
        </footer>
      </div>
      <div className="copy-right w-100 container d-flex align-items-center justify-content-between">
        <div className="copy-right-text">
          © 2024 Codezen SRLS. All rights reserved
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
      </div>
      <div className="mobile-border-row"></div>
      <div className="mobile-copy-right w-100 container">
        <div className="mobile-copy-right-text">
          © 2024 Codezen SRLS. All rights reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
