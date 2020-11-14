const Joi = require('joi');
const Product = require('../../models/manage/product.model');

const ProductSchema = Joi.object({
  createdDate: Joi.date(),
  modifiedDate: Joi.date(),
  createdBy: Joi.string().required(),
  type: Joi.number().required(),
  price: Joi.number().required(),
  unit: Joi.string().required(),
  name: Joi.string().required()
})


module.exports = {
  insert,
  get,
  deleteProduct
}

async function insert(req) {
  let area = req.body;
  area.createdBy = req.user._id.toString();
  if (area._id) {
    const origin = JSON.parse(JSON.stringify(area));
    delete area._id;
    await Joi.validate(area, ProductSchema, { abortEarly: false });
    return Product.findByIdAndUpdate(origin._id, origin, {upsert: true, setDefaultsOnInsert: true, new: true})
  } else {
    area = await Joi.validate(area, ProductSchema, { abortEarly: false });
    return await new Product(area).save();
  }
}

async function get(req) {
  let areas = Product.find().select('-__v');
  return areas;
}

async function deleteProduct(req) {
  let areas = await Product.deleteOne({'_id': req.params.id});
  return areas;
}
