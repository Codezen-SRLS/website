import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStaticQuery, graphql, Link } from "gatsby";

const Work = () => {
	const data = useStaticQuery(graphql`
		query {
			allSrcJson {
				edges {
					node {
						banner {
							work {
								heading
								subHeading
								data {
									description
									link
									tag
									title
									image {
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

	const newData = data.allSrcJson.edges[0].node.banner.work;
	var settings = {
		dots: true,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
	};
	return (
		<div className="banner">
			<div className="container ">
				<div className="row align-items-center w-100 text-center">
					<p className="sub-text text-decoration-underline m-auto">
						{newData?.subHeading}{" "}
					</p>
					<h1 className="sub-heading mt-3 mb-5">{newData?.heading}</h1>
				</div>
			</div>
			<div className="slider-container work-large">
				<Slider {...settings}>
					{newData?.data?.map((data) => (
						<a
							href={data?.link}
							target="_blank"
						>
							<div className="work-section">
								<div
									className="work-image"
									style={{ backgroundImage: `url(${data?.image?.publicURL})` }}
								>
									<div className="tag">{data?.tag}</div>
								</div>
								<div className="work-details">
									<h3>{data?.title}</h3>
									<p className="text mb-0"> {data?.description}</p>
								</div>
							</div>
						</a>
					))}
				</Slider>
			</div>
			<div className="work-mobile container">
				<div className="row">
					{newData?.data?.map((data) => (
						<a
							href={data?.link}
							target="_blank"
						>
							<div className="col-12 mt-3">
								<div className="work-section">
									<div
										className="work-image"
										style={{
											backgroundImage: `url(${data?.image?.publicURL})`,
										}}
									>
										<div className="tag">{data?.tag}</div>
									</div>
									<div className="work-details">
										<h3>{data?.title}</h3>
										<p className="text mb-0"> {data?.description}</p>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Work;
