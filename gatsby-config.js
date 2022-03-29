module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-meilisearch",
      options: {
        host: "http://localhost:7700",
        apiKey: "masterKey",
        indexes: [
          {
            indexUid: "markdown",
            transformer: (data) =>
              data.allMdx.nodes.map((node, index) => ({
                id: index,
                body: node.rawBody,
              })),
            query: `
            query MyQuery {
              allMdx {
                nodes {
                  rawBody
                }
              }
            }
          `,
          },
          {
            indexUid: "sitepage",
            transformer: (data) =>
              data.allSitePage.nodes.map((node, index) => ({
                id: index,
                path: node.path,
                context: node.pageContext,
              })),
            query: `
            query MyQuery {
              allSitePage {
                nodes {
                  path
                  pageContext
                }
              }
            }
          `,
          },
        ],
      },
    },
  ],
};
