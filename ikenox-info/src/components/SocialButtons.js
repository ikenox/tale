import React from 'react'
import { HatenabookmarkButton, PocketButton, FacebookButton, TwitterTweetButton } from 'react-social-sharebuttons';

import styled from 'styled-components';

const Div = styled.div`
  a { display:none; }
`

class SocialButtons extends React.Component {
  render() {
    return (
      <Div style={{ verticalAlign:"middle" }}>
        <HatenabookmarkButton layout={`standard-balloon`}/>
        <FacebookButton layout={`button_count`} share={true} style={{ margin:"5px" }}/>
        <TwitterTweetButton/>
        <PocketButton count={`horizontal`}/>
      </Div>
    )
  }
}

export default SocialButtons
