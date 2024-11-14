/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
require(`dotenv`).config({ path: `.env` });
const path = require(`path`);

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Codezen: Expert Web3 & Blockchain Security Solutions`,
    description: `Codezen secures Web3 with expert consulting and audits, protecting decentralized systems and smart contracts against vulnerabilities.`,
    author: `@christianvari`,
    siteUrl: `https://www.codezen.tech`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data.json`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sharedData`,
        path: path.join(__dirname, `src`, `sharedData`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sharedImages`,
        path: path.join(__dirname, `src`, `sharedData`, `images`),
      },
    },
    `gatsby-transformer-json`, // Transformer for JSON files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.codezen.tech`,
        sitemap: `https://www.codezen.tech/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    `gatsby-plugin-appointlet`,
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        // Valore stringa per l'ID progetto Clarity
        clarity_project_id: process.env.CLARITY_ID,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [process.env.GA_TRACKING_ID],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.codezen.tech`,
      },
    },
  ],
};
