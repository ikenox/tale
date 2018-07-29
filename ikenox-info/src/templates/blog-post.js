import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Bio from '../components/Bio'
import styled from 'styled-components';

require('./blog-post.css')

const Pager = styled.div`
a {
  text-decoration:none;
}

.linkPrevious{
font-size:.9em;
padding:5px;
}
.linkNext{
font-size:.9em;
padding:5px;
}
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const {previous, next} = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}/>
        <h1 style={{marginBottom: "0px"}}>{post.frontmatter.title}</h1>
        <p style={{marginTop: "0px", fontWeight: "bold", color: "#666"}}>{post.frontmatter.date}</p>
        <div className={`content`} dangerouslySetInnerHTML={{__html: post.html}}
             style={{marginTop: "48px", marginBottom: "48px"}}/>
        <hr/>
        <Bio/>

        <hr/>
        <Pager>
          {previous && (
            <div className={`linkPrevious`}>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </div>
          )}

          {next && (
            <div className={`linkNext`}>
              <Link to={next.fields.slug} rel="next">
                → {next.frontmatter.title}
              </Link>
            </div>
          )}
        </Pager>
        <hr/>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`