import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Stats = () => {
	const data = useStaticQuery(graphql`
		query {
			allSrcJson {
				edges {
					node {
						banner {
							stats {
								description
								number
							}
						}
					}
				}
			}
		}
	`);

	const newData = data.allSrcJson.edges[0].node.banner.stats;
	return (
		<div className="stats">
			<div className="container">
				<div className="row">
					{newData?.map((data) => (
						<div className="col-xl-3 col-6">
							<h2 className="stats-heading">{data.number}</h2>
							<p className="stats-text">{data.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Stats;
