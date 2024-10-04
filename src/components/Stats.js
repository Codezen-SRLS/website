import React from "react"

const Stats = () => {
  return (
    <div className="stats">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-6">
            <h2 className="stats-heading">100+</h2>
            <p className="stats-text">Blockchain Projects</p>
          </div>
          <div className="col-xl-3 col-6">
            <h2 className="stats-heading">200+</h2>
            <p className="stats-text">Vulnerabilities Identified</p>
          </div>
          <div className="col-xl-3 col-6 mt-xl-0 mt-3">
            <h2 className="stats-heading">$50M+</h2>
            <p className="stats-text">Assets Protected</p>
          </div>
          <div className="col-xl-3 col-6 mt-xl-0 mt-3">
            <h2 className="stats-heading">99.9%</h2>
            <p className="stats-text">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
