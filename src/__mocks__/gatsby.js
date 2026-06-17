const React = require("react");

module.exports = {
  graphql: jest.fn(),
  Link: ({ children, to, ...rest }) =>
    React.createElement("a", { href: to, ...rest }, children),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    site: {
      siteMetadata: {
        title: "Codezen",
        description: "Blockchain security",
        author: "Codezen",
        siteUrl: "https://www.codezen.tech",
        keywords: "blockchain,security",
      },
    },
  })),
};
