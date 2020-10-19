const Joi = require('joi');
const Invoice = require('../../models/manage/invoice.model');
const InvoiceDetail = require('../../models/manage/invoice.detail.model');
const {InvoiceDetailSchema} = require('../../controllers/manage/invoice.detail.controller');

const InvoiceSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  item: Joi.array().items(
    InvoiceDetailSchema
  ).required(),
  room: Joi.string().required(),
  customer: Joi.string().required(),
  total: Joi.number().required(),
  code: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteInvoice
}

async function insert(req) {
  let invoice = req.body;
  invoice.createdBy = req.user._id.toString();
  if (invoice._id) {
    const origin = JSON.parse(JSON.stringify(invoice));
    delete invoice._id;
    await Joi.validate(invoice, InvoiceSchema, {abortEarly: false});
    invoice = await Invoice.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true})
    return getById(invoice._id);
  } else {
    invoice = await Joi.validate(invoice, InvoiceSchema, {abortEarly: false});
    let item = invoice.item;
    delete invoice.item;
    invoice = await new Invoice(invoice).save();
    await createInvoiceDetail(invoice._id, item);
    return getById(invoice._id);
  }
}

async function get(req) {
  let areas = getById();
  return areas;
}

async function deleteInvoice(req) {
  let areas = await Invoice.deleteOne({'_id': req.params.id});
  return areas;
}

async function createInvoiceDetail(invoiceId, invoiceDetail) {
  return InvoiceDetail.insertMany(invoiceDetail).then(docComment => {
    return Invoice.findByIdAndUpdate(
      invoiceId,
      { $push: { item: docComment.map(d => d._id) } },
      { new: true, useFindAndModify: false }
    );
  });
};

function getById(id) {
  if (!id) {
    return Invoice.find()
      .populate({
        path: "item",
        populate: {
          path: "product"
        }
      })
      .populate('customer')
      .populate('room');
  } else {
    return Invoice.findOne({_id: id})
      .populate({
        path: "item",
        populate: {
          path: "product"
        }
      })
      .populate('customer')
      .populate('room');
  }
}
