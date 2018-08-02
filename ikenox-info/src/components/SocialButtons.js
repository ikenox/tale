import React from 'react'
import {HatenabookmarkButton, PocketButton, FacebookButton, TwitterTweetButton} from 'react-social-sharebuttons';

import styled from 'styled-components';

const Div = styled.div`
  a { display:none; }
  > div { display:inline-block; margin-right:5px; }
`

class SocialButtons extends React.Component {
  render() {
    return (
      <Div style={{height:"30px"}}>
        <div style={{width: "115px", height: "30px !important"}}>
          <HatenabookmarkButton layout={`standard-balloon`}/>
        </div>
        <div style={{width: "106px", height: "30px !important"}}>
          <FacebookButton layout={`button_count`} share={true} style={{margin: "5px"}}/>
        </div>
        <div style={{width: "61px", height: "30px !important"}}>
          <TwitterTweetButton style={{ position:"absolute"}}/>
        </div>
        <div style={{width: "135px", height: "30px !important"}}>
          <PocketButton count={`horizontal`} style={{ position:"absolute"}}/>
        </div>
      </Div>
    )
  }
}

export default SocialButtons
