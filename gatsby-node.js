/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

  const path = require('path');

  exports.createPages = ({ boundActionCreators, graphql }) => {
    // define createPage
    const { createPage } = boundActionCreators;

    const postTemplate = path.resolve('src/templates/post.js');

    // for any post that we find, we are going to create a page for
    // allMarkdownRemark coming fron gatsby API
    return graphql( `{
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
            }
          }
        }
      }
    }` )
    .then(res => {
      if (res.errors) {
        return Promise.reject(res.errors);
      }

      // if no err
      // the edge is the node itself
      // edges is an array
      res.data.allMarkdownRemark.edges.forEach( ({node}) => {
        createPage({
          path: node.frontmatter.path,
          component: postTemplate
        })
      })
    })
 };