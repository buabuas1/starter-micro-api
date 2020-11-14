const Joi = require('joi');
const Fee = require('../../models/manage/fee.model');

const FeeSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  unit: Joi.string(),
  note: Joi.string(),
  price: Joi.number(),
  totalPrice: Joi.number().required(),
  quantity: Joi.number(),
  house: Joi.string(),
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
    area = Fee.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true, new: true});
    return getById(area._id);
  } else {
    area = await Joi.validate(area, FeeSchema, { abortEarly: false });
    area = await new Fee(area).save();
    return getById(area._id);
  }
}

async function get(req) {
  let areas = Fee.find().select('-__v');
  return areas;
}

async function deleteFee(req) {
  let areas = await Fee.deleteOne({'_id': req.params.id});
  return areas;
}

function getById(id) {
  return Fee.findOne({_id: id}).populate('house').select('-__v');
}
