import React from "react"
import hero from "../images/partner.mp4"

const WhoWeAre = () => {
  return (
    <>
      <div className="container">
        <div className="row align-items-center justify-content-between banner">
          <div
            dangerouslySetInnerHTML={{
              __html: ` <video class="w-100" autoPlay loop muted playsinline>
      <source src=${hero} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
            }}
            className="col-xl-4 col-12 "
          />
          <div className="col-xl-7 col-12 mt-xl-0 mt-5">
            <p className="sub-text text-decoration-underline">Who We Are </p>
            <h3 className="sub-heading mt-3 mb-0">
              Your Trusted Partner in Blockchain Security{" "}
            </h3>
            <p className="text banner-text mt-3">
              Codezen is a cybersecurity firm specializing in blockchain and
              Web3 technologies. We offer security solutions tailored to the
              unique challenges of decentralized systems. Our mission is to
              safeguard the future of decentralized finance, applications, and
              networks through comprehensive audits and consulting services.
            </p>
            <p className="text banner-text mt-3">
              With a team of experts in blockchain, smart contract auditing, and
              Web3 security, we bring a wealth of experience to help our clients
              navigate the evolving landscape of decentralized technologies.
            </p>
            <button className="btn mt-4" style={{ "--width": "165px" }}>
              <span className="text">
                <span className="square"></span>
              </span>
              Let's Talk{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhoWeAre
