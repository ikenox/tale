import React from 'react'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaMail from 'react-icons/lib/fa/envelope-o'

class About extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <div>
        <Helmet title={`About | ${siteTitle}`}/>
        <Bio/>
        <div className={`content`} style={{marginTop: "48px", marginBottom: "48px"}}>
          <h2 id="history">History</h2>
          <p>
            Software Engineer at DeNA Co., Ltd. (2017 - )<br/>
            Graduate School of Information Sciences, Tohoku Univ. (2015 - 2016)
          </p>

          <h2 id="skills">Skills</h2>
          <ul>
            <li>Server-side Development (Perl, Python, Java, SQL)</li>
            <li>Android App Development (Java)</li>
            <li>Data Analysis and Visualization (Python)</li>
            <li>Other (Git, HTML, CSS)</li>
          </ul>

          <h2 id="interests">Interests</h2>
          <ul>
            <li>Software Architecture & Design</li>
            <ul>
              <li>Domain Driven Design</li>
              <li>Clean Architecture</li>
            </ul>
          </ul>

          <h2 id="contact">Contact</h2>

          <p>
            <FaMail/> ikenox[at]gmail.com<br/>
            <FaTwitter/> <a href="https://twitter.com/ikenoxx" target={`_blank`}> @ikenoxx </a>
          </p>
        </div>
        <hr/>
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
        sns {
          twitter
        }
      }
    }
  }
`
