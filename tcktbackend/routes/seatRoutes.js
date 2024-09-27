const express = require('express');
const { markSeatUnavailable } = require('../controllers/seatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/:seatId/unavailable', authMiddleware.authenticateJWT, markSeatUnavailable);
module.exports = router;
