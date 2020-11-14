const Joi = require('joi');
const House = require('../../models/manage/house.model');

const HouseSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  address: Joi.string().required(),
  host: Joi.string().required(),
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
    await House.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true, new: true});
    return getById(origin._id);
  } else {
    area = await Joi.validate(area, HouseSchema, { abortEarly: false });
    area = await new House(area).save();
    return getById(area._id);
  }
}

async function get(req) {
  let areas = House.find().populate('host').select('-__v');
  return areas;
}

async function deleteHouse(req) {
  let areas = await House.deleteOne({'_id': req.params.id});
  return areas;
}

function getById(id) {
  return House.findOne({_id: id}).populate('host').select('-__v');
}
