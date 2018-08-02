import React from 'react'
import {HatenabookmarkButton, PocketButton, FacebookButton, TwitterTweetButton} from 'react-social-sharebuttons';

import styled from 'styled-components';

const Div = styled.div`
  a { display:none; }
  > div { display:inline-block; margin-right:6px; }
`

class SocialButtons extends React.Component {
  render() {
    return (
      <Div style={{height:"25px"}}>
        <div style={{width: "115px", height: "25px !important"}}>
          <HatenabookmarkButton layout={`standard-balloon`}/>
        </div>
        <div style={{width: "106px", height: "25px !important"}}>
          <FacebookButton layout={`button_count`} share={true}/>
        </div>
        <div style={{width: "61px", height: "25px !important"}}>
          <TwitterTweetButton/>
        </div>
        <div style={{width: "135px", height: "25px !important"}}>
          <PocketButton count={`horizontal`}/>
        </div>
      </Div>
    )
  }
}

export default SocialButtons
