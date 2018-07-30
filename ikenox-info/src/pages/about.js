import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'

class About extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const about = this.props.data.markdownRemark
    return (
      <div>
        <Helmet title={`About | ${siteTitle}`} />
        <Bio />
      </div>
    )
  }
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: "/about" } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
