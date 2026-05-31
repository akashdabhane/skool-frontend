import React from 'react';
import VideoCallRightPanelPeople from './VideoCallRightPanelPeople';
import VideoCallRightPanelInfo from './VideoCallRightPanelInfo';
import VideoCallRightPanelMessages from './VideoCallRightPanelMessages';

function VideoCallRightPanel({
  panelNav,
  setPanelNav,
  participants,
  attendanceRecords,
  attendanceSummary,
  isTeacher,
}) {

  return (
    <div>
      {
        panelNav === 0 && (
          <VideoCallRightPanelInfo
            closePanelNav={() => setPanelNav(null)}
            attendanceRecords={attendanceRecords}
            attendanceSummary={attendanceSummary}
            isTeacher={isTeacher}
          />
        )
      }
      {
        panelNav === 1 && (
          <VideoCallRightPanelPeople closePanelNav={() => setPanelNav(null)} participants={participants} />
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