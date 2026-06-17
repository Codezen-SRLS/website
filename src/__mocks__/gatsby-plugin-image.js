const React = require("react");

const StaticImage = ({ alt, ...rest }) => React.createElement("img", { alt, ...rest });
const GatsbyImage = ({ alt, image, ...rest }) => React.createElement("img", { alt, ...rest });

module.exports = { StaticImage, GatsbyImage };
