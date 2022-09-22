import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socketRef = useRef(null);
  const clientsRef = useRef([]);

  useEffect(() => {
    socketRef.current = socketInit();
  }, []);

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  // capture media
  useEffect(() => {
    const startCapture = async () => {
      // navigator object is provided by browser
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() =>
      addNewClient({ ...user, muted: true }, () => {
        const localAudioElement = audioElements.current[user.id];
        if (localAudioElement) {
          localAudioElement.volume = 0;
          localAudioElement.srcObject = localMediaStream.current;
        }

        // socket emit JOIN
        socketRef.current.emit(ACTIONS.JOIN, { roomId, user });
      })
    );

    return () => {
      // Leaving the room
      localMediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });

      socketRef.current.emit(ACTIONS.LEAVE, { roomId });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      // check if the user already connected
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(), // provide a freeice server
      });

      // handle new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socketRef.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      // handle on track on this connections
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient({ ...remoteUser, muted: true }, () => {
          // check if audio element is present for the remote user
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }

              if (settled) {
                // stop the setInterval after the creation of audio element
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // Add local track to remote connectionss
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      // Create Offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();

        await connections.current[peerId].setLocalDescription(offer);

        // send offer to another client
        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    socketRef.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socketRef.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  // handle Ice Candidate
  useEffect(() => {
    socketRef.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });
  }, []);

  // handle SDP
  useEffect(() => {
    const handleRemoteSDP = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      // if session description is type of offer then create an answer
      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socketRef.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);
  }, []);

  // handle remove peer
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }

      delete connections.current[peerId];
      delete audioElements.current[peerId];

      setClients((list) => list.filter((client) => client.id !== userId));
    };

    socketRef.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socketRef.current.off(ACTIONS.REMOVE_PEER);
    };
  });

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  // listen for mute and Unmute
  useEffect(() => {
    socketRef.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
      setMute(true, userId);
    });

    socketRef.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
      setMute(false, userId);
    });

    const setMute = (mute, userId) => {
      // toggle the muted property of user with user from client list
      // geting the index of userId by converting the client array to ClientId arrray
      const clientIdx = clientsRef.current
        .map((client) => client.id)
        .indexOf(userId);

      console.log("idx", clientIdx);

      const connectedClients = JSON.parse(JSON.stringify(clientsRef.current));
      // user with userId is present or not
      if (clientIdx > -1) {
        connectedClients[clientIdx].muted = mute;
        // updating the client array
        setClients(connectedClients);
      }
    };
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  // handling Mute and Unmute
  const handleMute = (isMute, userId) => {
    let flag = false;
    let interval = setInterval(() => {
      if (localMediaStream.current) {
        localMediaStream.current.getTracks()[0].enabled = !isMute;
        if (isMute) {
          socketRef.current.emit(ACTIONS.MUTE, { roomId, userId });
        } else {
          socketRef.current.emit(ACTIONS.UNMUTE, { roomId, userId });
        }
        flag = true;
      }

      if (flag) {
        clearInterval(interval);
      }
    }, 200);
  };

  return { clients, provideRef, handleMute };
};
