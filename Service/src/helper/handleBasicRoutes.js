const express = require("express");
const { create } = require("./handleBasicCrud");
const router = express.Router();

const createRoute = (model) => {
  router.post("/", () => {
    create(model);
  });
};

const getRoute = (model) => {
  router.get("/", () => {
    create(model);
  });
};

const allBasicCrudRoutes = (model) => {
  createRoute(model);
  getRoute(model);
};

module.exports = {
  createRoute,
  getRoute,
  allBasicCrudRoutes,
};
