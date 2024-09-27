const { Seat } = require('../models');

const markSeatUnavailable = async (req, res) => {
  const { seatId } = req.params;
  try {
    const seat = await Seat.findByPk(seatId);
    if (!seat) return res.status(404).json({ error: 'Seat not found' });

    seat.isAvailable = false;
    await seat.save();

    res.json(seat);
  } catch (error) {
    res.status(500).json({ error: 'Error updating seat' });
  }
};

module.exports = { markSeatUnavailable };
