import React from 'react'
import Link from 'gatsby-link'

require("./prism.css");
require("./base.css");

class Template extends React.Component {
  render() {
    const {location, children} = this.props
    let header
    if (location.pathname === '/') {
      header = (
        <h1 style={{ fontSize:"18pt", marginTop:"24px" }}>
          <Link to={'/'}>
            ikenox.info
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3 style={{ fontSize:"18pt", marginTop:"24px" }}>
          <Link to={'/'}>
            ikenox.info
          </Link>
        </h3>
      )
    }
    return (
      <div style={{margin: "0 auto", maxWidth: "740px", paddingLeft: "20px", paddingRight: "20px" }}>
        {header}
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
