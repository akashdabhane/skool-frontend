import React from 'react';
import VideoCallRightPanelPeople from './VideoCallRightPanelPeople';
import VideoCallRightPanelInfo from './VideoCallRightPanelInfo';
import VideoCallRightPanelMessages from './VideoCallRightPanelMessages';


function VideoCallRightPanel({ panelNav, setPanelNav }) {

  return (
    <div>
      {
        panelNav === 0 && (
          <VideoCallRightPanelInfo closePanelNav={() => setPanelNav(null)} />
        )
      }
      {
        panelNav === 1 && (
          <VideoCallRightPanelPeople closePanelNav={() => setPanelNav(null)} />
        )
      }
      {
        panelNav === 2 && (
          <VideoCallRightPanelMessages closePanelNav={() => setPanelNav(null)} />
        )
      }
    </div>
  )
}

export default VideoCallRightPanel