import React from "react"
import hero from "../images/hero.mp4"

const Banner = () => {
  return (
    <div className="container">
      <div className="row align-items-center banner">
        <div className="col-xl-7 col-12">
          <p className="sub-text text-decoration-underline">
            Blockchain Security Experts
          </p>
          <h1 className="main-heading mt-3 mb-0">
            Securing the Future of Blockchain & Web3.
          </h1>
          <p className="text banner-text mt-3">
            At Codezen, we secure your decentralized projects with expert
            consulting and thorough smart contract audits, ensuring your
            blockchain and Web3 ecosystem is protected.
          </p>
          <button className="btn mt-4">
            <span className="text">
              <span className="square"></span>
            </span>
            Secure Your Blockchain
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: ` <video class="w-100" autoPlay loop muted playsinline>
      <source src=${hero} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
          }}
          className="col-xl-5 col-12 mt-xl-0 mt-5"
        />
      </div>
    </div>
  )
}

export default Banner
