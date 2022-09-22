import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../TextInput/TextInput";
import { ImEarth, ImCancelCircle } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import { createRoom } from "../../API";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    // validation
    if (!topic || !roomType) {
      return;
    }

    // server request
    try {
      const { data } = await createRoom({ topic, roomType });
      navigate(`/rooms/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <ImCancelCircle color="#c0c2c2" fontSize={22} />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic of Podcast</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h3 className={styles.subHeading}>Podcast Types</h3>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
              onClick={() => setRoomType("open")}
            >
              <ImEarth color="1AA3E8" fontSize={50} />
              <span>Open</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
              onClick={() => setRoomType("social")}
            >
              <HiUsers color="FFCD3A" fontSize={50} />
              <span>Social</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
              onClick={() => setRoomType("private")}
            >
              <AiFillLock color="E78E42" fontSize={50} />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, Open to everyone</h2>
          <button onClick={submitHandler}>Let's Go</button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
