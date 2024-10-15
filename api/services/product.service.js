const express = require('express');
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProdctsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        imagen: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
  async crear(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return this.products;
  }
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      return boom.notFound('product not found');
    }
    if (product.isBlock) {
      return boom.conflict('product is block');
    }
    return product;

    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      return boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      return boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProdctsService;
