import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import hero from "../images/partner.mp4";

const WhoWeAre = () => {
	const data = useStaticQuery(graphql`
		query {
			allSrcJson {
				edges {
					node {
						banner {
							whoweare {
								subHeading
								buttonLink
								buttonText
								heading
								text
							}
						}
					}
				}
			}
		}
	`);

	const newData = data.allSrcJson.edges[0].node.banner.whoweare;
	return (
		<>
			<div className="container">
				<div className="row align-items-center justify-content-between banner">
					<div
						dangerouslySetInnerHTML={{
							__html: ` <video class="w-100 videos" autoPlay loop muted playsinline>
      <source src=${hero} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
						}}
						className="col-xl-4 col-12 "
					/>
					<div className="col-xl-7 col-12 mt-xl-0 mt-5">
						<p className="sub-text text-decoration-underline">
							{newData?.subHeading}{" "}
						</p>
						<h3 className="sub-heading mt-3 mb-0">{newData?.heading} </h3>
						<p className="text banner-text mt-3">
							<div
								dangerouslySetInnerHTML={{
									__html: newData?.text,
								}}
							/>
						</p>
						<Link to={newData?.buttonLink}>
							<button
								className="btn mt-4"
								style={{ "--width": "165px" }}
							>
								<span className="text">
									<span className="square"></span>
								</span>
								{newData?.buttonText}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default WhoWeAre;
