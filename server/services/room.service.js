const roomModel = require("../models/room.model");

class RoomService {
  async create(payload) {
    const { topic, roomType, ownerId } = payload;

    const room = await roomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  async getAllRooms(payload) {
    const rooms = await roomModel
      .find({ roomType: { $in: payload } })
      .populate("speakers")
      .populate("ownerId");
    return rooms;
  }

  async getRoomData(roomId) {
    const room = await roomModel.findOne({ _id: roomId });
    return room;
  }
}

module.exports = new RoomService();
