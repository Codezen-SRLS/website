import React, { useEffect, useRef, useState } from "react";
import audit from "../images/SmartContractAudits.mp4";

const WhatWeDo = () => {
	const videoRefs = [useRef(null), useRef(null), useRef(null)];
	const [isInView, setIsInView] = useState([false, false, false]);

	useEffect(() => {
		videoRefs.forEach((videoRef, index) => {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsInView((prev) => {
						const newState = [...prev];
						newState[index] = entry.isIntersecting;
						return newState;
					});
				},
				{ threshold: 0.5 }
			);

			if (videoRef.current) {
				observer.observe(videoRef.current);
			}

			return () => {
				if (videoRef.current) {
					observer.unobserve(videoRef.current);
				}
			};
		});
	}, [videoRefs]);

	const handleMouseEnter = (index) => {
		if (isInView[index] && videoRefs[index].current) {
			videoRefs[index].current.play();
		}
	};

	return (
		<>
			<div className="container banner">
				<div className="row align-items-center mb-5 w-100 text-center">
					<p className="sub-text text-decoration-underline m-auto">
						What We Do{" "}
					</p>
					<h1 className="sub-heading mt-3 mb-0">
						Comprehensive Security Solutions for Blockchain & Web3{" "}
					</h1>
				</div>
				<div className="row align-items-center">
					{[0, 1, 2].map((index) => (
						<div
							className="col-lg-4 col-12 mt-lg-0 mt-5"
							key={index}
						>
							<div
								className="work"
								onMouseEnter={() => handleMouseEnter(index)}
							>
								<div className="d-flex align-items-center">
									<div className="square"></div>
									<p className="text primary-color mb-0 fw-500">01/03</p>
								</div>
								<video
									className="mt-4"
									ref={videoRefs[index]}
									width="100%"
									muted
									autoPlay
								>
									<source
										src={audit}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
								<h3 className="mt-4 text-lg-start text-center">
									Smart Contract Audits
								</h3>
								<p className="text mb-0 text-lg-start text-center">
									Ensure the security of your smart contracts with in-depth
									audits that identify vulnerabilities and protect against
									potential exploits.
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<hr />
		</>
	);
};

export default WhatWeDo;
