const Joi = require('joi');
const Area = require('../models/area.model');

const AreaSchema = Joi.object({
  content: Joi.string().required(),
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required()
})


module.exports = {
  insert,
  get
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  area = await Joi.validate(area, AreaSchema, { abortEarly: false });
  return await new Area(area).save();
}

async function get(req) {
  let areas = Area.find({createdBy: req.user._id.toString()});
  return areas;
}
