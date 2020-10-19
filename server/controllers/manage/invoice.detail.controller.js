const Joi = require('joi');
const InvoiceDetail = require('../../models/manage/invoice.detail.model');

const InvoiceDetailSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  product: Joi.string().required(),
  note: Joi.string(),
  price: Joi.number().required(),
  totalPrice: Joi.number().required(),
  quantity: Joi.number().required(),
})


module.exports = {
  insert,
  get,
  deleteInvoiceDetail,
  InvoiceDetailSchema
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, InvoiceDetailSchema, { abortEarly: false });
    return InvoiceDetail.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
  } else {
    area = await Joi.validate(area, InvoiceDetailSchema, { abortEarly: false });
    return await new InvoiceDetail(area).save();
  }
}

async function get(req) {
  let areas = InvoiceDetail.find();
  return areas;
}

async function deleteInvoiceDetail(req) {
  let areas = await InvoiceDetail.deleteOne({'_id': req.params.id});
  return areas;
}
