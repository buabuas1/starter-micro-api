const Joi = require('joi');
const Fee = require('../../models/manage/host.model');

const FeeSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  phone: Joi.string(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteFee
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, FeeSchema, { abortEarly: false });
    return Fee.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, FeeSchema, { abortEarly: false });
    return await new Fee(area).save();
  }
}

async function get(req) {
  let areas = Fee.find();
  return areas;
}

async function deleteFee(req) {
  let areas = await Fee.deleteOne({'_id': req.params.id});
  return areas;
}
