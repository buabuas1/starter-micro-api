const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const House = require('../models/house.model');
const imgCtrl = require('./image.controller');
const hostCtrl = require('./host.controller');

const houseSchema = Joi.object({
  DistrictId: Joi.string().required(),
  Name: Joi.string(),
  Address: Joi.string(),
  RoomNumber: Joi.number()
})

module.exports = {
  insert,
  getList
}

async function insert(house) {
  house = await Joi.validate(house, houseSchema, {abortEarly: false});
  return await new House(house).save();
}

async function getList(body) {
  const {districtId} = body.query;
  let houses = districtId ? await  House.find({DistrictId: mongoose.Types.ObjectId(districtId)}) : await  House.find();
  houses = JSON.parse(JSON.stringify(houses));
  // image
  const imgIds = houses.map((h) => h.AvatarId);
  let imgs = await imgCtrl.getList(imgIds);
  imgs = JSON.parse(JSON.stringify(imgs));
  // host
  const hostIds = houses.map((h) => h.HostId);
  let hosts = await hostCtrl.getById(hostIds);
  hosts =  JSON.parse(JSON.stringify(hosts));
  houses = houses.map((d) => {
    const img = imgs.find(i => i._id === d.AvatarId);
    const host = hosts.find(i => i._id === d.HostId);

    return {...d,
      AvatarUrl: img ? img.Url : '',
      Host: host ? host : null
    }

  })
  return houses;
}

