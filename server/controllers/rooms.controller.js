const RoomDto = require("../dtos/room.dto");
const roomService = require("../services/room.service");

class RoomsController {
  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fiels are required" });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    return res.json(new RoomDto(room));
  }

  async getAllRooms(req, res) {
    const rooms = await roomService.getAllRooms(["open"]);
    const allRooms = rooms.map((room) => new RoomDto(room));
    return res.json(allRooms);
  }

  async getRoomData(req, res) {
    const room = await roomService.getRoomData(req.params.roomId);
    return res.json(new RoomDto(room));
  }
}

module.exports = new RoomsController();
