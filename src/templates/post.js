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
        date
      }
    }
  }
`