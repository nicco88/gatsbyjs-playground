import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({ data }) => (
  <div>
    <h1>Bella gente!</h1>
    <p>Benvenuti sul nuovo sito Gatsby!</p>
    <p>Ora vai e crea qualcosa di nuovo.</p>
    <Link to="/it/page-2/">Vai a pagina 2</Link>
    <h2>Indice</h2>
    <ul>
      { data.allMarkdownRemark.edges.map( post => (
        <li>
          <Link 
            key={ `${post.node.id}_it` }
            to={ post.node.frontmatter.path }
            >
              { post.node.frontmatter.title }
            </Link>
        </li>
      )) }
    </ul>
  </div>
)

//sort: { fields: [frontmatter__date], order: DESC}
export const pageQuery = graphql`
  query IndexQueryIt {
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
`

export default IndexPage