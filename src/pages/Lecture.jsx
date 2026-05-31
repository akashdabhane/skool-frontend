import React, { useEffect, useRef, useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { LuVideo, LuScreenShare, LuVideoOff } from "react-icons/lu";
import { BsBadgeCc } from "react-icons/bs";
import { MdOutlineEmojiEmotions, MdCallEnd, MdOutlineMessage } from "react-icons/md";
import { FaRegHandPaper } from "react-icons/fa";
import { GoInfo, GoPeople } from "react-icons/go";
import { RiShapesLine } from "react-icons/ri";
import VideoCallRightPanel from "../components/videoCall/VideoCallRightPanel";
import { io } from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
import { socketUrl, baseUrl } from "../utils/helper";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Lecture = () => {
  const [panelNav, setPanelNav] = useState(null);
  const { lectureid } = useParams();
  const [navObject, setNavObject] = useState({
    isAudioMuted: false,
    isVideoMuted: false,
    isScreenSharing: false,
    isCarbanCopyOn: false,
  })
  const [participants, setParticipants] = useState([]);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const localVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peersRef = useRef({});
  const localStreamRef = useRef(null);
  const { loggedInUser } = useAuth();

  const iceConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };

  const styles = {
    videoChatActions: "p-2 bg-gray-400 rounded-full cursor-pointer",
    videoChatPanelActions: "p-1 hover:bg-gray-600 rounded-full cursor-pointer",
  }

  useEffect(() => {
    let isMounted = true;

    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (!isMounted) return;

        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error(error);
      }
    };

    initMedia();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token || !lectureid) return;

    axios.post(`${baseUrl}lectures/${lectureid}/attendance/join`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(() => {});

    const socket = io(socketUrl, {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-lecture", { lectureId: lectureid });
    });

    socket.on("lecture-participants", ({ participants: initialParticipants }) => {
      setParticipants(initialParticipants);
      initialParticipants.forEach((participant) => {
        createPeerConnection(participant.socketId, true);
      });
    });

    socket.on("participant-joined", (participant) => {
      setParticipants((prev) => [...prev, participant]);
    });

    socket.on("participant-left", ({ socketId }) => {
      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId));
      setRemoteStreams((prev) => prev.filter((stream) => stream.socketId !== socketId));
      if (peersRef.current[socketId]) {
        peersRef.current[socketId].close();
        delete peersRef.current[socketId];
      }
    });

    socket.on("signal-offer", async ({ from, offer }) => {
      const peer = createPeerConnection(from, false);
      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("signal-answer", { to: from, answer });
    });

    socket.on("signal-answer", async ({ from, answer }) => {
      const peer = peersRef.current[from];
      if (peer) {
        await peer.setRemoteDescription(answer);
      }
    });

    socket.on("signal-ice", async ({ from, candidate }) => {
      const peer = peersRef.current[from];
      if (peer && candidate) {
        await peer.addIceCandidate(candidate);
      }
    });

    return () => {
      axios.patch(`${baseUrl}lectures/${lectureid}/attendance/leave`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch(() => {});
      socket.disconnect();
      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
    };
  }, [lectureid]);

  useEffect(() => {
    if (!lectureid || !loggedInUser?.isTeacher) return;

    const token = Cookies.get("accessToken");
    if (!token) return;

    axios.get(`${baseUrl}lectures/${lectureid}/attendance`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAttendanceRecords(response.data.data.records || []);
        setAttendanceSummary(response.data.data.summary || null);
      })
      .catch(() => {});
  }, [lectureid, loggedInUser?.isTeacher]);

  const createPeerConnection = (socketId, isInitiator) => {
    if (peersRef.current[socketId]) {
      return peersRef.current[socketId];
    }

    const peer = new RTCPeerConnection(iceConfig);
    peersRef.current[socketId] = peer;

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        peer.addTrack(track, localStreamRef.current);
      });
    }

    peer.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit("signal-ice", { to: socketId, candidate: event.candidate });
      }
    };

    peer.ontrack = (event) => {
      setRemoteStreams((prev) => {
        if (prev.some((item) => item.socketId === socketId)) {
          return prev;
        }
        return [...prev, { socketId, stream: event.streams[0] }];
      });
    };

    if (isInitiator && socketRef.current) {
      peer.createOffer()
        .then((offer) => peer.setLocalDescription(offer))
        .then(() => {
          socketRef.current.emit("signal-offer", { to: socketId, offer: peer.localDescription });
        })
        .catch((error) => console.error(error));
    }

    return peer;
  };

  const toggleAudio = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setNavObject((prev) => ({ ...prev, isAudioMuted: !track.enabled }));
    });
  };

  const toggleVideo = () => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setNavObject((prev) => ({ ...prev, isVideoMuted: !track.enabled }));
    });
  };

  const toggleScreenShare = async () => {
    if (!localStreamRef.current) return;

    if (!navObject.isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        const senderTracks = Object.values(peersRef.current).flatMap((peer) =>
          peer.getSenders().filter((sender) => sender.track?.kind === "video")
        );

        senderTracks.forEach((sender) => sender.replaceTrack(screenTrack));
        localStreamRef.current.getVideoTracks().forEach((track) => track.stop());
        localStreamRef.current.removeTrack(localStreamRef.current.getVideoTracks()[0]);
        localStreamRef.current.addTrack(screenTrack);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }

        screenTrack.onended = () => {
          toggleScreenShare();
        };

        setNavObject((prev) => ({ ...prev, isScreenSharing: true }));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const cameraTrack = cameraStream.getVideoTracks()[0];
        const senderTracks = Object.values(peersRef.current).flatMap((peer) =>
          peer.getSenders().filter((sender) => sender.track?.kind === "video")
        );

        senderTracks.forEach((sender) => sender.replaceTrack(cameraTrack));
        localStreamRef.current.getVideoTracks().forEach((track) => track.stop());
        localStreamRef.current.removeTrack(localStreamRef.current.getVideoTracks()[0]);
        localStreamRef.current.addTrack(cameraTrack);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }

        setNavObject((prev) => ({ ...prev, isScreenSharing: false }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Video Section */}
        <div className="flex-1 flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800 overflow-auto">
          <div className="bg-black rounded-lg overflow-hidden">
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-64 object-cover" />
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {remoteStreams.map((remote) => (
              <div key={remote.socketId} className="bg-black rounded-lg overflow-hidden">
                <video
                  autoPlay
                  playsInline
                  className="w-full h-56 object-cover"
                  ref={(element) => {
                    if (element && remote.stream) {
                      element.srcObject = remote.stream;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <VideoCallRightPanel
          panelNav={panelNav}
          setPanelNav={setPanelNav}
          participants={participants}
          attendanceRecords={attendanceRecords}
          attendanceSummary={attendanceSummary}
          isTeacher={loggedInUser?.isTeacher}
        />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center px-6 py-3 shadow-2xl dark:bg-gray-900">
        {/* Left Bottom */}
        <div className="flex justify-between items-center px-4 py-2 dark:bg-gray-900 dark:text-white">
          <p className="text-sm">{new Date().getHours() + ":" + new Date().getMinutes()} | abg-jivj-bpg</p>
        </div>

        {/* Center Button */}
        <div className="space-x-3 flex items-center text-5xl p-2 px-4 rounded-xl bg-gray-300 dark:bg-gray-600">
          {navObject.isAudioMuted
            ? <AiOutlineAudioMuted className={styles.videoChatActions} onClick={toggleAudio} />
            : <AiOutlineAudio className={styles.videoChatActions} onClick={toggleAudio} />
          }
          {navObject.isVideoMuted
            ? <LuVideoOff className={styles.videoChatActions} onClick={toggleVideo} />
            : <LuVideo className={styles.videoChatActions} onClick={toggleVideo} />
          }
          <BsBadgeCc className={styles.videoChatActions} />
          <MdOutlineEmojiEmotions className={styles.videoChatActions} />
          <LuScreenShare className={styles.videoChatActions} onClick={toggleScreenShare} />
          <FaRegHandPaper className={styles.videoChatActions} />
          <MdCallEnd className="p-2 bg-red-500 rounded-full cursor-pointer" />
        </div>

        {/* Right Button */}
        <div className="flex space-x-3 items-center text-3xl p-2 dark:text-white">
          <GoInfo className={styles.videoChatPanelActions} onClick={() => panelNav !== 0 ? setPanelNav(0) : setPanelNav(null)} />
          <GoPeople className={styles.videoChatPanelActions} onClick={() => panelNav !== 1 ? setPanelNav(1) : setPanelNav(null)} />
          <MdOutlineMessage className={styles.videoChatPanelActions} onClick={() => panelNav !== 2 ? setPanelNav(2) : setPanelNav(null)} />
          <RiShapesLine className={styles.videoChatPanelActions} onClick={() => panelNav !== 3 ? setPanelNav(3) : setPanelNav(null)} />
        </div>
      </div>
    </div>
  );
};

export default Lecture;
