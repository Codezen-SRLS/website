/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Codezen`,
        description: `Codezen`,
        author: `@musadiqkhan`,
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
        `gatsby-transformer-json`, // Transformer for JSON files
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Outfit:300,400,500,600,700`, // Specify font weights you want to include
                ],
                display: "swap",
            },
        },
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
    ],
};
