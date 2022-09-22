import React, { useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./MainRoom.module.css";

const MainRoom = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { clients, provideRef } = useWebRTC(roomId, user);

  console.log("client", clients);

  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client, index) => {
        return (
          <div key={index}>
            <audio
              ref={(instance) => provideRef(instance, client.id)}
              controls
              autoPlay
            ></audio>
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default MainRoom;
