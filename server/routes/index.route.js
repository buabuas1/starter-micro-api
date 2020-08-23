const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const districtRoutes = require('./district.route');
const houseRoutes = require('./house.route');
const hostRoutes = require('./host.route');
const imageRoutes = require('./image.route');
const roomRoutes = require('./room.route');
const facilityRoutes = require('./facility.route');
const trendingRoomRoutes = require('./trending-room.route');
const promotionRoutes = require('./promotion.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/district', districtRoutes);
router.use('/house', houseRoutes);
router.use('/image', imageRoutes);
router.use('/host', hostRoutes);
router.use('/room', roomRoutes);
router.use('/trendingroom', trendingRoomRoutes);
router.use('/facility', facilityRoutes);
router.use('/promotion', promotionRoutes);

module.exports = router;
