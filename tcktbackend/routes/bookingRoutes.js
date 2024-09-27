const express = require('express');
const { bookSeats, getBookingHistory } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticateJWT, bookSeats);
router.get('/history', authMiddleware.authenticateJWT, getBookingHistory);

module.exports = router;
