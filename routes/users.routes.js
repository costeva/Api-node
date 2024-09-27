const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

//endpoint con query params
router.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.send('No limit or offset');
  }
});
module.exports = router;
