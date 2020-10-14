const Joi = require('joi');
const House = require('../../models/manage/house.model');

const HouseSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  address: Joi.string().required(),
  hostId: Joi.string().required(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteHouse
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, HouseSchema, { abortEarly: false });
    return House.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, HouseSchema, { abortEarly: false });
    return await new House(area).save();
  }
}

async function get(req) {
  let areas = House.find();
  return areas;
}

async function deleteHouse(req) {
  let areas = await House.deleteOne({'_id': req.params.id});
  return areas;
}
