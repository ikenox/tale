import React from 'react'
import { HatenabookmarkButton, PocketButton, FacebookButton, TwitterTweetButton } from 'react-social-sharebuttons';

class SocialButtons extends React.Component {
  render() {
    return (
      <div style={{ verticalAlign:"middle" }}>
        <HatenabookmarkButton layout={`standard-balloon`}/>
        <FacebookButton layout={`button_count`} share={true} style={{ margin:"5px" }}/>
        <TwitterTweetButton/>
        <PocketButton count={`horizontal`}/>
      </div>
    )
  }
}

export default SocialButtons
