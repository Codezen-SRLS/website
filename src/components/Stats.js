import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Stats = () => {
  const data = useStaticQuery(graphql`
    query {
      allAuditHistoryJson {
        edges {
          node {
            id
            issues {
              critical
              major
              minor
              informational
            }
          }
        }
      }
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

  return (
    <div className="stats">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-6">
            <h2 className="stats-heading">
              {data.allAuditHistoryJson.edges.length}
            </h2>
            <p className="stats-text">Completed Audits</p>
          </div>
          <div className="col-xl-3 col-6">
            <h2 className="stats-heading">
              {data.allAuditHistoryJson.edges.reduce((p, n) => {
                if (!n.node.issues) return p;
                return (
                  p +
                  n.node.issues.critical +
                  n.node.issues.major +
                  n.node.issues.minor
                );
              }, 0)}
            </h2>
            <p className="stats-text">Vulnerabilities Identified</p>
          </div>
          {data.allSrcJson.edges[0].node.banner.stats?.map((data, i) => (
            <div className="col-xl-3 col-6" key={i}>
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
