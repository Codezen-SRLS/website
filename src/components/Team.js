import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const Team = () => {
  const data = useStaticQuery(graphql`
    query {
      allSrcJson {
        edges {
          node {
            banner {
              team {
                subHeading
                heading
                members {
                  name
                  role
                  description
                  website
                  image {
                    childImageSharp {
                      gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const teamData = data.allSrcJson.edges[0].node.banner.team;

  return (
    <>
      <div id="team" className="banner">
        <div className="container ">
          <div className="row align-items-center mb-5 w-100 text-center">
            <p className="sub-text text-decoration-underline m-auto">
              {teamData?.subHeading}{" "}
            </p>
            <h2 className="sub-heading mt-3 mb-0">{teamData?.heading} </h2>
          </div>
          <div className="row align-items-center justify-content-center">
            {teamData?.members?.map((member, index) => (
              <div key={index} className="col-lg-4 col-12 mt-5">
                <div
                  className="work team-clickable"
                  onClick={() => window.open(member.website, "_blank")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="team-image-container">
                    <GatsbyImage
                      className="team-image"
                      image={member?.image.childImageSharp.gatsbyImageData}
                      alt={member.name}
                    />
                  </div>
                  <div className="team-info">
                    <h3 className="mt-4 text-lg-start text-center">
                      {member.name}
                    </h3>
                    <p className="text primary-color mb-2 text-lg-start text-center">
                      {member.role}
                    </p>
                    <p className="text mb-0 text-lg-start text-center">
                      {member.description}
                    </p>
                  </div>
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

export default Team;
