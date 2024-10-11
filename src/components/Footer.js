import React from "react";
import "./Footer.css";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";

const Footer = () => {
	const data = useStaticQuery(graphql`
		query {
			allSrcJson {
				edges {
					node {
						banner {
							footer {
								facebook
								twitter
								linkedin
								insta
							}
						}
					}
				}
			}
		}
	`);

	const newData = data.allSrcJson.edges[0].node.banner.footer;
	return (
		<>
			<div
				id="contact"
				className="footer-container"
			>
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
								<a
									href={newData?.facebook}
									target="_blank"
								>
									<div>Facebook</div>
								</a>
								<a
									href={newData?.twitter}
									target="_blank"
								>
									<div>Twitter</div>
								</a>
								<a
									href={newData?.linkedin}
									target="_blank"
								>
									<div>Linkedin</div>
								</a>
								<a
									href={newData?.insta}
									target="_blank"
								>
									{" "}
									<div className="insta">Instagram</div>
								</a>
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
						<Link
							to="/"
							activeClassName="active"
						>
							Home
						</Link>
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
					© 2024 Logo. All rights reserved
				</div>
			</div>
		</>
	);
};

export default Footer;
