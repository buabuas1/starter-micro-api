const bcrypt = require('bcrypt');
const Joi = require('joi');
const Promotion = require('../../models/promotion.model');
const mongoose = require('mongoose');

const promotionSchema = Joi.object({
  Url: Joi.string().required()
})

module.exports = {
  insert,
  getList
}

async function insert(img) {
  img = await Joi.validate(img, promotionSchema, { abortEarly: false });
  return await new promotion(img).save();
}

async function getList(body) {
  let {PromotionId} = body.query;
  let prm = PromotionId ?
    await  Promotion.find({_id: mongoose.Types.ObjectId(PromotionId)}) :
    await  Promotion.find();
  prm = JSON.parse(JSON.stringify(prm));
  return prm;
}


