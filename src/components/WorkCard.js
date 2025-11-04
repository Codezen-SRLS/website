import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const WorkCard = ({ item, href, className, openInNewTab = true }) => {
  if (!item) return null;

  const link = href ?? item?.github ?? item?.website;
  const cardContent = (
    <div className="work-section">
      {item?.image?.childImageSharp?.gatsbyImageData && (
        <GatsbyImage
          className="work-image"
          image={item.image.childImageSharp.gatsbyImageData}
          alt={item?.title || "Client work"}
        />
      )}
      {item?.description && (
        <div className="tag">
          <span>{item.description}</span>
        </div>
      )}
      <div className="work-details">
        {item?.title && <h3>{item.title}</h3>}
        {item?.partner && <p className="partner">X {item.partner}</p>}
        {item?.extendedDescription && (
          <p className="text mb-0">{item.extendedDescription}</p>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer" : undefined}
        className={className}
      >
        {cardContent}
      </a>
    );
  }

  return <div className={className}>{cardContent}</div>;
};

export default WorkCard;
