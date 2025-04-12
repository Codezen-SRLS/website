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
    title: `Codezen | Blockchain and Web3 Audits`,
    description: `Codezen secures Web3 with expert consulting and audits, protecting decentralized systems and smart contracts against vulnerabilities.`,
    author: `@christianvari`,
    siteUrl: `https://www.codezen.tech`,
    image: `/logo.png`,
    twitterUsername: `@CodezenSRLS`,
    keywords: `Web3, Blockchain, Security, Smart Contracts, Audit, DeFi, Consulting, Crypto, Codezen`,
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
        path: path.join(__dirname, `src`, `sharedData`, "data"),
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
        name: `Codezen`,
        short_name: `Codezen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/images/logo.png`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.codezen.tech`,
        sitemap: `https://www.codezen.tech/sitemap-index.xml`,
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
