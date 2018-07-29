import React from 'react'

import profilePic from './profile.jpeg'
import FaGithub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'
import styled from 'styled-components';
import Link from 'gatsby-link'

const P = styled.p`
  margin: 0px;
  line-height:1.2em;
  +p {
    margin:0px;
  }
`

class Bio extends React.Component {
  render() {
    return (
      <div style={{ verticalAlign:"middle", display:"flex", alignItems:"center" }}>
        <Link to={`/about`} style={{float:"left", lineHeight:0 }}>
          <img
            src={profilePic}
            alt={`Naoto Ikeno`}
            width={80}
            style={{ borderRadius:40 }}
          />
        </Link>
        <div style={{ marginLeft:"12px"}}>
          <P style={{ fontSize:"1.2em", fontWeight:"bold" }}>
            Naoto Ikeno
          </P>
          <P style={{ fontSize:".8em" }}>Software Engineer</P>
          <P style={{ fontSize:"1.2em" }}>
            <FaGithub/>
            <FaTwitter/>
          </P>
        </div>
      </div>
    )
  }
}

export default Bio
