import React from 'react';
import Link from 'gatsby-link';
import { withPrefix } from 'gatsby-link';
import { getUserLangKey } from 'ptz-i18n';


class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args);

    // Skip build, Browsers only
    if (typeof window !== 'undefined') {
      const { langs, defaultLangKey } = args.data.site.siteMetadata.languages;
      const langKey = getUserLangKey( langs, defaultLangKey );
      const homeUrl = withPrefix( `/${ langKey }/`);

      // I don`t think this is the best solution
      // I would like to use Gatsby Redirects like: 
      // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
      // But Gatsby Redirects are static, they need to be specified at build time,
      // This redirect is dynamic, It needs to know the user browser language.
      // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4

      //  var language = navigator.language || navigator.browserLanguage; //for IE?
      window.___history.replace(homeUrl);
    }
  }

  render() {
    return (<div />);
  }
}

export default RedirectIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;

// const IndexPage = ({ data }) => (
//   <div>
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <Link to="/page-2/">Go to page 2</Link>
//     <h2>Index</h2>
//     <ul>
//       { data.allMarkdownRemark.edges.map( post => (
//         <li>
//           <Link 
//             key={ post.node.id}
//             to={ post.node.frontmatter.path }
//             >
//               { post.node.frontmatter.title }
//             </Link>
//         </li>
//       )) }
//     </ul>
//   </div>
// )

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       limit: 10
//       sort: { fields: [frontmatter__date], order: DESC}
//       filter: { frontmatter: { published: { eq: true} } }
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             path
//             published
//             date
//           }
//         }
//       }
//     }
//   }
// `

// export default IndexPage
