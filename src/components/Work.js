import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Work = () => {
	var settings = {
		dots: true,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
	};
	const backgroundImageUrl = "https://via.placeholder.com/1200x400";
	return (
		<div className="banner">
			<div className="container ">
				<div className="row align-items-center w-100 text-center">
					<p className="sub-text text-decoration-underline m-auto">Our Work </p>
					<h1 className="sub-heading mt-3 mb-5">
						Showcasing Our Expertise: Proven Success in Blockchain Security{" "}
					</h1>
				</div>
			</div>
			<div className="slider-container work-large">
				<Slider {...settings}>
					<div className="work-section">
						<div
							className="work-image"
							style={{ backgroundImage: `url(${backgroundImageUrl})` }}
						>
							<div className="tag">Blockchain Audit</div>
						</div>
						<div className="work-details">
							<h3>Title</h3>
							<p className="text mb-0"> Hello World</p>
						</div>
					</div>
					<div className="work-section">
						<div
							className="work-image"
							style={{ backgroundImage: `url(${backgroundImageUrl})` }}
						>
							{" "}
							<div className="tag">Blockchain Audit</div>
						</div>
						<div className="work-details">
							<h3>Title</h3>
							<p className="text mb-0"> Hello World</p>
						</div>
					</div>
					<div className="work-section">
						<div
							className="work-image"
							style={{ backgroundImage: `url(${backgroundImageUrl})` }}
						>
							{" "}
							<div className="tag">Blockchain Audit</div>
						</div>
						<div className="work-details">
							<h3>Title</h3>
							<p className="text mb-0"> Hello World</p>
						</div>
					</div>
					<div className="work-section">
						<div
							className="work-image"
							style={{ backgroundImage: `url(${backgroundImageUrl})` }}
						>
							{" "}
							<div className="tag">Blockchain Audit</div>
						</div>
						<div className="work-details">
							<h3>Title</h3>
							<p className="text mb-0"> Hello World</p>
						</div>
					</div>
				</Slider>
			</div>
			<div className="work-mobile container">
				<div className="row">
					<div className="col-12 mt-3">
						<div className="work-section">
							<div
								className="work-image"
								style={{ backgroundImage: `url(${backgroundImageUrl})` }}
							>
								<div className="tag">Blockchain Audit</div>
							</div>
							<div className="work-details">
								<h3>Title</h3>
								<p className="text mb-0"> Hello World</p>
							</div>
						</div>
					</div>
					<div className="col-12  mt-3">
						<div className="work-section">
							<div
								className="work-image"
								style={{ backgroundImage: `url(${backgroundImageUrl})` }}
							>
								<div className="tag">Blockchain Audit</div>
							</div>
							<div className="work-details">
								<h3>Title</h3>
								<p className="text mb-0"> Hello World</p>
							</div>
						</div>
					</div>
					<div className="col-12  mt-3">
						<div className="work-section ">
							<div
								className="work-image"
								style={{ backgroundImage: `url(${backgroundImageUrl})` }}
							>
								<div className="tag">Blockchain Audit</div>
							</div>
							<div className="work-details">
								<h3>Title</h3>
								<p className="text mb-0"> Hello World</p>
							</div>
						</div>
					</div>
					<div className="col-12 mt-3">
						<div className="work-section">
							<div
								className="work-image"
								style={{ backgroundImage: `url(${backgroundImageUrl})` }}
							>
								<div className="tag">Blockchain Audit</div>
							</div>
							<div className="work-details">
								<h3>Title</h3>
								<p className="text mb-0"> Hello World</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Work;
