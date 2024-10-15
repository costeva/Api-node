const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    categories.push({
      id: i,
      name: faker.commerce.department(),
    });
  }
  res.json(categories);
});

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  res.json({
    categoryId: req.params.categoryId,
    productId: req.params.productId,
  });
});

module.exports = router;
