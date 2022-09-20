import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";

const dummy = [
  {
    id: 1,
    topic: "Best anime in every decade?",
    speakers: [
      {
        id: 1,
        name: "Amit",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
      {
        id: 1,
        name: "Chirag",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 2,
    topic: "World class movies",
    speakers: [
      {
        id: 1,
        name: "Amit",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
      {
        id: 1,
        name: "Chirag",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "topic 33",
    speakers: [
      {
        id: 1,
        name: "Amit",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
      {
        id: 1,
        name: "Chirag",
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headingTitle}>All Podcast Rooms</span>
            <div className={styles.searchBox}>
              <AiOutlineSearch fontSize={20} />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.startRoomButton}
              onClick={showModalHandler}
            >
              <HiUserGroup color="white" fontSize={20} />
              <span>Start Podcast</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {dummy.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={onClose} />}
    </>
  );
};

export default Rooms;
