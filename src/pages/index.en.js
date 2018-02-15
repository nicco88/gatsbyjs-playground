import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/en/page-2/">Go to page 2</Link>
    <h2>Index</h2>
    <ul>
      { data.allMarkdownRemark.edges.map( post => (
        <li>
          <Link 
            key={ `${post.node.id}_en` }
            to={ post.node.frontmatter.path }
            >
              { post.node.frontmatter.title }
            </Link>
        </li>
      )) }
    </ul>
  </div>
)
// sort: { fields: [frontmatter__date], order: DESC}
export const pageQuery = graphql`
  query IndexQueryEn {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true} } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title,
            path,
            published,
            date,
          }
        }
      }
    }
  }
`;

export default IndexPage