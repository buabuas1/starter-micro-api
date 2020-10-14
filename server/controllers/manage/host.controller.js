const Joi = require('joi');
const Host = require('../../models/manage/host.model');

const HostSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  phone: Joi.string(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteHost
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, HostSchema, { abortEarly: false });
    return Host.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, HostSchema, { abortEarly: false });
    return await new Host(area).save();
  }
}

async function get(req) {
  let areas = Host.find();
  return areas;
}

async function deleteHost(req) {
  let areas = await Host.deleteOne({'_id': req.params.id});
  return areas;
}
