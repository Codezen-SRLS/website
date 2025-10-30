import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Stats = () => {
  const data = useStaticQuery(graphql`
    query {
      allAuditHistoryJson {
        edges {
          node {
            id
            tvlUsd
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

  const totalTvlUsd = data.allAuditHistoryJson.edges.reduce(
    (currentTotal, currentEdge) => {
      const tvlValue =
        typeof currentEdge.node.tvlUsd === "number"
          ? currentEdge.node.tvlUsd
          : 0;
      return currentTotal + tvlValue;
    },
    0
  );

  const formatCurrencyAbbreviation = (amount) => {
    if (!amount || amount <= 0) return "$0";
    const absoluteAmount = Math.abs(amount);
    const units = [
      { value: 1e12, suffix: "T" },
      { value: 1e9, suffix: "B" },
      { value: 1e6, suffix: "M" },
      { value: 1e3, suffix: "K" },
    ];
    for (const unit of units) {
      if (absoluteAmount >= unit.value) {
        const abbreviated = (amount / unit.value)
          .toFixed(1)
          .replace(/\.0$/, "");
        return `$${abbreviated}${unit.suffix}+`;
      }
    }
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const formattedAssetsProtected = formatCurrencyAbbreviation(totalTvlUsd);

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
          {data.allSrcJson.edges[0].node.banner.stats?.map((stat, index) => {
            const isAssetsProtected = stat.description === "Assets Protected";
            const displayNumber = isAssetsProtected
              ? formattedAssetsProtected
              : stat.number;
            return (
              <div className="col-xl-3 col-6" key={index}>
                <h2 className="stats-heading">{displayNumber}</h2>
                <p className="stats-text">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
