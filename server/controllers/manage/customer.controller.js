const Joi = require('joi');
const Customer = require('../../models/manage/customer.model');

const CustomerSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  phone: Joi.string(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteCustomer
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, CustomerSchema, { abortEarly: false });
    return Customer.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, CustomerSchema, { abortEarly: false });
    return await new Customer(area).save();
  }
}

async function get(req) {
  let areas = Customer.find();
  return areas;
}

async function deleteCustomer(req) {
  let areas = await Customer.deleteOne({'_id': req.params.id});
  return areas;
}
