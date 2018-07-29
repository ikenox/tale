import React from 'react'

import profilePic from './profile.jpeg'
import FaGithub from 'react-icons/lib/fa/github'
import FaTwitter from 'react-icons/lib/fa/twitter'

class Bio extends React.Component {
  render() {
    return (
      <p>
        <img
          src={profilePic}
          alt={`Kyle Mathews`}
          width={80}
        />
        <FaGithub/><FaTwitter/>
      </p>
    )
  }
}

export default Bio
