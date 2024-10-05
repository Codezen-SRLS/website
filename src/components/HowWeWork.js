import React from "react";
import work from "../images/work.mp4";

const HowWeWork = () => {
	return (
		<>
			<div className="banner">
				<div className="container ">
					<div className="row align-items-center w-100 text-center">
						<p className="sub-text text-decoration-underline m-auto">
							How We Work
						</p>
						<h1 className="sub-heading mt-3 mb-5">
							A Proven Approach to Securing Blockchain Projects
						</h1>
						<div className="col-lg-4 col-12">
							<div className="row">
								<div className="col">
									<h3 className="work-heading primary-color text-lg-end text-start">
										01
									</h3>
									<h3
										className="text-lg-end text-start"
										style={{ "--size": "32px" }}
									>
										Discovery
									</h3>
									<p className="text text-lg-end text-start">
										We start by understanding your project’s requirements and
										unique challenges.
									</p>
								</div>
							</div>
							<div className="row pt-6">
								<div className="col-12">
									<h3 className="work-heading primary-color text-lg-end text-start">
										01
									</h3>
									<h3
										className="text-lg-end text-start"
										style={{ "--size": "32px" }}
									>
										Discovery
									</h3>
									<p className="text text-lg-end text-start mb-0">
										We start by understanding your project’s requirements and
										unique challenges.
									</p>
								</div>
							</div>
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: ` <video class="w-100" autoPlay loop muted playsinline>
      <source src=${work} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
							}}
							className="col-lg-4 col-12 my-lg-0 my-5"
						/>
						<div className="col-lg-4 col-12">
							<div className="row">
								<div className="col">
									<h3 className="work-heading primary-color text-start">01</h3>
									<h3
										className="text-start"
										style={{ "--size": "32px" }}
									>
										Discovery
									</h3>
									<p className="text text-start">
										We start by understanding your project’s requirements and
										unique challenges.
									</p>
								</div>
							</div>
							<div className="row pt-6">
								<div className="col-12">
									<h3 className="work-heading primary-color text-start">01</h3>
									<h3
										className="text-start"
										style={{ "--size": "32px" }}
									>
										Discovery
									</h3>
									<p className="text text-start mb-0">
										We start by understanding your project’s requirements and
										unique challenges.
									</p>
								</div>
							</div>
						</div>{" "}
					</div>
				</div>
			</div>
			<hr />
		</>
	);
};

export default HowWeWork;
