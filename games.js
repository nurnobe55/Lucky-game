const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Future: Add /slots, /dice, /crash routes here
router.get('/', auth, (req, res) => {
  res.json({ msg: "Game endpoint secured" });
});

module.exports = router;

