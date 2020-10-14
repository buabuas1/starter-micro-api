const Joi = require('joi');
const Room = require('../../models/manage/room.model');

const RoomSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  houseId: Joi.string().required(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteRoom
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, RoomSchema, { abortEarly: false });
    return Room.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, RoomSchema, { abortEarly: false });
    return await new Room(area).save();
  }
}

async function get(req) {
  let areas = Room.find();
  return areas;
}

async function deleteRoom(req) {
  let areas = await Room.deleteOne({'_id': req.params.id});
  return areas;
}
