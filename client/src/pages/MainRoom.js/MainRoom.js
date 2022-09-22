import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./MainRoom.module.css";
import {
  BsArrowLeftShort,
  BsFillMicMuteFill,
  BsFillMicFill,
  BsMicFill,
} from "react-icons/bs";
import { IoHandRightSharp } from "react-icons/io5";
import { getRoomData } from "../../API";

const MainRoom = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  const handleMuteClick = (clientId) => {
    // user can only mute or unmute themselves
    if (clientId !== user.id) return;
    setIsMute((prev) => !prev);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoomData(roomId);
      setRoom((prev) => data);
    };
    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.back}>
          <BsArrowLeftShort color="white" fontSize={34} />
          <span>All Podcast</span>
        </button>
      </div>

      <div className={styles.clientWrapper}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <IoHandRightSharp color="#ffcd3a" fontSize={20} />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              Leave quietly
            </button>
          </div>
        </div>
        <div className={styles.clientList}>
          {clients.map((client, index) => {
            return (
              <div className={styles.client} key={index}>
                <div className={styles.userHead}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    // controls
                    autoPlay
                  ></audio>
                  <img
                    src={client.avatar}
                    alt="avatar"
                    className={styles.userAvatar}
                  />
                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <BsFillMicMuteFill color="ffcd3a" fontSize={15} />
                    ) : (
                      <BsMicFill color="ffcd3a" fontSize={15} />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainRoom;
