const Joi = require('joi');
const Area = require('../models/area.model');

const AreaSchema = Joi.object({
  content: Joi.string().required(),
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteArea
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, AreaSchema, { abortEarly: false });
    return Area.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, AreaSchema, { abortEarly: false });
    return await new Area(area).save();
  }
}

async function get(req) {
  let areas = Area.find({createdBy: req.user._id.toString()});
  return areas;
}

async function deleteArea(req) {
  let areas = await Area.deleteOne({'_id': req.params.id});
  return areas;
}
