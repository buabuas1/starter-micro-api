const Joi = require('joi');
const Room = require('../../models/manage/room.model');

const RoomSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  numberOfCustomer: Joi.number().required(),
  customer: Joi.string().required(),
  house: Joi.string().required(),
  name: Joi.string().required(),
  item: Joi.array().items().required()
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
    await Room.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true, new: true})
    return getById(origin._id);
  } else {
    area = await Joi.validate(area, RoomSchema, { abortEarly: false });
    area = await new Room(area).save();
    return getById(area._id);
  }
}

async function get(req) {
  let areas = Room.find().select('-__v').populate('house').populate('item').populate('customer');
  return areas;
}

async function deleteRoom(req) {
  let areas = await Room.deleteOne({'_id': req.params.id});
  return areas;
}

function getById(id) {
  return Room.findOne({_id: id}).populate('house').populate('item').populate('customer');
}
