# Build a Markdown Blog

- First we need a source plugin, which allows us to **create nodes**, used **to grab data** 
``` sh
npm i -S gatsby-source-filesystem
```
- Now we need to add the plugin in the `gatsby-config.js` file, so that we are able to use it
- First we write the plugin name in the `resolve`
- Then we decide the `options`, in this case `path` and `name`

``` js
module.exports = {
  // siteMetadata: {
  //   title: 'Gatsby Default Starter',
  // },
  plugins: [
    // 'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
  ]
};
```
- Next we install a plugin that allows us to use markdown

``` sh
npm i -S gatsby-transformer-remark
```
- And then we include it into the `gatsby-config.js` file. We could add some options as we did above, like adding the ability to add images, but for the moment we just add it as a simple plugin
*(tip: watch gatsby-remark-images)*

``` js
module.exports = {
  // siteMetadata: {
  //   title: 'Gatsby Default Starter',
  // },
  plugins: [
    // 'gatsby-plugin-react-helmet',
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: 'pages'
    //   }
    // },
    'gatsby-transformer-remark'
  ]
};
```

- Now we can start to add our first pages. Create a folder into the `pages` folder; this folder will be containing our `.md` files, images and so on.
- We could subdivide posts' folders by dates or language and so on, but gatsby does not care about our naming conventions
- inside the folder just put an `index.md` file

Inside the `index.md` we create our frontmatter

``` md
---
path: '/first-post'
title: 'My Post'
---
# Hello!
```

- Now create a `templates` folder, so that we can create a blog template for our posts

``` js
import React from 'react';
import Helmet from 'react-helmet';


  // { data } is a prop that will be injected by the graphql query
export default function Template({ data }) {

  // object deconstruction
  // assigning to 'post' variable
  // equal to saying → const post = data.markdownRemark;
  const { markdownRemark:  post} = data;

  // title is coming from the frontmatter we assigned
  return (
    <div>
      <h1>{ post.frontmatter.title }</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  )
}

// graphql query
// BlogPostByPath is gatsby.js API
// assign the path string to the path variable
// inside the function we tell graphql the information we want
// html → is the interior of the blog post
export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
```
- We haven't registered our post yet, so it's time to do it
- Go and create a `gatsby-node.js` if it's not present yet

``` js
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

  const path = require('path');
  // boundActionCreators → actions - gatsby uses redux to manage its states
  exports.createPages = ({ boundActionCreators, graphql }) => {
    // createPage (a property of boundActionCreators) - from the API
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
```

- Now go to `post.js` and insert a `dangerouslySetInnerHTML`

``` js
import React from 'react';
import Helmet from 'react-helmet';



export default function Template({ data }) {
  // object deconstruction
  // assigning to 'post' variable
  // equal to saying → const post = data.markdownRemark;
  const { markdownRemark:  post} = data;

  // title is coming from the frontmatter we assigned
  return (
    <div>
      <h1>{ post.frontmatter.title }</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
```

## Add _published_ and _date_ in frontmatter

* Into our `post.md` file let's put `published: true`
* Then add `published` in our `index.js`'s  query.
* And then add a filter, that will help publish only the _published_ ones.

`/pages/index.js`
```js
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <h2>Index</h2>
    <ul>
      { data.allMarkdownRemark.edges.map( post => (
        <li>
          <Link 
            key={ post.node.id}
            to={ post.node.frontmatter.path }
            >
              { post.node.frontmatter.title }
            </Link>
        </li>
      )) }
    </ul>
    
  </div>
)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter__date], order: DESC}
      filter: { frontmatter: { published: { eq: true} } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            published
          }
        }
      }
    }
  }
`

export default IndexPage
`
```

### Add a date in the post
* Just add `date: '2018-02-13'` to the frontmatter.
* Then update the `gatsby-node.js` and add `date` to the query, as well as in `index.js`
* Restart the server.
* We can add a way to sort the list in `index.js` by adding `sort: { fields: [frontmatter__date], order: DESC}`, where `DESC` means in a descending order, and `ASC` in an ascending order.





