const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const TrendingRoom = require('../models/trending-room.model');
const Room = require('../models/room.model');
const House = require('../models/house.model');
const imgCtrl = require('./image.controller');
const hostCtrl = require('./host.controller');

const roomSchema = Joi.object({
  RoomId: Joi.string().required()
})

module.exports = {
  insert,
  getList
}

async function insert(room) {
  room = await Joi.validate(room, roomSchema, {abortEarly: false});
  return await new TrendingRoom(room).save();
}

async function getList(body) {

  let trending = await TrendingRoom.find();
  let roomIds = JSON.parse(JSON.stringify(trending)).map(r => r.RoomId);
  let rooms = await Room.find({
    $and:
      [
        {IsActive: {$eq: true}},
        {_id: {$in: roomIds}}
      ]
  });
  rooms = JSON.parse(JSON.stringify(rooms));
  const imgIds = rooms.reduce((acc, cur) => [...acc, ...cur.Images, cur.AvatarId], []);
  let imgs = await imgCtrl.getList(imgIds);
  imgs = JSON.parse(JSON.stringify(imgs));
  let houseIds = rooms.map(r => r.HouseId);
  let houses = await House.find({_id: {$in: houseIds}});
  houses = JSON.parse(JSON.stringify(houses));
  const hostIds = houses.map((h) => h.HostId);
  let hosts = await hostCtrl.getById(hostIds);
  hosts = JSON.parse(JSON.stringify(hosts));
  houses = houses.map((d) => {
    const host = hosts.find(i => i._id === d.HostId);
    return {
      ...d,
      Host: host ? host : null
    }
  })

  rooms = rooms.map((d) => {
    const img = imgs.filter(i => d.Images && d.Images.indexOf(i._id) !== -1);
    const avatar = imgs.find(i => d.AvatarId === i._id);
    const h = houses.find(ho => ho._id === d.HouseId);
    const p = trending.find(t => t.RoomId === d._id);
    if (!img || img.length === 0) {
      return {
        ...d,
        House: h,
        Position: p.Position || 999
      }
    } else {
      return {
        ...d,
        ImageUrls: img,
        AvatarUrl: avatar ? avatar.Url : img[0].Url,
        House: h,
        Position: p.Position || 999
      }
    }

  })

  rooms = rooms.sort((r1, r2) => {
    if ((r1.Position || 999) < (r2.Position || 999)) {
      return -1;
    } else {
      return 1;
    }
  })
  return rooms;
}

