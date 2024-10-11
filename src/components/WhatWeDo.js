import React, { useEffect, useRef, useState } from "react";
import audit from "../images/SmartContractAudits.mp4";
import { useStaticQuery, graphql } from "gatsby";

const WhatWeDo = () => {
	const data = useStaticQuery(graphql`
		query {
			allSrcJson {
				edges {
					node {
						banner {
							whatwedo {
								heading
								subHeading
								data {
									description
									title
									video {
										publicURL
									}
								}
							}
						}
					}
				}
			}
		}
	`);

	const newData = data.allSrcJson.edges[0].node.banner.whatwedo;

	const videoRefs = useRef([]);
	const [isInView, setIsInView] = useState(
		new Array(newData?.data?.length).fill(false)
	);

	useEffect(() => {
		videoRefs.current = videoRefs.current.slice(0, newData?.data?.length);

		const observers = videoRefs.current.map((videoRef, index) => {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsInView((prev) => {
						const newState = [...prev];
						newState[index] = entry.isIntersecting;
						return newState;
					});
				},
				{ threshold: 0.5 } // Adjust as needed
			);

			if (videoRef) {
				observer.observe(videoRef);
			}

			return observer;
		});

		return () => {
			observers.forEach((observer, index) => {
				if (videoRefs.current[index]) {
					observer.unobserve(videoRefs.current[index]);
				}
			});
		};
	}, [newData?.data?.length]);

	useEffect(() => {
		isInView.forEach((inView, index) => {
			if (inView && videoRefs.current[index]) {
				videoRefs.current[index].play();
			} else if (!inView && videoRefs.current[index]) {
				videoRefs.current[index].pause();
			}
		});
	}, [isInView]);

	const handleMouseEnter = (index) => {
		if (videoRefs.current[index]) {
			videoRefs.current[index].play();
		}
	};

	const handleMouseLeave = (index) => {
		if (videoRefs.current[index]) {
			videoRefs.current[index].pause();
			videoRefs.current[index].currentTime = 0; // Reset the video on hover out
		}
	};

	return (
		<>
			<div className="banner">
				<div className="container ">
					<div className="row align-items-center mb-5 w-100 text-center">
						<p className="sub-text text-decoration-underline m-auto">
							{newData?.subHeading}{" "}
						</p>
						<h1 className="sub-heading mt-3 mb-0">{newData?.heading} </h1>
					</div>
					<div className="row align-items-center">
						{newData?.data?.map((data, index) => (
							<div
								className="col-lg-4 col-12 mt-5"
								key={index}
							>
								<div
									className="work"
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={() => handleMouseLeave(index)}
								>
									<div className="d-flex align-items-center">
										<div className="square"></div>
										<p className="text primary-color mb-0 fw-500">
											0{index + 1}/0{newData?.data?.length}
										</p>
									</div>
									<video
										className="mt-4 video"
										ref={(el) => (videoRefs.current[index] = el)} // Ensure correct ref is set
										width="100%"
										muted
									>
										<source
											src={data?.video?.publicURL}
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
									<h3 className="mt-4 text-lg-start text-center">
										{data.title}
									</h3>
									<p className="text mb-0 text-lg-start text-center what-we-do-text">
										{data.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<hr />
		</>
	);
};

export default WhatWeDo;
