import React from "react";
import styles from "./RoomCard.module.css";
import { TbMessageCircle2 } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const join = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div className={styles.card} onClick={join}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakers}`}>
        <div
          className={`${styles.speakersAvatars} ${
            room.speakers.lenght > 1 && styles.multi
          }`}
        >
          {room.speakers.map((speaker, index) => (
            <img key={index} src={speaker.avatar} alt="speaker-avatar" />
          ))}
        </div>
        <div className={styles.speakersName}>
          {room.speakers.map((speaker, index) => (
            <div key={index} className={styles.nameWrapper}>
              <span>{speaker.name}</span>
              <TbMessageCircle2 color="white" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.count}>
        <span>{room.totalPeople}</span>
        <AiOutlineUser />
      </div>
    </div>
  );
};

export default RoomCard;
